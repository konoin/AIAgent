# Test Cases: searchFieldOnliner

Test cases derived from `project/generated/searchFieldOnliner/test-plan/test-plan.md` and `project/tasks/search-onliner.md`.

## Summary

| Type | Count | IDs |
| --- | --- | --- |
| Positive (P0) | 4 | TC-P0-01 … TC-P0-04 |
| Positive (P1) | 4 | TC-P1-01 … TC-P1-04 |
| Negative (P2) | 2 | TC-P2-01, TC-P2-04 |
| Edge (P2) | 3 | TC-P2-02, TC-P2-03, TC-P2-05 |
| **Total** | **13** | |

## File index

| ID | File | Type |
| --- | --- | --- |
| TC-P0-01 | [tc-p0-01-autocomplete-appears-for-naushniki.md](./tc-p0-01-autocomplete-appears-for-naushniki.md) | Positive |
| TC-P0-02 | [tc-p0-02-first-suggestion-opens-page-for-naushniki.md](./tc-p0-02-first-suggestion-opens-page-for-naushniki.md) | Positive |
| TC-P0-03 | [tc-p0-03-autocomplete-appears-for-televizory.md](./tc-p0-03-autocomplete-appears-for-televizory.md) | Positive |
| TC-P0-04 | [tc-p0-04-first-suggestion-opens-page-for-televizory.md](./tc-p0-04-first-suggestion-opens-page-for-televizory.md) | Positive |
| TC-P1-01 | [tc-p1-01-keyboard-selection-first-suggestion.md](./tc-p1-01-keyboard-selection-first-suggestion.md) | Positive |
| TC-P1-02 | [tc-p1-02-suggestions-update-on-query-change.md](./tc-p1-02-suggestions-update-on-query-change.md) | Positive |
| TC-P1-03 | [tc-p1-03-click-outside-closes-suggestions.md](./tc-p1-03-click-outside-closes-suggestions.md) | Positive |
| TC-P1-04 | [tc-p1-04-no-empty-suggestion-block-during-loading.md](./tc-p1-04-no-empty-suggestion-block-during-loading.md) | Positive |
| TC-P2-01 | [tc-p2-01-unknown-query.md](./tc-p2-01-unknown-query.md) | Negative |
| TC-P2-02 | [tc-p2-02-single-character-query.md](./tc-p2-02-single-character-query.md) | Edge |
| TC-P2-03 | [tc-p2-03-very-long-string-query.md](./tc-p2-03-very-long-string-query.md) | Edge |
| TC-P2-04 | [tc-p2-04-special-characters-query.md](./tc-p2-04-special-characters-query.md) | Negative |
| TC-P2-05 | [tc-p2-05-rapid-typing-debounce.md](./tc-p2-05-rapid-typing-debounce.md) | Edge |

## Execution order (recommended)

1. All P0 cases (TC-P0-01 … TC-P0-04)
2. P1 interaction cases
3. P2 negative and edge cases
