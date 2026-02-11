import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async selectDropdownOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async waitForURL(url: string | RegExp): Promise<void> {
    await this.page.waitForURL(url);
  }

  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }
}
