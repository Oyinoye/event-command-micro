import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EventCommandUpdatePage {
  pageTitle: ElementFinder = element(by.id('maxeventApp.eventCommand.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  championIDInput: ElementFinder = element(by.css('input#event-command-championID'));
  eventDateTimeInput: ElementFinder = element(by.css('input#event-command-eventDateTime'));
  eventPayloadInput: ElementFinder = element(by.css('input#event-command-eventPayload'));
  eventSelect: ElementFinder = element(by.css('select#event-command-event'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setChampionIDInput(championID) {
    await this.championIDInput.sendKeys(championID);
  }

  async getChampionIDInput() {
    return this.championIDInput.getAttribute('value');
  }

  async setEventDateTimeInput(eventDateTime) {
    await this.eventDateTimeInput.sendKeys(eventDateTime);
  }

  async getEventDateTimeInput() {
    return this.eventDateTimeInput.getAttribute('value');
  }

  async setEventPayloadInput(eventPayload) {
    await this.eventPayloadInput.sendKeys(eventPayload);
  }

  async getEventPayloadInput() {
    return this.eventPayloadInput.getAttribute('value');
  }

  async setEventSelect(event) {
    await this.eventSelect.sendKeys(event);
  }

  async getEventSelect() {
    return this.eventSelect.element(by.css('option:checked')).getText();
  }

  async eventSelectLastOption() {
    await this.eventSelect.all(by.tagName('option')).last().click();
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setChampionIDInput('championID');
    expect(await this.getChampionIDInput()).to.match(/championID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEventDateTimeInput('eventDateTime');
    expect(await this.getEventDateTimeInput()).to.match(/eventDateTime/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEventPayloadInput('eventPayload');
    expect(await this.getEventPayloadInput()).to.match(/eventPayload/);
    await waitUntilDisplayed(this.saveButton);
    await this.eventSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
