# TC-P2-02: Single-character query handled gracefully

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P2-02 |
| **Type** | Edge |
| **Priority** | P2 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P2-02 |
| **Automation candidate** | Yes |

## Objective

Confirm minimal input (`н`) does not break search UI and behaves predictably (no panel, partial results, or delayed open per product rules).

## Preconditions

- Homepage search available.

## Test data

| Field | Value |
| --- | --- |
| Query | `н` |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Open `https://www.onliner.by/` | Homepage ready |
| 2 | Focus search and type `н` | Single Cyrillic character in input |
| 3 | Observe autocomplete after debounce | Panel hidden OR shows valid partial suggestions (each non-empty if visible) |
| 4 | Verify search field state | Field enabled; no layout break |
| 5 | Optional: check console | No JS errors |

## Expected results (summary)

- Graceful handling of minimum-length input.
- No misleading empty suggestion block.

## Pass criteria

- UI stable; if panel open, items have text or explicit empty-state.

## Fail criteria

- Broken layout, disabled search, or empty ghost rows in open panel.

## Postconditions

- Character `н` in search field.

## Traceability

| Source | Mapping |
| --- | --- |
| Test plan TC-P2-02 | Direct |
