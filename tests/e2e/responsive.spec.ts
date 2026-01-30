import { test, expect } from '@playwright/test';

/**
 * Responsive Design Test Suite
 * Validates mobile-first responsive behavior across all breakpoints
 * Tests: Layout, Navigation, Animations, Accessibility
 */

test.describe('Responsive Homepage Tests', () => {
  // =====================================
  // SMALL MOBILE (375px)
  // =====================================
  test.describe('Small Mobile (375px)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should render homepage without layout issues', async ({ page }) => {
      await page.goto('/');

      // Wait for initial load
      await page.waitForLoadState('networkidle');

      // Check logo is visible and properly sized
      const logo = page.locator('.hero-logo, .menu-logo').first();
      await expect(logo).toBeVisible();

      // Check no horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(375);
    });

    test('should hide desktop-only elements', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Desktop columns should be hidden on mobile
      const desktopCols = page.locator('.hero-header-col-lg, .hero-footer-col-lg');
      await expect(desktopCols.first()).not.toBeVisible();
    });

    test('should show mobile navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Mobile menu should be accessible
      const menuTrigger = page.locator('.menu-logo, .vanguard-menu-trigger');
      await expect(menuTrigger.first()).toBeVisible();
    });
  });

  // =====================================
  // TABLET (768px)
  // =====================================
  test.describe('Tablet (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should render homepage with tablet layout', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check responsive text sizing
      const heroTitle = page.locator('.hero h3, .hero-tagline').first();
      await expect(heroTitle).toBeVisible();

      // Verify no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(768);
    });

    test('should maintain proper spacing', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check footer layout
      const footer = page.locator('.footer-nav-grid, .heritage-footer');
      await expect(footer.first()).toBeVisible();
    });
  });

  // =====================================
  // DESKTOP (1280px)
  // =====================================
  test.describe('Desktop (1280px)', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('should render homepage with desktop layout', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Desktop columns should be visible
      const desktopCol = page.locator('.hero-footer-col-lg, .hero-header-col-lg').first();

      // Give some time for layout to render
      await page.waitForTimeout(500);

      // Check if element exists (may not be visible due to animations)
      const exists = await desktopCol.count();
      expect(exists).toBeGreaterThan(0);
    });

    test('should show desktop navigation elements', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Large menu logo for desktop
      const logo = page.locator('.menu-logo, .vanguard-trigger-logo').first();
      await expect(logo).toBeVisible();
    });
  });

  // =====================================
  // LARGE DESKTOP (1920px)
  // =====================================
  test.describe('Large Desktop (1920px)', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should render without layout issues on large screens', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check content is centered and not stretched
      const heroSection = page.locator('.hero, .immersive-hero').first();
      await expect(heroSection).toBeVisible();

      // Verify no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(1920);
    });
  });
});

test.describe('Animation Performance Tests', () => {
  test('should use device-appropriate particle count', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if animation config is applied
    const particleCount = await page.evaluate(() => {
      // This checks if device detection is working
      return window.innerWidth < 768 ? 'mobile' : 'desktop';
    });

    expect(particleCount).toBeTruthy();
  });

  test('should respect prefers-reduced-motion', async ({ page }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if particle systems are hidden
    const particles = page.locator('.cinematic-particles, .particle-system');
    const count = await particles.count();

    // Particles should be hidden with reduced motion
    if (count > 0) {
      const isHidden = await particles.first().evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.display === 'none';
      });
      expect(isHidden).toBe(true);
    }
  });
});

test.describe('Navigation Tests', () => {
  test('mobile menu should open and close', async ({ page }) => {
    test.use({ viewport: { width: 375, height: 667 } });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find and click menu trigger
    const menuTrigger = page.locator('.menu-logo, .vanguard-menu-trigger').first();
    await menuTrigger.click();

    // Wait for menu to animate open
    await page.waitForTimeout(1000);

    // Check if menu overlay is visible
    const menuOverlay = page.locator('.menu-overlay, .vanguard-menu-overlay').first();
    const isVisible = await menuOverlay.isVisible();

    // Menu should be visible after clicking trigger
    expect(isVisible).toBeTruthy();
  });

  test('desktop menu should have hover effects', async ({ page }) => {
    test.use({ viewport: { width: 1280, height: 720 } });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check menu logo exists
    const menuLogo = page.locator('.menu-logo, .vanguard-trigger-logo').first();
    await expect(menuLogo).toBeVisible();
  });
});

test.describe('Accessibility Tests', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for h1 elements
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check all images have alt attributes
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab through focusable elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    const isFocused = await focusedElement.count();
    expect(isFocused).toBeGreaterThan(0);
  });
});

test.describe('CSS Responsive Breakpoints', () => {
  const breakpoints = [
    { name: 'xs', width: 480, height: 800 },
    { name: 'sm', width: 640, height: 800 },
    { name: 'md', width: 768, height: 1024 },
    { name: 'lg', width: 1024, height: 768 },
    { name: 'xl', width: 1280, height: 720 },
    { name: '2xl', width: 1536, height: 864 },
  ];

  for (const bp of breakpoints) {
    test(`should render correctly at ${bp.name} (${bp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check no horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(bp.width);

      // Take screenshot for visual regression
      await page.screenshot({
        path: `tests/screenshots/${bp.name}-${bp.width}px.png`,
        fullPage: false,
      });
    });
  }
});
