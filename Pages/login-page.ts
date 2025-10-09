import { Page, expect } from '@playwright/test';

export default class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demoqa.com/login');
  }

  async doLogin(username: string, password: string) {
    await this.page.fill('#userName', username);
    await this.page.fill('#password', password);
    await this.page.click('#login');
  }

  async checkLoggedIn(expectedUsername: string) {
    await expect(this.page.locator('#userName-value')).toHaveText(expectedUsername);
  }

  async checkInvalidCredentials() {
    await expect(this.page.locator('#name')).toHaveText('Invalid username or password!');
  }
  async logout() {
  const logoutButton = this.page.locator('#submit');
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
    await this.page.waitForURL('https://demoqa.com/login');
  }
}
}
