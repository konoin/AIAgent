# TC-P1-04: No empty suggestion block during loading

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P1-04 |
| **Type** | Positive |
| **Priority** | P1 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P1-04 |
| **Automation candidate** | Partial (timing-sensitive) |

## Objective

Ensure that while autocomplete is loading or updating, the UI never presents a misleading empty suggestion container (open panel with blank rows only).

## Preconditions

- Homepage search available.

## Test data

| Field | Value |
| --- | --- |
| Query (primary) | `наушники` (typed character by character) |
| Query (secondary) | `телевизоры` (optional repeat) |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Open homepage and focus search | Ready |
| 2 | Type `наушники` one character at a time (`н`, `на`, …) | After each keystroke, if panel is visible, it must not show only empty/placeholder rows |
| 3 | During debounce/loading states | Either panel hidden, loading indicator shown, or populated rows — not open empty shell |
| 4 | After final character | Panel shows ≥1 non-empty suggestion OR is hidden with explicit empty-state messaging |
| 5 | Repeat steps 2–4 for `телевизоры` (optional) | Same behavior |

## Expected results (summary)

- **No empty suggestion block** at any stable visible state for valid partial/full queries.

## Pass criteria

- Never observe visible panel with zero text-bearing items unless accompanied by valid “nothing found” copy for invalid queries.

## Fail criteria

- Open dropdown with blank rows and no loading indicator during valid query entry.

## Postconditions

- Full query in search field.

## Traceability

| Source | Mapping |
| --- | --- |
| Task: no empty suggestion block | Covered |
| Test plan TC-P1-04 | Direct |

## Notes for automation

- Poll visibility of option locators; assert `count() > 0` when panel visible.
