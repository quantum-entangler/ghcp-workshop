import { test, expect } from '@playwright/test';

/**
 * Test all screens in both light and dark modes
 * This will capture screenshots of each page to verify the theme consistency
 */

const pages = [
  { name: 'home', path: '/' },
  { name: 'nba-scores', path: '/nba-scores' },
  { name: 'players-info', path: '/players-info' },
  { name: 'stadiums', path: '/stadiums' },
  { name: 'login', path: '/login' },
  { name: 'optimization', path: '/optimization' },
  { name: 'add-player', path: '/errors' },
];

// Test each page in light mode
test.describe('Light Mode Screenshots', () => {
  for (const page of pages) {
    test(`${page.name} - light mode`, async ({ page: browserPage }) => {
      // Navigate to the page
      await browserPage.goto(page.path);
      
      // Wait for page to be fully loaded
      await browserPage.waitForLoadState('networkidle');
      
      // Ensure we're in light mode by removing dark class if present
      await browserPage.evaluate(() => {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      });
      
      // Wait a bit for theme to apply
      await browserPage.waitForTimeout(500);
      
      // Take screenshot
      await browserPage.screenshot({ 
        path: `../test-screenshots/light-${page.name}.png`,
        fullPage: true 
      });
      
      // Verify page loaded correctly
      await expect(browserPage.locator('body')).toBeVisible();
    });
  }
});

// Test each page in dark mode
test.describe('Dark Mode Screenshots', () => {
  for (const page of pages) {
    test(`${page.name} - dark mode`, async ({ page: browserPage }) => {
      // Navigate to the page
      await browserPage.goto(page.path);
      
      // Wait for page to be fully loaded
      await browserPage.waitForLoadState('networkidle');
      
      // Enable dark mode
      await browserPage.evaluate(() => {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      });
      
      // Wait a bit for theme to apply
      await browserPage.waitForTimeout(500);
      
      // Take screenshot
      await browserPage.screenshot({ 
        path: `../test-screenshots/dark-${page.name}.png`,
        fullPage: true 
      });
      
      // Verify page loaded correctly
      await expect(browserPage.locator('body')).toBeVisible();
    });
  }
});
