import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  readonly imageInput: Locator;
  readonly usernameInput: Locator;
  readonly bioInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly updateButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.imageInput = page.getByPlaceholder('URL of profile picture');
    this.usernameInput = page.getByPlaceholder('Your Name');
    this.bioInput = page.getByPlaceholder('Short bio about you');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('New Password');
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page.getByRole('button', { name: 'Or click here to logout.' });
  }

  async goto(): Promise<void> {
    await this.navigate('/settings');
    await this.waitForPageLoad();
  }

  async updateProfile(data: { username?: string; bio?: string; email?: string; password?: string; image?: string }): Promise<void> {
    if (data.image) await this.fillInput(this.imageInput, data.image);
    if (data.username) await this.fillInput(this.usernameInput, data.username);
    if (data.bio) await this.fillInput(this.bioInput, data.bio);
    if (data.email) await this.fillInput(this.emailInput, data.email);
    if (data.password) await this.fillInput(this.passwordInput, data.password);
    await this.clickElement(this.updateButton);
    await this.waitForPageLoad();
  }

  async logout(): Promise<void> {
    await this.clickElement(this.logoutButton);
    await this.waitForPageLoad();
  }

  async verifySettingsPageLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.updateButton).toBeVisible();
  }
}
