import { Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'
 
export class CheckoutCompletePage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────
  private get pageTitle() {
    return this.page.locator('.title')
  }
 
  private get confirmationMessage() {
    return this.page.locator('.complete-header')
  }
 
  private get backHomeButton() {
    return this.page.locator('[data-test="back-to-products"]')
  }
  private get cartBadge() {
    return this.page.locator('.shopping_cart_badge')
  } 
 
  // ── Methods ──────────────────────────────────────────────────────────────
  async clickBackHome(): Promise<void> {
    await this.clickElement(this.backHomeButton)
  }
 
  async assertOrderConfirmed(): Promise<void> {
    await this.assertVisible(this.confirmationMessage)
    await expect(this.confirmationMessage).toHaveText(
      'Thank you for your order!'
    )
  }
 
  // ── Methods ──────────────────────────────────────────────────────────────
  async assertPageLoaded(): Promise<void> {
    await this.assertVisible(this.pageTitle)
    await expect(this.pageTitle).toHaveText('Checkout: Complete!')
  }
  async assertCartIsEmpty(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  } 
}
 