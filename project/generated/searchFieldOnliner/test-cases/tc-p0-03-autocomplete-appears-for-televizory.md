# TC-P0-03: Autocomplete appears for «телевизоры»

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P0-03 |
| **Type** | Positive |
| **Priority** | P0 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P0-03 |
| **Automation candidate** | Yes |

## Objective

Confirm that typing `телевизоры` in the homepage search field shows a visible autocomplete list with at least one non-empty suggestion.

## Preconditions

- Same as TC-P0-01.

## Test data

| Field | Value |
| --- | --- |
| Query | `телевизоры` |
| Test data ID | TD-02 |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Navigate to `https://www.onliner.by/` | Homepage loads; search field visible |
| 2 | Focus the search field | Field accepts input |
| 3 | Enter `телевизоры` | Input displays full query in Cyrillic |
| 4 | Wait for autocomplete to load | Suggestion panel becomes visible |
| 5 | Verify suggestion count | ≥1 suggestion displayed |
| 6 | Verify suggestion text | Each visible item has non-empty label/text |
| 7 | Confirm panel is not an empty block | No open panel with zero populated items for this valid query |

## Expected results (summary)

- Suggestions **visible** for `телевизоры`.
- **No empty suggestion block** for a valid product/category query.

## Pass criteria

- ≥1 visible, non-empty autocomplete suggestion.

## Fail criteria

- No suggestions for `телевизоры`.
- Empty or placeholder-only suggestion rows.

## Postconditions

- User on homepage with query in search field.

## Traceability

| Source | Mapping |
| --- | --- |
| Task test data: телевизоры | Covered |
| Task: suggestions visible | Covered |
| Task: no empty suggestion block | Covered |
| Test plan TC-P0-03 | Direct |

## Notes for automation

- Mirror TC-P0-01 structure with different query constant.
