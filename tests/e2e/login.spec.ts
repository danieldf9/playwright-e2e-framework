import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('Login Feature @smoke', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should display login page correctly', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.verifyLoginPageLoaded();
  });

  test('should login with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER_EMAIL || 'testuser@example.com',
      process.env.TEST_USER_PASSWORD || 'Password123!'
    );
    await homePage.waitForPageLoad();
    await expect(homePage.page).toHaveURL('/');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid@email.com', 'wrongpassword');
    const errors = await loginPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error for empty email', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', 'Password123!');
    const errors = await loginPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error for empty password', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('testuser@example.com', '');
    const errors = await loginPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should navigate to sign up page', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.navigateToSignUp();
    await expect(loginPage.page).toHaveURL(/.*register/);
  });
});
