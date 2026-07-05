import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';
import { Page, expect } from '@playwright/test';

Then('the checkout information page should be displayed', async function (this: CustomWorld) {
  await this.checkoutInfoPage.assertPageLoaded();
});

When('I submit checkout information with first name {string}, last name {string} and zip {string}', async function (this: CustomWorld, firstName: string, lastName: string, zipCode: string) {
  await this.checkoutInfoPage.submitCheckoutInfo({ firstName, lastName, zipCode });
});

Then('I should see an error message {string}', async function (this: CustomWorld, errorMessage: string) {
  await this.checkoutInfoPage.assertErrorMessage(errorMessage);
});

When('I fill in the checkout information', async function (this: CustomWorld) {
  await this.checkoutInfoPage.fillDefaultCheckoutInfo();
});

When('I continue to the checkout overview', async function (this: CustomWorld) {
  await this.checkoutInfoPage.continueToOverview();
});

Then('the checkout overview page should be displayed', async function (this: CustomWorld) {
  await this.checkoutOverviewPage.assertPageLoaded();
});

Then('the overview should contain the items I selected', async function (this: CustomWorld) {
  const expectedProducts = this.addedProducts;
  await this.checkoutOverviewPage.assertOrderContains(expectedProducts);
});

Then(
  'the total price should be correctly calculated',
  async function (this: CustomWorld) {
    await this.checkoutOverviewPage.assertPricingCalculation(this.addedProducts);
  }
);

When('I finish the checkout', async function (this: CustomWorld) {
  await this.checkoutOverviewPage.finishCheckout();
});

Then('the checkout complete page should be displayed', async function (this: CustomWorld) {
  await this.checkoutCompletePage.assertPageLoaded();
});

Then('my order should be confirmed', async function (this: CustomWorld) {
  await this.checkoutCompletePage.assertOrderConfirmed();
});

Then('the shopping cart should be reset to empty', async function (this: CustomWorld) {
  await this.checkoutCompletePage.assertCartIsEmpty();
});

 