import { test } from '@playwright/test';
import { InventoryPage } from '../../Pages/inventory-page';

test.use({ storageState: 'storageStates/user.json' });

test.describe('User Dashboard Tests (with POM)', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('User should see the product list', async () => {
    await inventoryPage.verifyItemCount(6);
  });

  test('User should see shopping cart icon', async () => {
    await inventoryPage.verifyCartIconVisible();
  });

  test('User should be able to add a product to the cart', async () => {
    await inventoryPage.addProductToCart();
    await inventoryPage.verifyCartBadge('1');
  });
});
