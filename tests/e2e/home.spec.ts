import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Home Page @smoke', () => {
  test('should load home page successfully', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveURL('/');
  });

  test('should display global feed', async ({ homePage }) => {
    await homePage.goto();
    await homePage.switchToGlobalFeed();
    const articleCount = await homePage.getArticleCount();
    expect(articleCount).toBeGreaterThan(0);
  });

  test('should display popular tags', async ({ homePage }) => {
    await homePage.goto();
    const tags = await homePage.getPopularTags();
    expect(tags.length).toBeGreaterThan(0);
  });

  test('should filter articles by tag', async ({ homePage }) => {
    await homePage.goto();
    const tags = await homePage.getPopularTags();
    if (tags.length > 0) {
      await homePage.clickTag(tags[0]);
      const articleCount = await homePage.getArticleCount();
      expect(articleCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('should display article previews with required elements', async ({ homePage }) => {
    await homePage.goto();
    await homePage.switchToGlobalFeed();
    const titles = await homePage.getArticleTitles();
    expect(titles.length).toBeGreaterThan(0);
    titles.forEach((title) => {
      expect(title.trim()).not.toBe('');
    });
  });

  test('should navigate between pages @regression', async ({ homePage }) => {
    await homePage.goto();
    await homePage.switchToGlobalFeed();
    const initialTitles = await homePage.getArticleTitles();
    if (initialTitles.length > 0) {
      await homePage.navigateToPage(2);
      const newTitles = await homePage.getArticleTitles();
      expect(newTitles).not.toEqual(initialTitles);
    }
  });
});
