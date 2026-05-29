# TC-P1-03: Click outside closes suggestions

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P1-03 |
| **Type** | Positive |
| **Priority** | P1 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P1-03 |
| **Automation candidate** | Yes |

## Objective

Verify that clicking outside the search/autocomplete area dismisses the suggestion panel, and refocusing search can reopen suggestions.

## Preconditions

- Autocomplete opens for valid query `наушники`.

## Test data

| Field | Value |
| --- | --- |
| Query | `наушники` |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Open `https://www.onliner.by/` | Homepage loaded |
| 2 | Type `наушники` in search | Autocomplete panel visible with suggestions |
| 3 | Click a neutral area outside search and panel (e.g. logo, main content whitespace) | Autocomplete panel hidden or collapsed |
| 4 | Verify panel state | Suggestion list not visible (or not interactable) |
| 5 | Click/focus search field again | Field focused |
| 6 | Observe autocomplete | Panel reopens with suggestions for existing query OR after re-trigger (typing/backspace) per product behavior |

## Expected results (summary)

- Outside click dismisses panel.
- Search remains usable after dismiss.

## Pass criteria

- Panel closes on outside click; search can show suggestions again on refocus/re-entry.

## Fail criteria

- Panel stuck open obscuring page.
- Search field loses focus permanently or becomes disabled.

## Postconditions

- Panel closed or reopened per step 6.

## Traceability

| Source | Mapping |
| --- | --- |
| Test plan TC-P1-03 | Direct |

## Notes

- If product does not close on outside click, document as **N/A** with product confirmation rather than fail.
