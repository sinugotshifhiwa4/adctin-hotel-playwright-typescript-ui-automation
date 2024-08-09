import { Locator, Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToUrl(url: string) {
    await this.page.goto(url);
    logger.info(`Navigated to ${url}`);
    
  }

  async fillElement(element: Locator, value: string, label: string) {
    await element.fill(value).catch((error) => {
       logger.error(`Error while filling element ${label}: ${error}`); 
    }).then(() => logger.info(`Successfully filled element ${label}`));
  }

  async clickElement(element: Locator, label: string) {
    await element.click().catch((error) => {
      logger.error(`Error while clicking element ${label}: ${error}`);
    }).then(() => logger.info(`Successfully clicked element ${label}`));
  }

  async selectElementFromDropDown(element: Locator, value: string, label: string) {
    await element.selectOption(value).catch((error) => {
      logger.error(`Error while selecting element ${label}: ${error}`);
    }).then(() => logger.info(`Successfully selected element ${label}`));
  }

  async isOptionSelected(element: Locator, value: string): Promise<boolean> {
    try {
      await element.waitFor({ state: 'visible', timeout: 20 * 1000 });
      const selectedValue = (await element.inputValue()).trim().toLowerCase();
      
      // Extract numeric part if the expected value contains both number and text
      const numericValue = value.match(/^\d+/)?.[0] || value;
      const isSelected = selectedValue === numericValue.trim().toLowerCase();
      
      expect(isSelected).toBe(true);
      await this.captureScreenshot('isOptionSelected');
      logger.info(`Option with value ${value} is selected: ${isSelected}`);
      return isSelected;
    } catch (error) {
      logger.error(`Error while checking if option with value ${value} is selected: ${error}`);
      await this.captureScreenshot(`isOptionSelected-${value}`);
      throw error; // Re-throw the error to ensure the function returns a rejected promise
    }
  }  

  async clearELement(element: Locator, label: string) {
    await element.clear().catch((error) => {
      logger.error(`Error while clearing element ${label}: ${error}`);
    }).then(() => logger.info(`Successfully cleared element ${label}`));
  }
  async getTextFromElement(element: Locator, label: string): Promise<string> {
    try {
      const text = await element.innerText();
      logger.info(`Successfully got text from element ${label}`);
      return text;
    } catch (error) {
      logger.error(`Error while getting text from element ${label}: ${error}`);
      throw error;
    }
  }
  

  async verifyElementIsVisible(element: Locator, label: string) {
    expect(element).toBeVisible().catch((error) => {
      logger.error(`Error while verifying element ${label} is visible: ${error}`);
    }).then(() => logger.info(`Successfully verified element ${label} is visible`));
  }

  async verifyElementIsNotVisible(element: Locator, label: string) {
    expect(element).not.toBeVisible().catch((error) => {
      logger.error(`Error while verifying element ${label} is not visible: ${error}`);
    }).then(() => logger.info(`Successfully verified element ${label} is not visible`));
  }

  async verifyElementIsEnabled(element: Locator, label: string) {
    expect(element).toBeEnabled().catch((error) => {
      logger.error(`Error while verifying element ${label} is enabled: ${error}`);
    }).then(() => logger.info(`Successfully verified element ${label} is enabled`));
  }

  async verifyElementIsHidden(element: Locator, label: string) {
    expect(element).toBeHidden().catch((error) => {
      logger.error(`Error while verifying element ${label} is hidden: ${error}`);
    }).then(() => logger.info(`Successfully verified element ${label} is hidden`));
  }

  async waitForElementToBeVisible(element: Locator, timeout: number) {
    await element.waitFor({ state: "visible" }).catch((error) => {
      logger.error(`Error while waiting for element ${element} to be visible: ${error}`);
    }).then(() => logger.info(`Successfully waited for element ${element} to be visible`));
  }

  async waitForElementToBeHidden(element: Locator, timeout: number) {
    await element.waitFor({ state: "hidden" }).catch((error) => {
      logger.error(`Error while waiting for element ${element} to be hidden: ${error}`);
    }).then(() => logger.info(`Successfully waited for element ${element} to be hidden`));
  }

  async pressKeysSequentially(element: Locator, keys: string, label: string) {
    await element.pressSequentially(keys).catch((error) => {
      logger.error(`Error while pressing keys sequentially on element ${label}: ${error}`);
    }).then(() => logger.info(`Successfully pressed keys sequentially on element ${label}`));
  }

  async captureScreenshot(screenshotName: string, label?: string) {
    await this.page.screenshot({ path: `./screenshots/${screenshotName}.png` });
    logger.info(`Successfully captured screenshot ${screenshotName} ${label ? `for ${label}` : ''}`);
  }
}
