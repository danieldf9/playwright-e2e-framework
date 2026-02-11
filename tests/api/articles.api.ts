import { test, expect } from '@playwright/test';
import { ApiHelpers } from '../../src/utils/api-helpers';
import { TestDataGenerator } from '../../src/utils/test-data-generator';

let api: ApiHelpers;
let authToken: string;

test.beforeAll(async ({ request }) => {
  api = new ApiHelpers(request, process.env.API_URL || 'https://conduit.productionready.io/api');
  const user = TestDataGenerator.generateUser();
  const response = await api.createUser(user.username, user.email, user.password);
  authToken = response.user.token;
});

test.beforeEach(async ({ request }) => {
  api = new ApiHelpers(request, process.env.API_URL || 'https://conduit.productionready.io/api');
});

test.describe('Articles API @api', () => {
  test('GET /articles - should return list of articles', async () => {
    const response = await api.getArticles({ limit: 10 });
    expect(response.articles).toBeDefined();
    expect(Array.isArray(response.articles)).toBeTruthy();
    expect(response.articlesCount).toBeDefined();
  });

  test('POST /articles - should create a new article', async () => {
    const article = TestDataGenerator.generateArticle();
    const response = await api.createArticle(authToken, article.title, article.description, article.body, article.tags);
    expect(response.article).toBeDefined();
    expect(response.article.title).toBe(article.title);
    expect(response.article.description).toBe(article.description);
  });

  test('GET /articles/:slug - should return specific article', async () => {
    const article = TestDataGenerator.generateArticle();
    const createResponse = await api.createArticle(authToken, article.title, article.description, article.body);
    const slug = createResponse.article.slug;
    const response = await api.getArticle(slug);
    expect(response.article.title).toBe(article.title);
    expect(response.article.slug).toBe(slug);
  });

  test('DELETE /articles/:slug - should delete an article', async () => {
    const article = TestDataGenerator.generateArticle();
    const createResponse = await api.createArticle(authToken, article.title, article.description, article.body);
    const slug = createResponse.article.slug;
    const deleteResponse = await api.deleteArticle(authToken, slug);
    expect(deleteResponse.ok()).toBeTruthy();
  });

  test('POST /articles/:slug/comments - should add comment', async () => {
    const article = TestDataGenerator.generateArticle();
    const createResponse = await api.createArticle(authToken, article.title, article.description, article.body);
    const slug = createResponse.article.slug;
    const comment = TestDataGenerator.generateComment();
    const response = await api.addComment(authToken, slug, comment.body);
    expect(response.comment).toBeDefined();
    expect(response.comment.body).toBe(comment.body);
  });

  test('POST /articles/:slug/favorite - should favorite an article', async () => {
    const article = TestDataGenerator.generateArticle();
    const createResponse = await api.createArticle(authToken, article.title, article.description, article.body);
    const slug = createResponse.article.slug;
    const response = await api.favoriteArticle(authToken, slug);
    expect(response.article.favorited).toBeTruthy();
    expect(response.article.favoritesCount).toBe(1);
  });

  test('GET /tags - should return list of tags', async () => {
    const response = await api.getTags();
    expect(response.tags).toBeDefined();
    expect(Array.isArray(response.tags)).toBeTruthy();
  });
});
