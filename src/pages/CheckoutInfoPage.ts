import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutInfo } from '../types';
import { ENV } from '../../config/env.config';


export class CheckoutInfoPage extends BasePage {
    // ── Locators ──────────────────────────────────────────────────────────────
    
    private get pageTitle() { return this.page.locator('.title'); }
    private get firstNameInput() { return this.page.locator('[data-test="firstName"]'); }
    private get lastNameInput() { return this.page.locator('[data-test="lastName"]'); }
    private get zipCodeInput() { return this.page.locator('[data-test="postalCode"]'); }
    private get continueButton() { return this.page.locator('[data-test="continue"]'); }
    private get errorMessage() { return this.page.locator('[data-test="error"]'); } 

    async assertPageLoaded(): Promise<void> {
        await this.assertVisible(this.pageTitle);
        await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    }

    async submitCheckoutInfo(info: CheckoutInfo): Promise<void> {
        await this.fillCheckoutInfo(info);
        await this.continueToOverview();
    }
    async fillDefaultCheckoutInfo(): Promise<void> {
        await this.fillCheckoutInfo(ENV.CHECKOUT);
    }
    
    async continueToOverview(): Promise<void> {
        await this.clickElement(this.continueButton);
    }
    async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
        await this.fillInput(this.firstNameInput, info.firstName);
        await this.fillInput(this.lastNameInput,  info.lastName);
        await this.fillInput(this.zipCodeInput,   info.zipCode);
    }

    async assertErrorMessage(message: string): Promise<void> {
        await this.assertText(this.errorMessage, message);
  }
}