import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_CAPTURES = path.resolve('audit-captures/v4-phase1/journey');

test.beforeAll(() => {
  fs.mkdirSync(ARTIFACT_CAPTURES, { recursive: true });
});

test.describe('AERA Beauty Studio V4 Phase 1 — Visual, Scroll, Video, A11y & Functional Audit', () => {
  test('desktop complete journey, seamless entrance, mirror room, ripple, pinned B/A, stylists, reels, axe & routes', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop-specific journey');

    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedResponses: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(String(err)));
    page.on('response', (res) => {
      if (res.status() >= 400 && !res.url().includes('favicon')) {
        failedResponses.push(`${res.status()} ${res.url()}`);
      }
    });

    await page.addInitScript(() => {
      (window as unknown as { __vitals: Record<string, number> }).__vitals = { cls: 0 };
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const w = window as unknown as { __vitals: Record<string, number> };
            if (entry.entryType === 'largest-contentful-paint') {
              w.__vitals.lcp = entry.startTime;
            }
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {}
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              (window as unknown as { __vitals: Record<string, number> }).__vitals.fcp = entry.startTime;
            }
          }
        }).observe({ type: 'paint', buffered: true });
      } catch {}
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const ls = entry as unknown as { hadRecentInput: boolean; value: number };
            if (!ls.hadRecentInput) {
              (window as unknown as { __vitals: Record<string, number> }).__vitals.cls += ls.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
      } catch {}
    });

    await page.goto('/', { waitUntil: 'commit' });

    // 1. Entrance Closed -> Swinging Open -> Seamless Twin-Arch Hero
    await page.locator('#aera-entrance[open]').waitFor();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-01-entrance-closed.png') });

    await page.waitForTimeout(580);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-02-entrance-swinging.png') });

    await page.waitForTimeout(680);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-03-entrance-glide.png') });

    await page.waitForSelector('#aera-entrance[open]', { state: 'detached', timeout: 5500 });
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-04-hero-settled.png') });

    const heroCheck = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      h1: document.querySelector('h1')?.textContent?.trim(),
    }));
    expect(heroCheck.scrollWidth).toBeLessThanOrEqual(heroCheck.innerWidth);
    expect(heroCheck.h1).toBe('AERA');

    // 2. Living Mirror Room + Roving Keyboard Focus
    const mirrorSection = page.locator('#living-mirrors');
    await mirrorSection.evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(550);

    const colourMirrorTab = page.locator('[role="tab"]').nth(1);
    await colourMirrorTab.click();
    await expect(page.locator('#mirror-console-ledger')).toContainText('Hair Colour');
    await expect(page.locator('#mirror-console-ledger')).toContainText('₹8,500');
    await page.waitForTimeout(580);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-05-living-mirrors.png') });

    await colourMirrorTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#mirror-console-ledger')).toContainText('Skincare & Facials');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#mirror-console-ledger')).toContainText('Hair Colour');

    // 3. Pinned Our Process Sequence: Strong Liquid Wave Ripple + Forward/Reverse Scroll
    const processRect = await page.locator('#transformation-section').evaluate((el) => {
      const host = el.children[1] as HTMLElement;
      const top = host.getBoundingClientRect().top + window.scrollY - 64;
      const range = Math.max(400, host.getBoundingClientRect().height - (window.innerHeight - 64));
      return { top, range };
    });
    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.1), processRect);
    await page.waitForTimeout(500);
    await expect(page.locator('#transformation-section')).toContainText('Step 01');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-06a-stage1-pin.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.5), processRect);
    await page.waitForTimeout(550);
    await expect(page.locator('#transformation-section')).toContainText('Step 02');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-06b-stage2-pin.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.88), processRect);
    await page.waitForTimeout(550);
    await expect(page.locator('#transformation-section')).toContainText('Step 03');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-06c-stage3-pin.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.12), processRect);
    await page.waitForTimeout(550);
    await expect(page.locator('#transformation-section')).toContainText('Step 01');

    // 4. Pinned Before & After Comparison + Direct Inside-Photo Drag Without Fighting Scroll
    const baHostRect = await page.locator('#transformation-section').evaluate((el) => {
      const baHost = el.children[2] as HTMLElement;
      const top = baHost.getBoundingClientRect().top + window.scrollY - 64;
      const range = Math.max(400, baHost.getBoundingClientRect().height - (window.innerHeight - 64));
      return { top, range };
    });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.06), baHostRect);
    await page.waitForTimeout(400);
    const frameLocator = page.locator('[data-ba-divider]');
    const startVal = Number(await frameLocator.getAttribute('data-ba-divider'));
    const startBox = await frameLocator.boundingBox();
    expect(startVal).toBeGreaterThanOrEqual(80);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-07a-ba-start.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.72), baHostRect);
    await page.waitForTimeout(450);
    const scrolledVal = Number(await frameLocator.getAttribute('data-ba-divider'));
    const scrolledBox = await frameLocator.boundingBox();
    expect(scrolledVal).toBeLessThanOrEqual(45);
    // Verify frame remained truly stationary in viewport during pin scroll
    expect(Math.abs((scrolledBox?.y ?? 0) - (startBox?.y ?? 0))).toBeLessThan(20);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-07b-ba-pinned-scroll.png') });

    // Reverse scroll reverses transformation
    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.15), baHostRect);
    await page.waitForTimeout(400);
    const reversedVal = Number(await frameLocator.getAttribute('data-ba-divider'));
    expect(reversedVal).toBeGreaterThanOrEqual(70);

    // Direct mouse drag directly across photograph canvas
    const dragBox = await frameLocator.boundingBox();
    expect(dragBox).not.toBeNull();
    if (dragBox) {
      await page.mouse.move(dragBox.x + dragBox.width * 0.72, dragBox.y + dragBox.height * 0.5);
      await page.mouse.down();
      await page.mouse.move(dragBox.x + dragBox.width * 0.34, dragBox.y + dragBox.height * 0.5, { steps: 10 });
      await page.mouse.up();
    }
    await page.waitForTimeout(250);
    const draggedVal = Number(await frameLocator.getAttribute('data-ba-divider'));
    expect(draggedVal).toBeGreaterThanOrEqual(24);
    expect(draggedVal).toBeLessThanOrEqual(44);

    // Nudge page scroll slightly -> verify scroll does NOT fight manual drag
    await page.evaluate(() => window.scrollBy(0, 80));
    await page.waitForTimeout(250);
    expect(Number(await frameLocator.getAttribute('data-ba-divider'))).toBe(draggedVal);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-07c-ba-manual-drag.png') });

    // 5. Meet Our Stylists Sticky Horizontal Track
    const stylistsRect = await page.getByLabel('Meet Our Stylists').evaluate((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      return { top, range: Math.max(400, el.getBoundingClientRect().height - (window.innerHeight - 64)) };
    });
    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.08), stylistsRect);
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-08a-stylists-start.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.85), stylistsRect);
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-08b-stylists-scrolled.png') });

    // 6. AERA in Motion Staggered Vertical Video Section (Play / Pause)
    const motionSection = page.locator('#aera-in-motion');
    await motionSection.evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(550);
    await expect(page.locator('#aera-in-motion video')).toHaveCount(4);

    const playBtn = page.getByRole('button', { name: /Play Silk Detangling & Finish/i });
    await playBtn.click();
    await page.waitForTimeout(400);
    const firstVideoPaused = await page.locator('#aera-in-motion video').first().evaluate((v: HTMLVideoElement) => v.paused);
    expect(firstVideoPaused).toBe(false);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-09-in-motion.png') });

    await page.getByRole('button', { name: /Pause Silk Detangling & Finish/i }).click();
    const afterPause = await page.locator('#aera-in-motion video').first().evaluate((v: HTMLVideoElement) => v.paused);
    expect(afterPause).toBe(true);

    // 7. Closing Booking Scene & Footer Disclosure + WhatsApp Preview Modal
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await expect(page.locator('footer')).toContainText('Portfolio Concept Showcase');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-10-closing-and-footer.png') });

    await page.getByRole('button', { name: /Message on WhatsApp/i }).first().click();
    await expect(page.getByText(/disabled in showcase mode/i)).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-desktop-11-whatsapp-modal.png') });
    await page.getByRole('button', { name: /Close WhatsApp message preview/i }).click();

    // 8. Axe-Core Accessibility Audit on Homepage
    const axeHome = await new AxeBuilder({ page }).analyze();
    const seriousHome = axeHome.violations.filter((v) =>
      ['critical', 'serious'].includes(v.impact || '')
    );
    console.log(
      'AXE_HOME_VIOLATIONS:',
      JSON.stringify(axeHome.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })))
    );
    expect(seriousHome, `Serious/critical a11y violations on /: ${JSON.stringify(seriousHome)}`).toEqual([]);

    // 9. Measured Web Vitals & Broken Image Check
    const metrics = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const brokenImgs = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const vitals = (window as unknown as { __vitals: Record<string, number> }).__vitals;
      return {
        fcpMs: Math.round(vitals.fcp || 0),
        lcpMs: Math.round(vitals.lcp || 0),
        cls: Number((vitals.cls || 0).toFixed(4)),
        domInteractiveMs: Math.round(nav?.domInteractive || 0),
        brokenImgCount: brokenImgs.length,
        brokenImgs,
      };
    });
    console.log('MEASURED_VITALS_V4:', JSON.stringify(metrics));
    expect(metrics.brokenImgCount).toBe(0);
    expect(metrics.cls).toBeLessThan(0.05);

    // 10. All Inner Pages: Zero Overflow + Axe-Core Verification + Screenshots
    for (const route of ['/services', '/team', '/bridal', '/gallery', '/about', '/enquire']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(overflow, `Horizontal overflow detected on ${route}`).toBe(false);

      const axeRoute = await new AxeBuilder({ page }).analyze();
      const seriousRoute = axeRoute.violations.filter((v) =>
        ['critical', 'serious'].includes(v.impact || '')
      );
      expect(seriousRoute, `Axe violations on ${route}: ${JSON.stringify(seriousRoute)}`).toEqual([]);

      const slug = route.replace('/', '');
      await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, `v4-desktop-page-${slug}.png`) });
    }

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedResponses).toEqual([]);
  });

  test('tablet layout integrity check (768x1024)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'tablet', 'Tablet-specific check');
    await page.addInitScript(() => sessionStorage.setItem('aera_entrance_seen', '1'));
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(350);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-tablet-hero.png') });
  });

  test('mobile entrance, touch mirrors, video section & menu drawer (390x844)', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-specific journey');
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));

    await page.goto('/', { waitUntil: 'commit' });
    await page.locator('#aera-entrance[open]').waitFor();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-mobile-01-closed.png') });

    await page.waitForTimeout(820);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-mobile-02-swinging.png') });

    await page.waitForSelector('#aera-entrance[open]', { state: 'detached', timeout: 5500 });
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-mobile-03-hero.png') });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);

    await page.locator('#living-mirrors').scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await page.getByRole('button', { name: /03 · Skincare & Facials/i }).click();
    await expect(page.locator('#mirror-console-ledger')).toContainText('Skincare & Facials');
    await page.waitForTimeout(550);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-mobile-04-mirrors.png') });

    await page.locator('#aera-in-motion').scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-mobile-05-in-motion.png') });

    await page.getByRole('button', { name: /Open navigation menu/i }).click();
    await expect(page.getByRole('dialog', { name: /Mobile Navigation/i })).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v4-mobile-06-menu.png') });
    await page.getByRole('button', { name: /Close navigation menu/i }).click();

    expect(errors).toEqual([]);
  });

  test('reduced-motion preference bypasses entrance immediately', async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Run once under desktop');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('button', { name: /skip entrance/i })).toHaveCount(0);
    const h1Opacity = await page.locator('h1').evaluate((el) => getComputedStyle(el).opacity);
    expect(h1Opacity).toBe('1');
    await context.close();
  });
});
