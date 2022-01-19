import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventCommandComponentsPage from './event-command.page-object';
import EventCommandUpdatePage from './event-command-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('EventCommand e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventCommandComponentsPage: EventCommandComponentsPage;
  let eventCommandUpdatePage: EventCommandUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    eventCommandComponentsPage = new EventCommandComponentsPage();
    eventCommandComponentsPage = await eventCommandComponentsPage.goToPage(navBarPage);
  });

  it('should load EventCommands', async () => {
    expect(await eventCommandComponentsPage.title.getText()).to.match(/Event Commands/);
    expect(await eventCommandComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete EventCommands', async () => {
    const beforeRecordsCount = (await isVisible(eventCommandComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(eventCommandComponentsPage.table);
    eventCommandUpdatePage = await eventCommandComponentsPage.goToCreateEventCommand();
    await eventCommandUpdatePage.enterData();

    expect(await eventCommandComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(eventCommandComponentsPage.table);
    await waitUntilCount(eventCommandComponentsPage.records, beforeRecordsCount + 1);
    expect(await eventCommandComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await eventCommandComponentsPage.deleteEventCommand();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(eventCommandComponentsPage.records, beforeRecordsCount);
      expect(await eventCommandComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(eventCommandComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
