# TC-P2-04: Special characters in query

| Attribute | Value |
| --- | --- |
| **Test case ID** | TC-P2-04 |
| **Type** | Negative |
| **Priority** | P2 |
| **Feature** | Search autocomplete |
| **Application** | https://www.onliner.by/ |
| **Test plan reference** | TC-P2-04 |
| **Automation candidate** | Yes |

## Objective

Ensure queries mixing Cyrillic product text with special symbols are handled safely without script errors or broken autocomplete UI.

## Preconditions

- Homepage search available.

## Test data

| Field | Value |
| --- | --- |
| Query | `наушники!@#` |

## Steps

| # | Action | Expected result |
| --- | --- | --- |
| 1 | Navigate to homepage | Page loads |
| 2 | Enter `наушники!@#` in search | Characters appear in input as typed |
| 3 | Wait for autocomplete | Panel shows filtered suggestions, explicit no-results, or stays closed — all acceptable if consistent |
| 4 | If suggestions shown | Items are non-empty text rows |
| 5 | Verify no XSS/UI injection artifacts | Suggestion text rendered as text, not executed scripts (visual inspection) |
| 6 | Optional console check | No uncaught exceptions |

## Expected results (summary)

- Safe handling of special characters.
- No empty ghost suggestion block.

## Pass criteria

- UI stable; predictable autocomplete behavior.
- No security-visible rendering issues.

## Fail criteria

- Broken panel, JS errors, or empty placeholder rows only.

## Postconditions

- Query with special chars in field.

## Traceability

| Source | Mapping |
| --- | --- |
| Test plan TC-P2-04 | Direct |
