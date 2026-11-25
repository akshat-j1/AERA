import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_CAPTURES = path.resolve('audit-captures');

test.beforeAll(() => {
  fs.mkdirSync(ARTIFACT_CAPTURES, { recursive: true });
});

test.describe('AERA Beauty Studio — Visual, Motion & Functional Audit', () => {
  test('desktop complete journey, entrance sequence, interactions, inner pages & telemetry', async ({
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

    // Inject PerformanceObserver before navigation so FCP/LCP/CLS are measured cleanly
    await page.addInitScript(() => {
      (window as unknown as { __vitals: Record<string, number> }).__vitals = { cls: 0 };
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const w = window as unknown as { __vitals: Record<string, number> };
            if (entry.entryType === 'largest-contentful-paint') {
              w.__vitals.lcp = entry.startTime;
            }
            if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
              w.__vitals.fcp = entry.startTime;
            }
            if (entry.entryType === 'layout-shift' && !(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
              w.__vitals.cls += (entry as unknown as { value: number }).value;
            }
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {
        // Ignore unsupported entry types
      }
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

    // Capture Frame 1: Doors 100% Closed
    await page.waitForTimeout(80);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-01-entrance-closed.png') });

    // Capture Frame 2: Doors Swinging Open (~0.95s)
    await page.waitForTimeout(880);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-02-entrance-swinging.png') });

    // Capture Frame 3: Camera Gliding Forward (~1.95s)
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-03-entrance-pushing.png') });

    // Wait for entrance to finish (~2.85s total) -> Hero settled
    await page.waitForSelector('button:has-text("Skip Entrance")', { state: 'detached', timeout: 5000 });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-04-hero-settled.png') });

    // Verify no horizontal overflow & h1 presence
    const heroCheck = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      h1: document.querySelector('h1')?.textContent?.trim(),
      loadedFonts: Array.from(document.fonts)
        .filter((f) => f.status === 'loaded')
        .map((f) => f.family),
    }));
    expect(heroCheck.scrollWidth).toBeLessThanOrEqual(heroCheck.innerWidth);
    expect(heroCheck.h1).toContain('Sunlight');

    // Scroll to Living Mirrors & verify keyboard/click switching
    const mirrorSection = page.locator('#living-mirrors');
    await mirrorSection.evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(500);

    const colourMirrorTab = page.locator('[role="tab"]').nth(1);
    await colourMirrorTab.click();
    await expect(page.locator('#mirror-console-ledger')).toContainText('Sculptural Mineral Colour');
    await expect(page.locator('#mirror-console-ledger')).toContainText('₹8,500');
    await page.waitForTimeout(620);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-05-mirror-wall.png') });

    // Verify keyboard navigation between living mirrors
    await colourMirrorTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#mirror-console-ledger')).toContainText('Botanical Skin Sanctuary');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#mirror-console-ledger')).toContainText('Sculptural Mineral Colour');

    // Scroll to Transformation & test Before/After range slider
    const slider = page.locator('#ba-split-slider');
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await slider.fill('72');
    await expect(slider).toHaveValue('72');
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-06-transformation-ba.png') });

    // Scroll to Artisans & Lookbook
    const lookbookHeading = page.getByRole('heading', { name: /Three moods, five plates/i });
    await lookbookHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await page.getByRole('button', { name: 'Mineral Colour', exact: true }).click();
    await page.getByRole('button', { name: /Get This Look/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-07-lookbook-dossier.png') });

    // Pre-fill Demo Request from Lookbook Dossier & submit through 3 steps
    await page.getByRole('button', { name: /Pre-fill Demo Request/i }).click();
    await page.getByRole('button', { name: /Continue to Specialist/i }).click();
    await page.getByRole('button', { name: /Continue to Guest Details/i }).click();
    await page.getByPlaceholder(/Aditi Sharma/i).fill('Neha Rao');
    await page.getByPlaceholder(/aditi@example.com/i).fill('neha@example.com');
    await page.getByRole('button', { name: /Submit Demo Appointment Request/i }).click();
    await expect(page.getByText(/Demo Request Logged Locally/i)).toBeVisible();
    await page.getByRole('button', { name: /Inspect Generated WhatsApp Payload/i }).click();
    await expect(page.getByText(/Live wa.me disabled/i)).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-08-whatsapp-preview.png') });
    await page.getByRole('button', { name: /Close WhatsApp concierge preview/i }).click();
    await page.getByRole('button', { name: /Close appointment request drawer/i }).click();
    await page.waitForTimeout(300);

    // Closing Sanctuary & Footer
    const chairSection = page.getByRole('heading', { name: /Ready when/i });
    await chairSection.evaluate((el) => el.closest('section')?.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-09-chair-sanctuary.png') });

    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'desktop-10-footer.png') });

    // Semantic Landmarks & Accessibility Sanity on Homepage
    const a11yCheck = await page.evaluate(() => ({
      h1Count: document.querySelectorAll('h1').length,
      hasHeader: Boolean(document.querySelector('header')),
      hasNav: Boolean(document.querySelector('nav')),
      hasMain: Boolean(document.querySelector('main')),
      hasFooter: Boolean(document.querySelector('footer')),
      hasSkipLink: Boolean(document.querySelector('a[href="#main-content"]')),
      missingAltVisibleImgs: Array.from(document.querySelectorAll('img')).filter(
        (img) =>
          img.getAttribute('aria-hidden') !== 'true' &&
          !img.closest('[aria-hidden="true"]') &&
          !img.alt.trim()
      ).length,
    }));
    expect(a11yCheck.h1Count).toBe(1);
    expect(a11yCheck.hasHeader && a11yCheck.hasNav && a11yCheck.hasMain && a11yCheck.hasFooter).toBe(true);
    expect(a11yCheck.hasSkipLink).toBe(true);
    expect(a11yCheck.missingAltVisibleImgs).toBe(0);

    // Capture Web Vitals & Image integrity on homepage
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
    console.log('MEASURED_VITALS:', JSON.stringify(metrics));
    expect(metrics.brokenImgCount).toBe(0);

    // Visit every inner page cleanly & capture screenshots
    for (const route of ['/services', '/team', '/bridal', '/gallery', '/about', '/enquire']) {
      await page.goto(route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth
      );
      expect(overflow, `Horizontal overflow detected on ${route}`).toBe(false);
      const slug = route.replace('/', '');
      await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, `desktop-page-${slug}.png`) });
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
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'tablet-hero.png') });
  });

  test('mobile entrance, touch mirror strip, menu drawer & overflow check (390x844)', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Mobile-specific journey');
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(100);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'mobile-01-closed-doors.png') });

    await page.waitForTimeout(950);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'mobile-02-swinging.png') });

    await page.waitForSelector('button:has-text("Skip Entrance")', { state: 'detached', timeout: 5500 });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'mobile-03-hero.png') });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);

    // Scroll to mobile mirrors & test quick pill selector
    await page.locator('#living-mirrors').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: /03 · Botanical Skin Sanctuary/i }).click();
    await expect(page.locator('#mirror-console-ledger')).toContainText('Botanical Skin Sanctuary');
    await page.waitForTimeout(550);
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'mobile-04-mirrors.png') });

    // Open mobile drawer
    await page.getByRole('button', { name: /Open navigation menu/i }).click();
    await expect(page.getByRole('dialog', { name: /Mobile Navigation/i })).toBeVisible();
    await page.screenshot({ path: path.join(ARTIFACT_CAPTURES, 'mobile-05-menu.png') });
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
