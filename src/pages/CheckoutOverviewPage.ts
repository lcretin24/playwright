import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product, OrderSummary } from '../types';
import { ENV } from '../../config/env.config';

export class CheckoutOverviewPage extends BasePage {
    // ── Locators ──────────────────────────────────────────────────────────────
    private get pageTitle() { return this.page.locator('.title'); }
    private get finishButton() { return this.page.locator('[data-test="finish"]'); }
    private get cartItems() { return this.page.locator('.cart_item'); }
    private itemNameLocator(item: ReturnType<typeof this.cartItems.nth>) {
        return item.locator('.inventory_item_name');
    }
    private itemPriceLocator(item: ReturnType<typeof this.cartItems.nth>) {
        return item.locator('.inventory_item_price');
    }
    private get itemTotalLabel() { return this.page.locator('.summary_subtotal_label'); }
    private get taxLabel() { return this.page.locator('.summary_tax_label'); }
    private get totalLabel() { return this.page.locator('.summary_total_label'); }
    private extractAmount(text: string): number {
        const match = text.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
    }

    async assertPageLoaded(): Promise<void> {
        await this.assertVisible(this.pageTitle);
        await expect(this.pageTitle).toHaveText('Checkout: Overview');
    }

    async finishCheckout(): Promise<void> {
        await this.clickElement(this.finishButton);
    }

    async assertOrderContains(expectedProducts: Product[]): Promise<void> {
        const summary = await this.getOrderSummary();
        expect(summary.items).toHaveLength(expectedProducts.length);

        for (const expected of expectedProducts) {
            const found = summary.items.find(item => item.name === expected.name);
            expect(found, `Product "${expected.name}" not found in overview`).toBeDefined();
            expect(found!.price).toBeCloseTo(expected.price, 2);
        }
    }
    async getOrderSummary(): Promise<OrderSummary> {
        const count = await this.cartItems.count();
        const items: Product[] = [];

        for (let i = 0; i < count; i++) {
            const item = this.cartItems.nth(i);
            const name = await this.itemNameLocator(item).innerText();
            const priceText = await this.itemPriceLocator(item).innerText();
            items.push({ name: name.trim(), price: parseFloat(priceText.replace('$', '')) });
        }

        const itemTotalText = await this.itemTotalLabel.innerText();
        const taxText = await this.taxLabel.innerText();
        const totalText = await this.totalLabel.innerText();

        return {
            items,
            itemTotal: this.extractAmount(itemTotalText),
            tax: this.extractAmount(taxText),
            total: this.extractAmount(totalText),
        };
    }
    async assertPricingCalculation(expectedProducts: Product[]): Promise<void> {
        const summary = await this.getOrderSummary();

        // item total = Σ item price * quantity
        const expectedItemTotal = expectedProducts.reduce(
            (sum, p) => sum + p.price * (p.quantity ?? 1),
            0
        );

        // tax = item total * 8%
        const expectedTax = parseFloat((expectedItemTotal * ENV.TAX_RATE).toFixed(2));
        const expectedTotal = parseFloat((expectedItemTotal + expectedTax).toFixed(2));

        expect(summary.itemTotal).toBeCloseTo(expectedItemTotal, 2);
        expect(summary.tax).toBeCloseTo(expectedTax, 2);
        expect(summary.total).toBeCloseTo(expectedTotal, 2);
        // console.log(`Item Total: expected=${expectedItemTotal}, received=${summary.itemTotal}`);
        // console.log(`Tax:        expected=${expectedTax}, received=${summary.tax}`);
        // console.log(`Total:      expected=${expectedTotal}, received=${summary.total}`);
    }
    

}