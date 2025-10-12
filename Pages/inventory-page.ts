import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly items;
  readonly cartIcon;
  readonly addToCartButton;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async verifyItemCount(expectedCount: number) {
    await expect(this.items).toHaveCount(expectedCount);
  }

  async verifyCartIconVisible() {
    await expect(this.cartIcon).toBeVisible();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async verifyCartBadge(count: string) {
    const badge = this.page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText(count);
  }
}
