import { Locator, Page } from "@playwright/test";
import BasePage from "../basePage";

export class SearchHotelPage extends BasePage {
  readonly page: Page;
  private readonly locationDropDown: Locator;
  private readonly hotelsDropDown: Locator;
  private readonly roomTypeDropDown: Locator;
  private readonly noOfRoomsDropDown: Locator;
  private readonly checkInDate: Locator;
  private readonly checkOutDate: Locator;
  private readonly adultDropDown: Locator;
  private readonly childrenDropDown: Locator;
  private readonly searchButton: Locator;
  private readonly resetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.locationDropDown = page.locator(`#location`);
    this.hotelsDropDown = page.locator(`#hotels`);
    this.roomTypeDropDown = page.locator(`#room_type`);
    this.noOfRoomsDropDown = page.locator(`#room_nos`);
    this.checkInDate = page.locator(`#datepick_in`);
    this.checkOutDate = page.locator(`#datepick_out`);
    this.adultDropDown = page.locator(`#adult_room`);
    this.childrenDropDown = page.locator(`#child_room`);
    this.searchButton = page.locator(`#Submit`);
    this.resetButton = page.locator(`#Reset`);
  }

  async selectLocation(location: string) {
    await this.selectElementFromDropDown(
      this.locationDropDown,
      location,
      "location"
    );
    return this.isOptionSelected(this.locationDropDown, location);
  }

  async selectHotels(hotel: string) {
    await this.selectElementFromDropDown(this.hotelsDropDown, hotel, "hotels");
    return this.isOptionSelected(this.hotelsDropDown, hotel);
  }

  async selectRoomType(roomType: string) {
    await this.selectElementFromDropDown(
      this.roomTypeDropDown,
      roomType,
      "roomType"
    );
    return this.isOptionSelected(this.roomTypeDropDown, roomType);
  }

  async selectNoOfRooms(noOfRooms: string) {
    await this.selectElementFromDropDown(
      this.noOfRoomsDropDown,
      noOfRooms,
      "noOfRooms"
    );
    return this.isOptionSelected(this.noOfRoomsDropDown, noOfRooms);
  }

  async fillCheckInDate(date: string) {
    await this.clearELement(this.checkInDate, "checkInDate");
    await this.pressKeysSequentially(this.checkInDate, date, "checkInDate");
  }

  async fillCheckOutDate(date: string) {
    await this.clearELement(this.checkOutDate, "checkOutDate");
    await this.pressKeysSequentially(this.checkOutDate, date, "checkOutDate");
  }

  async selectAdultsPerRoom(adultPerRoom: string) {
    await this.selectElementFromDropDown(
      this.adultDropDown,
      adultPerRoom,
      "adultPerRoom"
    );
  }

  async selectChildrenPerRoom(childrenPerRoom: string) {
    await this.selectElementFromDropDown(
      this.childrenDropDown,
      childrenPerRoom,
      "childrenPerRoom"
    );
  }

  async clickSearchButton() {
    await this.clickElement(this.searchButton, "searchButton");
  }

  async clickResetButton() {
    await this.clickElement(this.resetButton, "resetButton");
  }

  async searchHotel(
    location: string,
    hotel: string,
    roomType: string,
    noOfRooms: string,
    checkInDate: string,
    checkOutDate: string,
    adultPerRoom: string,
    childrenPerRoom: string
  ) {
    await this.selectLocation(location);
    await this.selectHotels(hotel);
    await this.selectRoomType(roomType);
    await this.selectNoOfRooms(noOfRooms);
    await this.fillCheckInDate(checkInDate);
    await this.fillCheckOutDate(checkOutDate);
    await this.selectAdultsPerRoom(adultPerRoom);
    await this.selectChildrenPerRoom(childrenPerRoom);
  }
}
