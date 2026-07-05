import { Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';

When('I proceed to checkout', async function (this: CustomWorld) {
    await this.cartPage.proceedToCheckout();
    });
Then ('the cart page should be displayed', async function (this: CustomWorld) {
  await this.cartPage.assertPageLoaded();
}); 

Then('the cart should contain the items I added', async function (this: CustomWorld) {
   await this.cartPage.assertCartContainsProducts(this.addedProducts);
});

Then('the cart should have {int} items', async function (this: CustomWorld, count: number) {
  await this.cartPage.assertCartItemCount(count);
});