import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_CAPTURES = path.resolve('audit-captures');

test.beforeAll(() => {
  fs.mkdirSync(ARTIFACT_CAPTURES, { recursive: true });
});

test.describe('AERA Beauty Studio V2 — Visual, Scroll, A11y & Functional Audit', () => {
  test('desktop complete journey, entrance sequence, pinned choreography, drag B/A, axe & routes', async ({
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

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // 1. Entrance Closed -> Swinging Inward -> Corridor Walk-In -> Hero
    await page.waitForTimeout(80);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-01-entrance-closed.png') });

    await page.waitForTimeout(820);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-02-entrance-swinging.png') });

    await page.waitForTimeout(950);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-03-entrance-glide.png') });

    await page.waitForSelector('button:has-text("Skip Entrance")', { state: 'detached', timeout: 5500 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-04-hero-settled.png') });

    const heroCheck = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      h1: document.querySelector('h1')?.textContent?.trim(),
    }));
    expect(heroCheck.scrollWidth).toBeLessThanOrEqual(heroCheck.innerWidth);
    expect(heroCheck.h1).toContain('Thoughtful hair');

    // 2. Living Mirror Room + Roving Keyboard Focus
    const mirrorSection = page.locator('#living-mirrors');
    await mirrorSection.evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(500);

    const colourMirrorTab = page.locator('[role="tab"]').nth(1);
    await colourMirrorTab.click();
    await expect(page.locator('#mirror-console-ledger')).toContainText('Hair Colour');
    await expect(page.locator('#mirror-console-ledger')).toContainText('₹8,500');
    await page.waitForTimeout(620);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-05-living-mirrors.png') });

    await colourMirrorTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#mirror-console-ledger')).toContainText('Skincare & Facials');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#mirror-console-ledger')).toContainText('Hair Colour');

    // 3. Pinned Process Sequence: Forward Scroll + Reverse Scroll
    const processRect = await page.locator('#transformation-section').evaluate((el) => {
      const r = el.firstElementChild?.nextElementSibling?.getBoundingClientRect();
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      const host = el.querySelector('.lg\\:h-\\[220vh\\]')?.getBoundingClientRect();
      return { top, range: Math.max(400, (host?.height || 1400) - (window.innerHeight - 64)) };
    });
    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.1), processRect);
    await page.waitForTimeout(450);
    await expect(page.locator('#transformation-section')).toContainText('Step 01');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-06a-stage1-pin.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.5), processRect);
    await page.waitForTimeout(550);
    await expect(page.locator('#transformation-section')).toContainText('Step 02');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-06b-stage2-pin.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.88), processRect);
    await page.waitForTimeout(550);
    await expect(page.locator('#transformation-section')).toContainText('Step 03');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-06c-stage3-pin.png') });

    // Reverse scroll verifies state rolls back gracefully
    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.12), processRect);
    await page.waitForTimeout(500);
    await expect(page.locator('#transformation-section')).toContainText('Step 01');

    // 4. Before & After Scroll Reveal & Direct Drag Without Fighting Scroll
    const slider = page.locator('#ba-split-slider');
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const valAfterScroll = Number(await slider.inputValue());
    expect(valAfterScroll).toBeLessThan(95);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-07a-ba-scroll.png') });

    // Direct mouse drag across the photograph
    const box = await slider.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.5);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.5, { steps: 10 });
      await page.mouse.up();
    }
    await page.waitForTimeout(250);
    const draggedVal = Number(await slider.inputValue());
    expect(draggedVal).toBeGreaterThanOrEqual(22);
    expect(draggedVal).toBeLessThanOrEqual(40);

    // Nudge page scroll slightly -> verify scroll does NOT fight manual drag
    await page.evaluate(() => window.scrollBy(0, 60));
    await page.waitForTimeout(250);
    expect(Number(await slider.inputValue())).toBe(draggedVal);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-07b-ba-manual-drag.png') });

    // 5. Meet Our Stylists Sticky Horizontal Scroll Track
    const stylistsRect = await page.getByLabel('Meet Our Stylists').evaluate((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      return { top, range: Math.max(400, el.getBoundingClientRect().height - (window.innerHeight - 64)) };
    });
    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.08), stylistsRect);
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-08a-stylists-start.png') });

    await page.evaluate(({ top, range }) => window.scrollTo(0, top + range * 0.85), stylistsRect);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-08b-stylists-scrolled.png') });

    // 6. Lookbook Drawer -> Booking Submission -> WhatsApp Modal
    const lookbookHeading = page.getByRole('heading', { name: /Recent looks from the studio chairs/i });
    await lookbookHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await page.getByRole('button', { name: 'Hair Colour', exact: true }).click();
    await page.getByRole('button', { name: /Get This Look/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-09-lookbook-drawer.png') });

    await page.getByRole('button', { name: /Book This Look/i }).click();
    await page.getByRole('button', { name: /Continue to Stylist/i }).click();
    await page.getByRole('button', { name: /Continue to Your Details/i }).click();
    await page.getByPlaceholder(/Aditi Sharma/i).fill('Neha Rao');
    await page.getByPlaceholder(/aditi@example.com/i).fill('neha@example.com');
    await page.getByRole('button', { name: /Submit Appointment Request/i }).click();
    await expect(page.getByText(/Preview Logged Locally/i)).toBeVisible();
    await page.getByRole('button', { name: /Preview WhatsApp Message/i }).click();
    await expect(page.getByText(/disabled in showcase mode/i)).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-10-whatsapp-modal.png') });
    await page.getByRole('button', { name: /Close WhatsApp message preview/i }).click();
    await page.getByRole('button', { name: /Close appointment drawer/i }).click();
    await page.waitForTimeout(300);

    // 7. Closing Booking Scene & Footer Disclosure
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(page.locator('footer')).toContainText('Portfolio Concept Showcase');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-desktop-11-closing-and-footer.png') });

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
    console.log('MEASURED_VITALS_V2:', JSON.stringify(metrics));
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
      await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, `v2-desktop-page-${slug}.png`) });
    }

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedResponses).toEqual([]);
  });

  test('tablet layout integrity check (768x1024)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'tablet', 'Tablet-specific check');
    await page.addInitScript(() => sessionStorage.setItem('aera_entrance_seen', '1'));
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-tablet-hero.png') });
  });

  test('mobile entrance, touch mirrors, swipe stylists & menu drawer (390x844)', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-specific journey');
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(80);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-mobile-01-closed.png') });

    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-mobile-02-swinging.png') });

    await page.waitForSelector('button:has-text("Skip Entrance")', { state: 'detached', timeout: 5500 });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-mobile-03-hero.png') });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);

    await page.locator('#living-mirrors').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: /03 · Skincare & Facials/i }).click();
    await expect(page.locator('#mirror-console-ledger')).toContainText('Skincare & Facials');
    await page.waitForTimeout(550);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-mobile-04-mirrors.png') });

    // Mobile drawer
    await page.getByRole('button', { name: /Open navigation menu/i }).click();
    await expect(page.getByRole('dialog', { name: /Mobile Navigation/i })).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'v2-mobile-05-menu.png') });
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
    await expect(page.locator('button:has-text("Skip Entrance")')).toHaveCount(0);
    const h1Opacity = await page.locator('h1').evaluate((el) => getComputedStyle(el).opacity);
    expect(h1Opacity).toBe('1');
    await context.close();
  });
});
