import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function openHome(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem('aera_entrance_seen', '1'));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'AERA', exact: true })).toBeVisible();
}

function mainEntry(url: URL) {
  return /\/assets\/index-[^/]+\.js$/.test(url.pathname);
}

test.describe('technical foundation desktop regressions', () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== 'desktop', 'Desktop or cross-route check'));

  test('blocked app bundle and disabled JavaScript leave the prerender reachable', async ({ page, browser, baseURL }) => {
    await page.route(mainEntry, (route) => route.abort());
    await page.goto('/');
    await expect(page.locator('#aera-entrance[open]')).toHaveCount(0, { timeout: 2800 });
    await expect(page.locator('main h1')).toHaveText('AERA');
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.locator('main h1')).toContainText('Clear pricing');

    const scriptless = await browser.newContext({ baseURL, javaScriptEnabled: false });
    const staticPage = await scriptless.newPage();
    await staticPage.goto('/');
    await expect(staticPage.locator('#aera-entrance[open]')).toHaveCount(0);
    await expect(staticPage.locator('main h1')).toHaveText('AERA');
    await staticPage.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services' }).click();
    await expect(staticPage.locator('main h1')).toContainText('Clear pricing');
    await scriptless.close();
  });

  test('a missing entrance image releases the homepage controls', async ({ page }) => {
    await page.route(/\/media\/sanctuary-sunlit-[^/]+/, (route) => route.abort());
    await page.goto('/');
    await expect(page.locator('#aera-entrance[open]')).toHaveCount(0, { timeout: 2800 });
    await expect(page.locator('main h1')).toHaveText('AERA');
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services' }).click();
    await expect(page.locator('main h1')).toContainText('Clear pricing');
  });

  test('Skip has initial focus and closes while the application bundle is held', async ({ page }) => {
    let release!: () => void;
    const hold = new Promise<void>((resolve) => { release = resolve; });
    await page.route(mainEntry, async (route) => {
      await hold;
      await route.continue();
    });
    try {
      await page.goto('/', { waitUntil: 'commit' });
      const skip = page.getByRole('button', { name: /skip entrance/i });
      await expect(skip).toBeFocused();
      await page.evaluate(() => document.querySelector<HTMLAnchorElement>('header a')?.focus());
      await expect(skip).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(skip).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator('#aera-entrance[open]')).toHaveCount(0);
      await expect(page.locator('main')).toBeFocused();
    } finally {
      release();
    }
    await page.waitForLoadState();
    await expect(page.locator('#aera-entrance[open]')).toHaveCount(0);
    expect(await page.evaluate(() => sessionStorage.getItem('aera_entrance_seen'))).toBe('1');
  });

  test('replay is explicit and consumed across refresh and route remounts', async ({ page }) => {
    const entrance = page.locator('#aera-entrance[open]');
    const skip = page.getByRole('button', { name: /skip entrance/i });
    const services = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services' });
    const home = page.getByRole('link', { name: 'AERA Beauty Studio Home' });
    await page.goto('/services');
    await home.click();
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await expect(entrance).toHaveCount(0);
    await page.reload();
    await expect(entrance).toHaveCount(0);
    const replay = page.getByRole('button', { name: 'Replay Entrance', exact: true });
    await replay.click();
    await expect(skip).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(replay).toBeFocused();
    await services.click();
    await page.getByRole('button', { name: 'Replay Salon Entrance' }).click();
    await expect(skip).toBeFocused();
    await expect(page.locator('[data-route-veil]')).toHaveCSS('visibility', 'hidden');
    await skip.press('Enter');
    await services.click();
    await home.click();
    await expect(page.locator('main h1')).toHaveText('AERA');
    await expect(entrance).toHaveCount(0);
  });

  test('booking validates current context and retains focus through nested preview', async ({ page }) => {
    await page.goto('/team');
    const kavya = page.getByRole('button', { name: /book with kavya/i });
    await kavya.click();
    let drawer = page.getByRole('dialog', { name: 'Book a Visit' });
    const close = drawer.getByRole('button', { name: /close appointment/i });
    await expect(close).toBeFocused();
    await expect(drawer.getByLabel('Select Service')).toHaveValue('mineral-balayage');
    const continueToStylist = drawer.getByRole('button', { name: /continue to stylist/i });
    await page.keyboard.press('Shift+Tab');
    await expect(continueToStylist).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();
    await continueToStylist.click();
    let stylist = drawer.getByLabel('Preferred Stylist');
    await expect(stylist).toHaveValue('kavya-nair');
    await expect(stylist.locator('option')).toHaveCount(2);
    await close.click();
    await expect(kavya).toBeFocused();

    const general = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Book a Visit' });
    await general.click();
    drawer = page.getByRole('dialog', { name: 'Book a Visit' });
    await expect(drawer.getByLabel('Select Service')).toHaveValue('sculptural-cut');
    await drawer.getByRole('button', { name: /continue to stylist/i }).click();
    stylist = drawer.getByLabel('Preferred Stylist');
    await expect(stylist).toHaveValue('');
    await expect(stylist.locator('option')).toHaveText(['No preference', /Meera Rao/]);

    const date = drawer.getByLabel('Preferred Date (Optional)');
    const validDate = (await date.getAttribute('min'))!;
    await date.fill('2020-01-01');
    await drawer.getByRole('button', { name: /continue to your details/i }).click();
    await expect(date).toBeFocused();
    await expect(date).toHaveAttribute('aria-invalid', 'true');
    await expect(drawer.getByRole('alert')).toHaveText('Choose today or a later date.');
    await date.fill(validDate);
    await drawer.getByRole('button', { name: /continue to your details/i }).click();
    await drawer.getByLabel(/full name/i).fill('Audit Visitor');
    const contact = drawer.getByLabel(/email or phone/i);
    await contact.fill('xxxxx');
    const submit = drawer.getByRole('button', { name: /preview appointment request/i });
    await submit.click();
    await expect(contact).toBeFocused();
    await expect(contact).toHaveAccessibleDescription('Enter a valid email address or phone number.');
    await contact.fill('audit@example.com');

    const submissions: string[] = [];
    page.on('request', (request) => {
      if (request.method() !== 'GET' || !request.url().startsWith('http://127.0.0.1:')) submissions.push(request.url());
    });
    await submit.click();
    await expect(drawer.getByRole('heading', { name: 'Your appointment preview' })).toBeFocused();
    const whatsapp = drawer.getByRole('button', { name: 'Preview WhatsApp Message' });
    await whatsapp.click();
    const modal = page.getByRole('dialog', { name: 'Pre-Filled Salon Message' });
    await expect(modal.getByRole('button', { name: /close whatsapp/i })).toBeFocused();
    await expect(modal.locator('pre')).toContainText(`Preferred Date: ${validDate}`);
    await expect(modal.locator('a[href*="wa.me"]')).toHaveCount(0);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(modal).toHaveCount(0);
    await expect(whatsapp).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(drawer).toHaveCount(0);
    await expect(general).toBeFocused();
    expect(submissions).toEqual([]);
  });

  test('lookbook booking returns to its dossier and then its opener', async ({ page }) => {
    await page.goto('/gallery');
    await page.getByRole('button', { name: 'Skincare', exact: true }).click();
    const opener = page.getByRole('button', { name: /get this look/i }).first();
    await opener.click();
    const dossier = page.getByRole('dialog', { name: 'Sculpted Radiance Facial' });
    const book = dossier.getByRole('button', { name: /book this look/i });
    await expect(dossier.getByRole('button', { name: /close lookbook/i })).toBeFocused();
    await book.click();
    await expect(page.getByRole('dialog', { name: 'Book a Visit' }).getByLabel('Select Service')).toHaveValue('barrier-sculpt-facial');
    await page.keyboard.press('Escape');
    await expect(book).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
  });

  test('filtered services hydrate safely and unknown document URLs return 404', async ({ page, request }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/services?pillar=sculptural-colour');
    await expect(page.locator('main article')).toHaveCount(2);
    const colour = page.getByRole('button', { name: /hair colour/i });
    await expect(colour).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: /all services/i }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.locator('main article')).toHaveCount(8);
    await page.goBack();
    await expect(colour).toHaveAttribute('aria-pressed', 'true');
    expect(errors).toEqual([]);

    await page.goto('/services/index.html?pillar=sculptural-colour');
    await expect(colour).toHaveAttribute('aria-pressed', 'true');
    expect(errors).toEqual([]);

    const missing = await request.get('/an-unknown-aera-route');
    expect(missing.status()).toBe(404);
    expect(await missing.text()).toContain('Page not found.');
    const navigation = await page.goto('/an-unknown-aera-route');
    expect(navigation?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found.' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await page.getByRole('link', { name: 'Services & Pricing', exact: true }).click();
    await expect(page.locator('main h1')).toContainText('Clear pricing');
  });

  test('comparison reaches both endpoints and keeps manual control until resumed', async ({ page }) => {
    await openHome(page);
    const frame = page.locator('[data-ba-divider]');
    const slider = page.getByRole('slider', { name: /before and after divider/i });
    const points = await frame.evaluate((element) => {
      const host = element.closest('#transformation-section')!.children[2];
      const start = host.getBoundingClientRect().top + scrollY - 64;
      return { start, end: start + host.getBoundingClientRect().height - innerHeight + 64 };
    });
    const moveTo = (y: number) => page.evaluate((top) => scrollTo({ top, behavior: 'instant' }), y);
    await moveTo(points.start - 5);
    await expect(slider).toHaveAttribute('aria-valuenow', '100');
    await moveTo(points.end + 5);
    await expect(slider).toHaveAttribute('aria-valuenow', '0');
    await slider.focus();
    await page.keyboard.press('End');
    await expect(slider).toHaveAttribute('aria-valuenow', '100');
    await page.keyboard.press('Home');
    await expect(slider).toHaveAttribute('aria-valuetext', '100% after revealed');
    await page.keyboard.press('PageUp');
    await expect(slider).toHaveAttribute('aria-valuenow', '10');
    await expect(slider.locator('.aera-compare-handle')).toHaveCSS('outline-width', '3px');
    await moveTo(points.start + (points.end - points.start) * 0.5);
    await expect(slider).toHaveAttribute('aria-valuenow', '10');
    await page.getByRole('button', { name: /resume scroll wipe/i }).click();
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(await frame.locator('img').count()).toBe(2);
  });

  test('reduced motion removes sticky geometry and fits every stylist at 1280 and 1440', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openHome(page);
    for (const width of [1280, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      const geometry = await page.locator('[data-stylist-card]').last().evaluate((card) => {
        const wrap = card.closest('#meet-stylists')!.firstElementChild!;
        return { right: card.getBoundingClientRect().right, position: getComputedStyle(wrap.firstElementChild!).position };
      });
      expect(geometry.right).toBeLessThanOrEqual(width);
      expect(geometry.position).toBe('static');
      await expect(page.locator('#transformation-section > div').first().locator('> div').first()).toHaveCSS('position', 'static');
    }
    await page.locator('[data-stage-step="2"]').click();
    await expect(page.getByRole('heading', { name: 'Weightless Gloss Finish' })).toBeVisible();
    await expect(page.locator('feDisplacementMap')).toHaveAttribute('scale', '0');
  });

  test('rapid stage reversal and route changes clear displacement and old masks', async ({ page }) => {
    await openHome(page);
    const panel = page.locator('#transformation-section > div').first();
    const positions = await panel.evaluate((element) => {
      const start = element.getBoundingClientRect().top + scrollY - 64;
      return [start, start + element.getBoundingClientRect().height - innerHeight + 64];
    });
    const seek = (progress: number) => page.evaluate(({ positions, progress }) => {
      scrollTo({ top: positions[0]! + (positions[1]! - positions[0]!) * progress, behavior: 'instant' });
    }, { positions, progress });
    for (const [progress, heading] of [
      [0.8, 'Weightless Gloss Finish'],
      [0.09, 'Quiet Daylight Mapping'],
      [0.5, 'Hand-Painted Dimension'],
      [0.85, 'Weightless Gloss Finish'],
    ] as const) {
      await seek(progress);
      await expect(panel.getByRole('heading', { name: heading })).toBeVisible();
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('feDisplacementMap')).toHaveAttribute('scale', '0');
    await expect.poll(() => panel.locator('[aria-hidden="true"][style*="clip-path"]').count()).toBe(0);
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Services' }).click();
    await expect(page.locator('feDisplacementMap')).toHaveCount(0);
    await page.getByRole('link', { name: 'AERA Beauty Studio Home' }).click();
    await expect(panel.getByRole('heading', { name: 'Quiet Daylight Mapping' })).toBeVisible();
    await expect(page.locator('feDisplacementMap')).toHaveAttribute('scale', '0');
  });

  test('vertical wheel moves the stylist rail in both directions with space to exit and manual control', async ({ page }) => {
    await openHome(page);
    const rail = page.locator('[data-stylist-rail]');
    const start = await rail.evaluate((element) => element.getBoundingClientRect().top + scrollY - innerHeight * 0.88);
    await page.evaluate((top) => scrollTo({ top, behavior: 'instant' }), start - 30);
    await expect(rail).toHaveAttribute('data-scroll-driven', '');
    const available = await rail.evaluate((element) => element.scrollWidth - element.clientWidth);
    expect(available).toBeGreaterThan(150);
    const scrollLeft = () => rail.evaluate((element) => element.scrollLeft);
    await page.mouse.move(800, 410);
    await page.mouse.wheel(0, 340);
    await expect.poll(scrollLeft).toBeGreaterThan(55);
    await page.mouse.wheel(0, -430);
    await expect.poll(scrollLeft).toBeLessThan(2);
    await rail.scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Next stylists' }).press('Enter');
    await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
    await page.getByRole('button', { name: 'Previous stylists' }).press('Enter');
    await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeLessThan(2);
    await expect(page.locator('#meet-stylists > div').first()).toHaveCSS('position', 'static');
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(rail).not.toHaveAttribute('data-scroll-driven');
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(rail).toHaveAttribute('data-scroll-driven', '');
  });

  test('reels pause each other and pause offscreen, and expose a retry for failed media', async ({ page }) => {
    await openHome(page);
    const cards = page.locator('[data-reel-card]');
    await cards.first().scrollIntoViewIfNeeded();
    const videos = cards.locator('video');
    if ((await videos.count()) === 0) {
      const links = page.locator('#aera-in-motion').getByRole('link', { name: /^watch on mixkit/i });
      await expect(links).toHaveCount(4);
      for (const link of await links.all()) {
        await expect(link).toHaveAttribute('href', /^https:\/\/mixkit\.co\/free-stock-video\//);
      }
      return;
    }
    await cards.nth(0).getByRole('button', { name: /^play/i }).click();
    await expect.poll(() => videos.nth(0).evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
    await cards.nth(1).getByRole('button', { name: /^play/i }).click();
    await expect.poll(() => videos.evaluateAll((items: HTMLVideoElement[]) => items.map((video) => video.paused))).toEqual([true, false, true, true]);
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => videos.nth(1).evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
    await page.route('**/media/local-reels/mirror-makeup.mp4', (route) => route.abort());
    await cards.nth(2).getByRole('button', { name: /^play/i }).click();
    await expect(cards.nth(2).getByRole('button', { name: /^retry/i })).toBeVisible();
    await expect(cards.nth(2).getByRole('status')).toContainText('could not play');
    await page.unroute('**/media/local-reels/mirror-makeup.mp4');
    await cards.nth(2).getByRole('button', { name: /^retry/i }).click();
    await expect(cards.nth(2).getByRole('button', { name: /^pause/i })).toBeVisible();
  });
});

