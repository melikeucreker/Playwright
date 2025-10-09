import { chromium } from '@playwright/test';
import LoginPage from '../Pages/login-page';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default async function globalSetup() {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const storagePath = '.auth/demoqa.json';

  if (!username || !password) {
    throw new Error('there is no change');
  }

  if (!fs.existsSync('.auth')) fs.mkdirSync('.auth');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.doLogin(username, password);
  await loginPage.checkLoggedIn(username);

  await page.context().storageState({ path: storagePath });

  await browser.close();
}


