import { test } from "../../fixtures/userFixtures";
import { decrypt } from "../utils/cryptoUtil";
import { envKey } from "../utils/envConfig";
import logger from "../utils/LoggerUtil";

test.describe("Login Tests Suite", () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step("Navigate to Adactin Hotel", async () => {
      await loginPage.navigateToUrl(decrypt(envKey("URL")!));
    });
    await test.step("Verify Adactin Hotel Logo", async () => {
      await loginPage.isAdactinHotelLogoPresent();
    });
  });

  test("Login with valid credentials", async ({ loginPage }) => {
    await test.step("Login with valid credentials", async () => {
      await loginPage.loginToAdactinHotel(
        decrypt(envKey("USER")!),
        decrypt(envKey("PASSWORD")!)
      );
    });
    await test.step("Verify error message is absent", async () => {
      await loginPage.isErrorMessageAbsent();
    });
    await test.step("Verify welcome text", async () => {
      await loginPage.isWelcomeTextPresent();
    });
    logger.info("Login with valid credentials was successful");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
