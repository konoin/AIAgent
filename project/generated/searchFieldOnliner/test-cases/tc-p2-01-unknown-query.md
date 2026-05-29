# TC-P2-01: Unknown query returns safe empty state

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P2-01 |
| **Type** | Negative |
| **Priority** | P2 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P2-01 |
| **Automation candidate** | Yes |

## Objective

Verify that a nonsense query does not show a misleading empty autocomplete panel (open container with blank ghost rows).

## Preconditions

- Homepage search available.

## Test data

| Field | Value |
| --- | --- |
| Query | `xyznonexistent12345` |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Navigate to `https://www.onliner.by/` | Homepage loads |
| 2 | Focus search field | Ready for input |
| 3 | Enter `xyznonexistent12345` | Input accepts full string |
| 4 | Wait for autocomplete response (debounce complete) | One of: (a) no panel shown, (b) panel with explicit “nothing found” / empty-state message, (c) zero suggestions with panel closed |
| 5 | If panel visible, inspect rows | No rows that are visually empty placeholders |
| 6 | Check console (optional) | No uncaught JS errors |

## Expected results (summary)

- System handles unknown query gracefully.
- **No empty suggestion block** with fake rows.

## Pass criteria

- No open panel containing only blank suggestion rows.
- UI remains stable; search field usable.

## Fail criteria

- Open dropdown with empty clickable rows.
- Page crash or frozen search field.

## Postconditions

- Invalid query remains in field or can be cleared.

## Traceability

| Source | Mapping |
| --- | --- |
| Task: no empty suggestion block | Covered (negative path) |
| Test plan TC-P2-01 | Direct |
