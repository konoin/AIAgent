import { type FrameLocator, type Locator, type Page } from '@playwright/test';

export const ONLINER_HOME_URL = 'https://www.onliner.by/';

export class OnlinerHomePage {
  readonly page: Page;
  readonly catalogSearchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogSearchInput = page.getByRole('textbox', {
      name: /Поиск в Каталоге/i,
    });
  }

  async open(): Promise<void> {
    await this.page.goto(ONLINER_HOME_URL);
    await this.catalogSearchInput.waitFor({ state: 'visible' });
  }

  async openCatalogSearch(): Promise<FrameLocator> {
    await this.catalogSearchInput.click();
    const searchFrame = this.page.frameLocator(
      'iframe.modal-iframe[src*="catalog/search"]',
    );
    await searchFrame
      .getByRole('textbox', { name: 'Поиск' })
      .waitFor({ state: 'visible' });
    return searchFrame;
  }
}
