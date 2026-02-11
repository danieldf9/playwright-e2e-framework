import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ArticlePage extends BasePage {
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly commentInput: Locator;
  readonly postCommentButton: Locator;
  readonly comments: Locator;
  readonly favoriteButton: Locator;
  readonly authorLink: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.articleTitle = page.locator('.article-page h1');
    this.articleBody = page.locator('.article-content');
    this.editButton = page.getByRole('link', { name: ' Edit Article' });
    this.deleteButton = page.getByRole('button', { name: ' Delete Article' });
    this.commentInput = page.getByPlaceholder('Write a comment...');
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.comments = page.locator('.card');
    this.favoriteButton = page.locator('.btn-outline-primary').first();
    this.authorLink = page.locator('.author').first();
  }

  async gotoNewArticle(): Promise<void> {
    await this.navigate('/editor');
    await this.waitForPageLoad();
  }

  async createArticle(title: string, description: string, body: string, tags?: string[]): Promise<void> {
    await this.fillInput(this.titleInput, title);
    await this.fillInput(this.descriptionInput, description);
    await this.fillInput(this.bodyInput, body);
    if (tags) {
      for (const tag of tags) {
        await this.fillInput(this.tagsInput, tag);
        await this.page.keyboard.press('Enter');
      }
    }
    await this.clickElement(this.publishButton);
    await this.waitForPageLoad();
  }

  async verifyArticleContent(title: string, body: string): Promise<void> {
    await expect(this.articleTitle).toContainText(title);
    await expect(this.articleBody).toContainText(body);
  }

  async addComment(comment: string): Promise<void> {
    await this.fillInput(this.commentInput, comment);
    await this.clickElement(this.postCommentButton);
    await this.waitForPageLoad();
  }

  async deleteArticle(): Promise<void> {
    await this.clickElement(this.deleteButton);
    await this.waitForPageLoad();
  }

  async toggleFavorite(): Promise<void> {
    await this.clickElement(this.favoriteButton);
  }

  async getCommentCount(): Promise<number> {
    return await this.getElementCount(this.comments);
  }

  async verifyArticlePageLoaded(): Promise<void> {
    await expect(this.articleTitle).toBeVisible();
    await expect(this.articleBody).toBeVisible();
  }
}
