import { test, expect } from '../../src/fixtures/test-fixtures';
import { TestDataGenerator } from '../../src/utils/test-data-generator';

test.describe('Article Management @regression', () => {
  test('should create a new article', async ({ articlePage }) => {
    const article = TestDataGenerator.generateArticle();
    await articlePage.gotoNewArticle();
    await articlePage.createArticle(article.title, article.description, article.body, article.tags);
    await articlePage.verifyArticleContent(article.title, article.body);
  });

  test('should create article with multiple tags', async ({ articlePage }) => {
    const article = TestDataGenerator.generateArticle();
    const tags = ['playwright', 'automation', 'e2e', 'testing'];
    await articlePage.gotoNewArticle();
    await articlePage.createArticle(article.title, article.description, article.body, tags);
    await articlePage.verifyArticlePageLoaded();
  });

  test('should add comment to article', async ({ articlePage, homePage }) => {
    await homePage.goto();
    await homePage.switchToGlobalFeed();
    const articles = homePage.page.locator('.article-preview h1');
    const count = await articles.count();
    if (count > 0) {
      await articles.first().click();
      await articlePage.waitForPageLoad();
      const comment = TestDataGenerator.generateComment();
      await articlePage.addComment(comment.body);
    }
  });

  test('should toggle favorite on article', async ({ homePage }) => {
    await homePage.goto();
    await homePage.switchToGlobalFeed();
    const favoriteButtons = homePage.page.locator('.article-preview .btn-outline-primary');
    const count = await favoriteButtons.count();
    if (count > 0) {
      const initialText = await favoriteButtons.first().textContent();
      await favoriteButtons.first().click();
      await homePage.page.waitForTimeout(1000);
      const updatedText = await favoriteButtons.first().textContent();
      expect(updatedText).not.toBe(initialText);
    }
  });

  test('should display article details correctly', async ({ homePage, articlePage }) => {
    await homePage.goto();
    await homePage.switchToGlobalFeed();
    const articles = homePage.page.locator('.article-preview h1');
    const count = await articles.count();
    if (count > 0) {
      const expectedTitle = await articles.first().textContent();
      await articles.first().click();
      await articlePage.verifyArticlePageLoaded();
      if (expectedTitle) {
        await expect(articlePage.articleTitle).toContainText(expectedTitle);
      }
    }
  });
});