test.describe('technical foundation mobile regressions', () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== 'mobile', 'Touch viewport'));

  test('native vertical scrolling works through the comparison while horizontal drag remains available', async ({ page, context }) => {
    await openHome(page);
    const frame = page.locator('[data-ba-divider]');
    await frame.evaluate((element) => element.scrollIntoView({ block: 'center' }));
    const bounds = (await frame.boundingBox())!;
    const cdp = await context.newCDPSession(page);
    async function swipe(x: number, y: number, dx: number, dy: number) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (let i = 1; i <= 12; i++) {
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{ x: x + dx * i / 12, y: y + dy * i / 12 }],
        });
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    }
    const before = await page.evaluate(() => scrollY);
    await swipe(bounds.x + bounds.width * .6, bounds.y + bounds.height * .70, 0, -140);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 60);
    await expect(page.getByRole('button', { name: /resume scroll wipe/i })).toHaveCount(0);
    const next = (await frame.boundingBox())!;
    await swipe(next.x + next.width * .8, Math.max(110, next.y + next.height * .4), -next.width * .6, 0);
    await expect(frame).toHaveAttribute('data-ba-divider', '20');
    await expect(page.getByRole('button', { name: /resume scroll wipe/i })).toBeVisible();
  });

  test('mobile navigation is isolated and restores its opener after a nested booking', async ({ page }) => {
    await page.goto('/services');
    const opener = page.getByRole('button', { name: 'Open navigation menu' });
    await opener.tap();
    const menu = page.getByRole('dialog', { name: 'Mobile Navigation' });
    await expect(menu.getByRole('button', { name: 'Close navigation menu' })).toBeFocused();
    const book = menu.getByRole('button', { name: 'Book a Visit' });
    await book.tap();
    const booking = page.getByRole('dialog', { name: 'Book a Visit' });
    await expect(booking.getByRole('button', { name: /close appointment/i })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(book).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
  });
});
