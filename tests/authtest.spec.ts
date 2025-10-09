import { test } from '@playwright/test';
import LoginPage from '../Pages/login-page';
import pages from '../utils/pages';
import userData from './data/data-user';
const userName = process.env.USERNAME!;
const password = process.env.PASSWORD!;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } });
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
  await loginPage.logout();
});

test.describe('Book Store - Login', () => {

  test('successful login', async () => {
    await loginPage.doLogin(userName, password);
    await loginPage.checkLoggedIn(userName);
  });

  test('failing login - invalid username', async () => {
    await loginPage.doLogin(userData.invalidUsername, password);
    await loginPage.checkInvalidCredentials();
  });

  test('failing login - invalid password', async () => {
    await loginPage.doLogin(userName, userData.invalidPassword);
    await loginPage.checkInvalidCredentials();
  });

});
