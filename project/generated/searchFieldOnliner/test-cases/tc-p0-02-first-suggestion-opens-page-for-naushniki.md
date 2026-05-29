# TC-P0-02: First suggestion opens valid page for «наушники»

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P0-02 |
| **Type** | Positive |
| **Priority** | P0 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P0-02 |
| **Automation candidate** | Yes |

## Objective

Verify the end-to-end flow: enter `наушники`, select the **first** autocomplete suggestion, and land on a valid product or catalog page without error.

## Preconditions

- Same as TC-P0-01.
- Autocomplete returns at least one suggestion for `наушники` (dependency on live catalog).

## Test data

| Field | Value |
| --- | --- |
| Query | `наушники` |
| Selection | First visible suggestion (index 0) |
| Test data ID | TD-01 |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Navigate to `https://www.onliner.by/` | Homepage loads; search field available |
| 2 | Focus search field and enter `наушники` | Input shows `наушники` |
| 3 | Wait for autocomplete panel with ≥1 suggestion | Suggestions visible; none are empty rows |
| 4 | Record text/URL hint of the first suggestion (optional, for logs) | First item identifiable |
| 5 | Click the **first** suggestion (topmost/first in DOM order) | Navigation initiated |
| 6 | Wait for page load to complete | URL changes from homepage root |
| 7 | Verify destination page | Page loads without 404/5xx error screen; main content area visible (product detail, listing, or category) |
| 8 | Verify browser title/document | Document title is non-empty; page is interactive |

## Expected results (summary)

- User successfully selects first suggestion.
- **Redirect works correctly** to a meaningful destination.
- **Product page** (or equivalent catalog destination) opens successfully.

## Pass criteria

- URL differs from `https://www.onliner.by/` (or equivalent homepage URL).
- No error page (404, 500, “page not found”).
- Primary content visible (not blank document).

## Fail criteria

- Click does nothing or stays on homepage without navigation.
- 404/5xx or broken blank page after selection.
- Wrong element selected (not first suggestion).

## Postconditions

- User is on destination URL; browser history contains navigated page.

## Traceability

| Source | Mapping |
| --- | --- |
| Task: user selects first suggestion | Covered |
| Task: product page opens successfully | Covered |
| Task: redirect works correctly | Covered |
| Test plan TC-P0-02 | Direct |

## Notes for automation

- Capture `page.url()` after navigation; avoid asserting fixed product titles.
- Use `expect(page).not.toHaveURL(homepagePattern)` or assert URL contains catalog path segment.
