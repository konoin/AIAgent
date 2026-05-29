import { expect, type FrameLocator, type Locator, type Page } from '@playwright/test';

export const HEADPHONES_QUERY = 'наушники';

export class CatalogSearchFrame {
  readonly frame: FrameLocator;
  readonly searchInput: Locator;
  readonly resultsList: Locator;
  readonly resultItems: Locator;

  constructor(frame: FrameLocator) {
    this.frame = frame;
    this.searchInput = frame.getByRole('textbox', { name: 'Поиск' });
    this.resultsList = frame.locator('ul.search__results');
    this.resultItems = frame.locator('ul.search__results > li.search__result');
  }

  static fromPage(page: Page): CatalogSearchFrame {
    const frame = page.frameLocator(
      'iframe.modal-iframe[src*="catalog/search"]',
    );
    return new CatalogSearchFrame(frame);
  }

  async enterQuery(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await expect(this.searchInput).toHaveValue(query);
  }

  async waitForSuggestions(): Promise<void> {
    await expect(this.resultsList).toBeVisible();
    await expect(this.resultItems.first()).toBeVisible();
  }

  getFirstSuggestionLink(): Locator {
    return this.resultItems
      .first()
      .locator('a.category__title, a[target="_parent"]')
      .first();
  }

  async expectSuggestionsHaveText(): Promise<void> {
    const count = await this.resultItems.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const item = this.resultItems.nth(index);
      await expect(item).toBeVisible();
      await expect(item).not.toHaveText(/^\s*$/);
      const link = item.locator('a').first();
      if ((await link.count()) > 0) {
        await expect(link).not.toHaveText(/^\s*$/);
      }
    }
  }

  async clickFirstSuggestion(page: Page): Promise<void> {
    const firstLink = this.getFirstSuggestionLink();
    await expect(firstLink).toBeVisible();

    const href = await firstLink.getAttribute('href');
    expect(href, 'First suggestion must expose a navigation URL').toBeTruthy();

    // Yandex AdFox overlay intercepts pointer clicks; DOM click matches target="_parent" behavior.
    await Promise.all([
      page.waitForURL(
        (url) =>
          url.hostname.includes('catalog.onliner.by') ||
          (url.hostname.includes('onliner.by') &&
            !url.pathname.includes('/sdapi/catalog/search/iframe')),
        { waitUntil: 'domcontentloaded' },
      ),
      firstLink.evaluate((anchor) => (anchor as HTMLAnchorElement).click()),
    ]);
  }
}
