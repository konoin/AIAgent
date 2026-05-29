# TC-P1-01: Keyboard selection of first suggestion

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P1-01 |
| **Type** | Positive |
| **Priority** | P1 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P1-01 |
| **Automation candidate** | Yes |

## Objective

Validate that users can select the first autocomplete suggestion via keyboard (`ArrowDown` + `Enter`) and reach the same valid destination as mouse selection.

## Preconditions

- Homepage search supports keyboard navigation in autocomplete (if not supported, mark blocked/N/A).
- TC-P0-01 preconditions met.

## Test data

| Field | Value |
| --- | --- |
| Query | `наушники` |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Navigate to `https://www.onliner.by/` | Homepage loads |
| 2 | Focus search and type `наушники` | Suggestions appear (≥1) |
| 3 | Press `ArrowDown` once | First suggestion highlighted or receives focus/active state |
| 4 | Press `Enter` | Navigation to destination begins |
| 5 | Wait for page load | URL changes from homepage |
| 6 | Validate destination page | Same pass criteria as TC-P0-02 (valid page, no error) |

## Expected results (summary)

- Keyboard path completes E2E navigation equivalent to click on first suggestion.

## Pass criteria

- Successful navigation via keyboard only (no mouse click on suggestion).

## Fail criteria

- `Enter` submits wrong item or performs site search without selecting suggestion.
- No highlight on `ArrowDown` and navigation fails.
- Lands on error page.

## Postconditions

- User on destination page.

## Traceability

| Source | Mapping |
| --- | --- |
| Task: select first suggestion | Covered (alternate input method) |
| Test plan TC-P1-01 | Direct |

## Notes for automation

- Use `page.keyboard.press('ArrowDown')` and `Enter` after `fill()` or `pressSequentially()`.
