import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly username: Locator;
  readonly bio: Locator;
  readonly editProfileButton: Locator;
  readonly followButton: Locator;
  readonly myArticlesTab: Locator;
  readonly favoritedArticlesTab: Locator;
  readonly articlePreviews: Locator;
  readonly userImage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('.user-info h4');
    this.bio = page.locator('.user-info p');
    this.editProfileButton = page.getByRole('link', { name: ' Edit Profile Settings' });
    this.followButton = page.locator('.user-info .btn');
    this.myArticlesTab = page.getByRole('link', { name: 'My Articles' });
    this.favoritedArticlesTab = page.getByRole('link', { name: 'Favorited Articles' });
    this.articlePreviews = page.locator('.article-preview');
    this.userImage = page.locator('.user-info img');
  }

  async goto(username: string): Promise<void> {
    await this.navigate(`/@${username}`);
    await this.waitForPageLoad();
  }

  async verifyProfileLoaded(expectedUsername: string): Promise<void> {
    await expect(this.username).toContainText(expectedUsername);
  }

  async switchToFavoritedArticles(): Promise<void> {
    await this.clickElement(this.favoritedArticlesTab);
    await this.waitForPageLoad();
  }

  async switchToMyArticles(): Promise<void> {
    await this.clickElement(this.myArticlesTab);
    await this.waitForPageLoad();
  }

  async getArticleCount(): Promise<number> {
    return await this.getElementCount(this.articlePreviews);
  }

  async toggleFollow(): Promise<void> {
    await this.clickElement(this.followButton);
  }

  async navigateToEditProfile(): Promise<void> {
    await this.clickElement(this.editProfileButton);
  }
}
