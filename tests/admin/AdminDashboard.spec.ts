import { test } from '@playwright/test';
import { InventoryPage } from '../../Pages/inventory-page';

test.use({ storageState: 'storageStates/admin.json' });

test.describe('Admin Dashboard Tests (with POM)', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('Admin should see product list', async () => {
    await inventoryPage.verifyItemCount(6);
  });

  test('Admin should see shopping cart icon', async () => {
    await inventoryPage.verifyCartIconVisible();
  });

  test('Admin should be able to add a product to the cart', async () => {
    await inventoryPage.addProductToCart();
    await inventoryPage.verifyCartBadge('1');
  });
});
