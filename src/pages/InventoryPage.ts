import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../types';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';
 
const SORT_VALUES: Record<SortOption, string> = {
  az:   'az',
  za:   'za',
  lohi: 'lohi',
  hilo: 'hilo',
};

export class InventoryPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────
  private get inventoryItems() { return this.page.locator('.inventory_item'); }

  private get cartLink(){ return this.page.locator('.shopping_cart_link'); }
  private get cartBadge() { return this.page.locator('.shopping_cart_badge'); }
  private itemNameLocator(item: ReturnType<typeof this.inventoryItems.nth>) {
    return item.locator('.inventory_item_name');
  }

  private itemPriceLocator(item: ReturnType<typeof this.inventoryItems.nth>) {
    return item.locator('.inventory_item_price');
  }
  
  private itemAddButtonLocator(item: ReturnType<typeof this.inventoryItems.nth>) {
    return item.locator('button[data-test^="add-to-cart"]');
  }

  private get pageTitle()      { return this.page.locator('.title'); }
  private get selectSortDropdown() { return this.page.locator('.product_sort_container'); }

  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageTitle);
    await expect(this.pageTitle).toHaveText('Products');

  }
  async addFirstNProductsToCart(n: number): Promise<Product[]> {

    const addedProducts: Product[] = [];
    for (let i = 0; i < n; i++) {
      const product = await this.addProductByIndex(i);
      addedProducts.push(product);
    }
    return addedProducts;
  }

  async addProductByIndex(index: number): Promise<Product> {
    const item  = this.inventoryItems.nth(index);
    const name  = await this.itemNameLocator(item).innerText();
    const priceText = await this.itemPriceLocator(item).innerText();
    const price = parseFloat(priceText.replace('$', ''));
 
    await this.clickElement(this.itemAddButtonLocator(item));
    return { name: name.trim(), price, quantity: 1 };
  }  

  async goToCart(): Promise<void> {
    await this.clickElement(this.cartLink);  
  }
  
  async sortProducts(option: SortOption): Promise<void> {
    await this.selectSortDropdown.selectOption(SORT_VALUES[option]);
  }

  async assertSortedByPriceAscending(): Promise<void> {
    const products = await this.getProductList();
    const prices   = products.map(p => p.price);
    const sorted   = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }
  async getProductList(): Promise<Product[]> {
    const count = await this.inventoryItems.count();
    const products: Product[] = [];
 
    for (let i = 0; i < count; i++) {
      const item = this.inventoryItems.nth(i);
      const name  = await this.itemNameLocator(item).innerText();
      const priceText = await this.itemPriceLocator(item).innerText();
      const price = parseFloat(priceText.replace('$', ''));
      products.push({ name: name.trim(), price });
    }
 
    return products;
  }
  async assertSortedByNameDescending(): Promise<void> {
    const products = await this.getProductList();
    const names = products.map(p => p.name);
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  } 

  async assertCartBadgeShowsItems(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }
  

}


  