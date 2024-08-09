import { test as baseTest } from "@playwright/test";

import { LoginPage } from "../tests/pages/AdactinHotel/loginPage";
import { SearchHotelPage } from "../tests/pages/AdactinHotel/searchHotelPage";

type pages = {
  loginPage: LoginPage;
  searchHotelPage: SearchHotelPage;
};

const testPages = baseTest.extend<pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  searchHotelPage: async ({ page }, use) => {
    await use(new SearchHotelPage(page));
  },
});

export const test = testPages;
export const expect = baseTest.expect;
