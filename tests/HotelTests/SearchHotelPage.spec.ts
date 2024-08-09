import { test } from "../../fixtures/userFixtures";
import { decrypt } from "../utils/cryptoUtil";
import { envKey } from "../utils/envConfig";
import * as searchHotelData from "../testData/searchHotelData.json";
import logger from "../utils/LoggerUtil";

test.describe("Search Hotel Tests Suite", () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToUrl(decrypt(envKey("URL")!));
    await loginPage.isAdactinHotelLogoPresent();
    await loginPage.loginToAdactinHotel(
      decrypt(envKey("USER")!),
      decrypt(envKey("PASSWORD")!)
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  searchHotelData.Location.forEach((location) => {
    test(`Select Location - ${location}`, async ({ searchHotelPage }) => {
      await searchHotelPage.selectLocation(location);
      logger.info(`Selected Location - ${location} successfully`);
    });
  });

  searchHotelData.Hotels.forEach((hotel) => {
    test(`Select Hotel - ${hotel}`, async ({ searchHotelPage }) => {
      await searchHotelPage.selectHotels(hotel);
      logger.info(`Selected Hotel - ${hotel} successfully`);
    });
  });

  searchHotelData.RoomType.forEach((roomType) => {
    test(`Select Room Type - ${roomType}`, async ({ searchHotelPage }) => {
      await searchHotelPage.selectRoomType(roomType);
      logger.info(`Selected Room Type - ${roomType} successfully`);
    });
  });

  searchHotelData.NumberOfRooms.forEach((noOfRooms) => {
    test(`Select No of Rooms - ${noOfRooms}`, async ({ searchHotelPage }) => {
      await searchHotelPage.selectNoOfRooms(noOfRooms);
      logger.info(`Selected No of Rooms - ${noOfRooms} successfully`);
    });
  });

  searchHotelData.CheckInDate.forEach((checkInDate) => {
    test(`Fill Check In Date - ${checkInDate}`, async ({ searchHotelPage }) => {
      await searchHotelPage.fillCheckInDate(checkInDate);
      logger.info(`Filled Check In Date - ${checkInDate} successfully`);
    });
  });

  searchHotelData.CheckOutDate.forEach((checkOutDate) => {
    test(`Fill Check Out Date - ${checkOutDate}`, async ({
      searchHotelPage,
    }) => {
      await searchHotelPage.fillCheckOutDate(checkOutDate);
      logger.info(`Filled Check Out Date - ${checkOutDate} successfully`);
    });
  });

  searchHotelData.AdultsPerRoom.forEach((adultPerRoom) => {
    test(`Select Adults Per Room - ${adultPerRoom}`, async ({
      searchHotelPage,
    }) => {
      await searchHotelPage.selectAdultsPerRoom(adultPerRoom);
      logger.info(`Selected Adults Per Room - ${adultPerRoom} successfully`);
    });
  });

  searchHotelData.ChildrenPreRoom.forEach((childrenPerRoom) => {
    test(`Select Children Per Room - ${childrenPerRoom}`, async ({
      searchHotelPage,
    }) => {
      await searchHotelPage.selectChildrenPerRoom(childrenPerRoom);
      logger.info(`Selected Children Per Room - ${childrenPerRoom} successfully`);
    });
  });

  test(`Fill Search Hotel fields and reset them`, async ({ searchHotelPage }) => {
    await searchHotelPage.searchHotel(
      searchHotelData.Location[2],
      searchHotelData.Hotels[3],
      searchHotelData.RoomType[1],
      searchHotelData.NumberOfRooms[3],
      searchHotelData.CheckInDate[2],
      searchHotelData.CheckOutDate[2],
      searchHotelData.AdultsPerRoom[2],
      searchHotelData.ChildrenPreRoom[2]
    );
    await searchHotelPage.clickResetButton();
    logger.info(`Filled Search Hotel fields and reset them successfully`);
  });

  test(`Search Hotel`, async ({ searchHotelPage }) => {
    await searchHotelPage.searchHotel(
      searchHotelData.Location[3],
      searchHotelData.Hotels[2],
      searchHotelData.RoomType[2],
      searchHotelData.NumberOfRooms[4],
      searchHotelData.CheckInDate[1],
      searchHotelData.CheckOutDate[1],
      searchHotelData.AdultsPerRoom[1],
      searchHotelData.ChildrenPreRoom[1]
    );
    await searchHotelPage.clickSearchButton();
    logger.info(`Searched Hotel successfully`);
  });
});
