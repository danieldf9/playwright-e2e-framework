import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly feedToggle: Locator;
  readonly globalFeed: Locator;
  readonly yourFeed: Locator;
  readonly articlePreviews: Locator;
  readonly popularTags: Locator;
  readonly navBar: Locator;
  readonly newArticleLink: Locator;
  readonly settingsLink: Locator;
  readonly profileLink: Locator;
  readonly paginationItems: Locator;

  constructor(page: Page) {
    super(page);
    this.feedToggle = page.locator('.feed-toggle');
    this.globalFeed = page.getByRole('link', { name: 'Global Feed' });
    this.yourFeed = page.getByRole('link', { name: 'Your Feed' });
    this.articlePreviews = page.locator('.article-preview');
    this.popularTags = page.locator('.sidebar .tag-list .tag-pill');
    this.navBar = page.locator('nav.navbar');
    this.newArticleLink = page.getByRole('link', { name: ' New Article' });
    this.settingsLink = page.getByRole('link', { name: ' Settings' });
    this.profileLink = page.locator('nav .nav-link').last();
    this.paginationItems = page.locator('.pagination .page-item');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async switchToGlobalFeed(): Promise<void> {
    await this.clickElement(this.globalFeed);
    await this.waitForPageLoad();
  }

  async switchToYourFeed(): Promise<void> {
    await this.clickElement(this.yourFeed);
    await this.waitForPageLoad();
  }

  async getArticleCount(): Promise<number> {
    return await this.getElementCount(this.articlePreviews);
  }

  async clickTag(tagName: string): Promise<void> {
    await this.page.locator(`.sidebar .tag-list .tag-pill:has-text("${tagName}")`).click();
    await this.waitForPageLoad();
  }

  async getPopularTags(): Promise<string[]> {
    const tags: string[] = [];
    const count = await this.popularTags.count();
    for (let i = 0; i < count; i++) {
      tags.push((await this.popularTags.nth(i).textContent()) || '');
    }
    return tags;
  }

  async verifyUserIsLoggedIn(username: string): Promise<void> {
    await expect(this.navBar).toContainText(username);
  }

  async navigateToNewArticle(): Promise<void> {
    await this.clickElement(this.newArticleLink);
  }

  async navigateToSettings(): Promise<void> {
    await this.clickElement(this.settingsLink);
  }

  async getArticleTitles(): Promise<string[]> {
    const titles: string[] = [];
    const articleHeaders = this.page.locator('.article-preview h1');
    const count = await articleHeaders.count();
    for (let i = 0; i < count; i++) {
      titles.push((await articleHeaders.nth(i).textContent()) || '');
    }
    return titles;
  }

  async navigateToPage(pageNumber: number): Promise<void> {
    await this.paginationItems.nth(pageNumber - 1).click();
    await this.waitForPageLoad();
  }
}
