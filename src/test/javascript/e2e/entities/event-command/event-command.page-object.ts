import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EventCommandUpdatePage from './event-command-update.page-object';

const expect = chai.expect;
export class EventCommandDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('maxeventApp.eventCommand.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-eventCommand'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EventCommandComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('event-command-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('event-command');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEventCommand() {
    await this.createButton.click();
    return new EventCommandUpdatePage();
  }

  async deleteEventCommand() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const eventCommandDeleteDialog = new EventCommandDeleteDialog();
    await waitUntilDisplayed(eventCommandDeleteDialog.deleteModal);
    expect(await eventCommandDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/maxeventApp.eventCommand.delete.question/);
    await eventCommandDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(eventCommandDeleteDialog.deleteModal);

    expect(await isVisible(eventCommandDeleteDialog.deleteModal)).to.be.false;
  }
}
