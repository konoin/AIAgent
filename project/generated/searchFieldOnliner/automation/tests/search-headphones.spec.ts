import { expect, test } from '@playwright/test';
import {
  CatalogSearchFrame,
  HEADPHONES_QUERY,
} from '../pages/catalog-search-frame';
import { ONLINER_HOME_URL, OnlinerHomePage } from '../pages/onliner-home-page';

test.describe('Onliner catalog search — наушники', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new OnlinerHomePage(page);
    await homePage.open();
    await homePage.openCatalogSearch();
  });

  test('TC-P0-01: autocomplete appears for «наушники»', async ({ page }) => {
    const search = CatalogSearchFrame.fromPage(page);

    await search.enterQuery(HEADPHONES_QUERY);
    await search.waitForSuggestions();
    await search.expectSuggestionsHaveText();

    await expect(search.searchInput).toHaveValue(HEADPHONES_QUERY);
    await expect(search.resultItems).not.toHaveCount(0);
  });

  test('TC-P0-02: first suggestion opens valid page for «наушники»', async ({
    page,
  }) => {
    const search = CatalogSearchFrame.fromPage(page);

    await search.enterQuery(HEADPHONES_QUERY);
    await search.waitForSuggestions();

    const firstSuggestionText = await search
      .getFirstSuggestionLink()
      .innerText();
    expect(firstSuggestionText.trim().length).toBeGreaterThan(0);

    await search.clickFirstSuggestion(page);

    await expect(page).toHaveURL(/catalog\.onliner\.by/);
    await expect(page).not.toHaveURL(ONLINER_HOME_URL);
    await expect(page).not.toHaveURL(/\/sdapi\/catalog\/search\/iframe/);
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('body')).not.toHaveText(
      /404|страница не найдена|ошибка сервера/i,
    );
    await expect(page.locator('body')).toBeVisible();
  });
});
