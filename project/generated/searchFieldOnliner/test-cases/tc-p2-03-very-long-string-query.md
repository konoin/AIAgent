# TC-P2-03: Very long string query

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P2-03 |
| **Type** | Edge |
| **Priority** | P2 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P2-03 |
| **Automation candidate** | Yes |

## Objective

Verify the search field and autocomplete tolerate an abnormally long query without UI breakage or security-visible errors.

## Preconditions

- Homepage search available.

## Test data

| Field | Value |
| --- | --- |
| Query | String of **200+** characters (e.g. `а` repeated 200 times or alphanumeric mix) |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Open homepage and focus search | Ready |
| 2 | Paste or type 200+ character string into search | Input accepts or truncates per maxlength; no browser hang |
| 3 | Wait for autocomplete/debounce | No infinite spinner; panel either hidden or shows valid empty-state |
| 4 | Inspect UI | No overflow breaking header layout; search still focusable |
| 5 | Clear field and type `наушники` | Normal autocomplete still works (regression check) |

## Expected results (summary)

- Long input handled safely (truncate, reject excess, or accept without crash).

## Pass criteria

- No UI break; search recoverable after clear.
- Post-clear valid query still returns suggestions.

## Fail criteria

- Page freeze, broken header, permanent search disable.
- Autocomplete permanently broken after long input test.

## Postconditions

- Field cleared or contains long string per step outcome.

## Traceability

| Source | Mapping |
| --- | --- |
| Test plan TC-P2-03 | Direct |

## Notes for automation

- Generate long string in test: `'а'.repeat(200)`.
