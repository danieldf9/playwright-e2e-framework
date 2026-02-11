import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessages: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessages = page.locator('.error-messages li');
    this.signUpLink = page.getByRole('link', { name: 'Need an account?' });
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.signInButton);
  }

  async getErrorMessages(): Promise<string[]> {
    const count = await this.errorMessages.count();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      messages.push((await this.errorMessages.nth(i).textContent()) || '');
    }
    return messages;
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async navigateToSignUp(): Promise<void> {
    await this.clickElement(this.signUpLink);
  }
}
