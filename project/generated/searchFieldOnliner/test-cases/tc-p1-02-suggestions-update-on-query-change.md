# TC-P1-02: Suggestions update when query changes

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P1-02 |
| **Type** | Positive |
| **Priority** | P1 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P1-02 |
| **Automation candidate** | Yes |

## Objective

Ensure autocomplete results refresh when the query changes and do not show stale results from a previous search term.

## Preconditions

- Homepage search autocomplete is functional.

## Test data

| Step phase | Query |
| --- | --- |
| Partial | `на` |
| Full A | `наушники` |
| Full B | `телевизоры` |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Open homepage and focus search | Ready for input |
| 2 | Type `на` | Panel may appear with partial matches or remain closed per product rules |
| 3 | Continue typing until input is `наушники` | Suggestion list updates; at full query, ≥1 non-empty suggestion for headphones-related terms |
| 4 | Note first suggestion text (optional) | Baseline for headphones query |
| 5 | Clear search field completely | Input empty; panel closed or reset |
| 6 | Type `телевизоры` | New suggestions load |
| 7 | Compare suggestion content to step 4 | Suggestions reflect TV-related terms; list is not exclusively stale headphone-only results (allow overlap only if catalog legitimately returns both) |
| 8 | Verify non-empty at full `телевизоры` | ≥1 visible suggestion with text |

## Expected results (summary)

- Autocomplete reacts to query edits.
- Final lists for `наушники` and `телевизоры` are appropriate and non-empty.

## Pass criteria

- List updates on query change; `телевизоры` shows ≥1 suggestion.

## Fail criteria

- Stale panel shows only previous query results after clear + new query.
- UI frozen or duplicate overlapping panels.

## Postconditions

- Search field contains `телевизоры`.

## Traceability

| Source | Mapping |
| --- | --- |
| Test plan TC-P1-02 | Direct |
| Task test data (both queries) | Covered |

## Notes for automation

- Avoid asserting exact suggestion text; compare rough relevance or count changes.
