# TC-P0-04: First suggestion opens valid page for «телевизоры»

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P0-04 |
| **Type** | Positive |
| **Priority** | P0 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P0-04 |
| **Automation candidate** | Yes |

## Objective

Verify full happy path for `телевизоры`: autocomplete appears, user selects the first suggestion, and lands on a valid destination page.

## Preconditions

- Same as TC-P0-01.
- Autocomplete returns suggestions for `телевизоры`.

## Test data

| Field | Value |
| --- | --- |
| Query | `телевизоры` |
| Selection | First visible suggestion |
| Test data ID | TD-02 |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Open `https://www.onliner.by/` | Homepage ready |
| 2 | Enter `телевизоры` in search field | Query entered correctly |
| 3 | Wait for ≥1 autocomplete suggestion | Panel visible with content |
| 4 | Click the first suggestion | Navigation starts |
| 5 | Wait for load complete | New URL loaded |
| 6 | Validate destination | Valid catalog/product page; no error page |
| 7 | Confirm page usability | Main content rendered; page not blank |

## Expected results (summary)

- First suggestion selection triggers successful navigation.
- **Redirect works correctly.**

## Pass criteria

- URL changed from homepage; no 404/5xx; content visible.

## Fail criteria

- No navigation after click.
- Error page or empty destination.

## Postconditions

- User on non-homepage catalog/product URL.

## Traceability

| Source | Mapping |
| --- | --- |
| Task: select first suggestion | Covered |
| Task: product page opens | Covered |
| Task: redirect works correctly | Covered |
| Test plan TC-P0-04 | Direct |

## Notes for automation

- Pair with TC-P0-03 or combine in separate atomic tests per AGENTS.md guidance.
