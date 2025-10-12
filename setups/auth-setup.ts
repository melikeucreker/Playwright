import { test, chromium } from '@playwright/test';
import { MultiLoginPage } from '../Pages/multilogin-page';

 test('create storage states for admin and user', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new MultiLoginPage(page);

  // Admin login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.context().storageState({ path: 'storageStates/admin.json' });

  // User login
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('problem_user', 'secret_sauce');
  await page.waitForURL('https://www.saucedemo.com/inventory.html');

  await page.context().storageState({ path: 'storageStates/user.json' });

  await browser.close();
});

    


