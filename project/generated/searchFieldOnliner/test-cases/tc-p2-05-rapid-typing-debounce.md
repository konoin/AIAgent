# TC-P2-05: Rapid typing (debounce behavior)

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P2-05 |
| **Type** | Edge |
| **Priority** | P2 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P2-05 |
| **Automation candidate** | Yes |

## Objective

Verify that typing `наушники` quickly (simulating fast user input) results in a single coherent final suggestion set without duplicate panels or stale partial results stuck on screen.

## Preconditions

- Homepage search available.

## Test data

| Field | Value |
| --- | --- |
| Query | `наушники` (entered rapidly) |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Open homepage and focus search | Ready |
| 2 | Clear any existing input | Field empty |
| 3 | Type `наушники` as fast as possible (minimal delay between keys) or use `pressSequentially` with low delay | All characters appear in input |
| 4 | Wait for debounce to settle | One autocomplete panel (not multiple stacked dropdowns) |
| 5 | Verify final suggestions | ≥1 non-empty suggestion relevant to headphones OR valid empty-state if catalog rejects fast input edge |
| 6 | Verify input value | Final value is exactly `наушники` |
| 7 | Select first suggestion (optional extended check) | Navigation succeeds as TC-P0-02 |

## Expected results (summary)

- Debounce completes to final query state.
- No duplicate autocomplete containers.
- Final suggestion list matches completed query `наушники`.

## Pass criteria

- Single panel; final input correct; suggestions non-empty for valid query OR acceptable closed state.

## Fail criteria

- Multiple overlapping panels.
- Stuck on partial query suggestions after typing finished.
- Wrong final input string.

## Postconditions

- Full query in search field.

## Traceability

| Source | Mapping |
| --- | --- |
| Test plan TC-P2-05 | Direct |

## Notes for automation

- `locator.pressSequentially('наушники', { delay: 20 })` then assert final state.
