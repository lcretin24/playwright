import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../../config/env.config';
 
export class LoginPage extends BasePage {
    private get usernameInput() { return this.page.locator('#user-name'); }
    private get passwordInput() { return this.page.locator('#password'); }
    private get loginButton()   { return this.page.locator('#login-button'); }
    private get errorMessage()  { return this.page.locator('[data-test="error"]'); }

    async open(): Promise<void> {
        await this.navigate(ENV.BASE_URL)
        await this.waitForPageLoad()

    }
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithDefaultCredentials(): Promise<void> {
        await this.login(ENV.CREDENTIALS.username, ENV.CREDENTIALS.password);
    }
  }
