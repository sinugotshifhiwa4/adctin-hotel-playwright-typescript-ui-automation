import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage";

export class LoginPage extends BasePage {
  readonly page: Page;
  private readonly usernameTextBox: Locator;
  private readonly passwordTextBox: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly hotelLogo: Locator;
  private readonly welcomeText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.usernameTextBox = page.locator(`#username`);
    this.passwordTextBox = page.locator(`#password`);
    this.loginButton = page.locator(`#login`);
    this.errorMessage = page.locator(`div[class='auth_error']`);
    this.hotelLogo = page.locator(`img[class='logo']`);
    this.welcomeText = page.locator(`#username_show`);
  }

  async fillUsername(username: string) {
    await this.clearELement(this.usernameTextBox, "usernameTextBox");
    await this.fillElement(this.usernameTextBox, username, "usernameTextBox");
  }

  async fillPassword(password: string) {
    await this.clearELement(this.passwordTextBox, "passwordTextBox");
    await this.fillElement(this.passwordTextBox, password, "passwordTextBox");
  }

  async clickLoginButton() {
    await this.clickElement(this.loginButton, "loginButton");
  }

  async isErrorMessagePresent() {
    await this.verifyElementIsVisible(this.errorMessage, "errorMessagePresent");
  }

  async isErrorMessageAbsent() {
    await this.verifyElementIsNotVisible(this.errorMessage, "errorMessageAbsent");
  }

  async isAdactinHotelLogoPresent() {
    await this.verifyElementIsVisible(this.hotelLogo, "hotelLogoPresent");
  }

  async isWelcomeTextPresent() {
    await this.verifyElementIsVisible(this.welcomeText, "welcomeTextPresent");
  }

  async loginToAdactinHotel(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}
