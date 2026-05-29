# TC-P0-01: Autocomplete appears for «наушники»

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P0-01 |
| **Type** | Positive |
| **Priority** | P0 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P0-01 |
| **Automation candidate** | Yes |

## Objective

Confirm that typing the product query `наушники` in the homepage search field displays a visible autocomplete panel with at least one non-empty suggestion.

## Preconditions

- Browser opens to a clean session (no cached broken state).
- User is not logged in (default anonymous flow).
- Network connection is stable.
- Homepage search field is present and enabled.
- Cookie/consent or promo overlays are dismissed if they block the search field.

## Test data

| Field | Value |
| --- | --- |
| Query | `наушники` |
| Test data ID | TD-01 |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Navigate to `https://www.onliner.by/` | Homepage loads successfully; HTTP 200-equivalent page; no browser error screen |
| 2 | Locate the global/header search field | Search input is visible, enabled, and accepts focus |
| 3 | Click or tab into the search field | Field is focused; caret appears in input |
| 4 | Enter the text `наушники` | Input value equals `наушники` (Cyrillic preserved) |
| 5 | Wait until autocomplete finishes loading (panel visible or stable empty state timeout per product rules) | Autocomplete suggestion panel/list becomes visible |
| 6 | Count visible suggestion items | At least **1** suggestion is displayed |
| 7 | Inspect each visible suggestion row/item | Every visible item contains non-empty text; no blank/placeholder-only rows |
| 8 | Verify suggestion panel is not an empty shell | Panel is not open with zero items and no “no results” message (unless product explicitly uses that pattern for valid queries) |

## Expected results (summary)

- Autocomplete suggestions are **visible** after entering `наушники`.
- Suggestion block is **not empty** (≥1 item with text).
- No JavaScript errors in console related to search/autocomplete (optional check).

## Pass criteria

- Suggestion panel visible with ≥1 non-empty suggestion.
- Input retains query `наушники`.

## Fail criteria

- No suggestions appear for a valid catalog query within reasonable wait.
- Panel opens but shows only empty rows or whitespace items.
- Search field unavailable or disabled.

## Postconditions

- User remains on homepage unless further navigation steps are executed.
- Autocomplete panel may remain open until dismissed.

## Traceability

| Source | Mapping |
| --- | --- |
| Task: suggestions visible | Covered |
| Task: no empty suggestion block | Covered |
| Test plan TC-P0-01 | Direct |

## Notes for automation

- Prefer `getByRole('searchbox')` for input.
- Wait with `expect(suggestionLocator).toBeVisible()` — do not use fixed `waitForTimeout`.
- Log first suggestion text for debugging dynamic ordering.
