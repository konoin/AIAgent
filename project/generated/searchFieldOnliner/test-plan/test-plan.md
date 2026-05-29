# QA Test Plan: Onliner Search Autocomplete

## Document metadata

| Field | Value |
| --- | --- |
| Feature | Search field autocomplete |
| Application | [onliner.by](https://www.onliner.by/) |
| Feature folder | `searchFieldOnliner` |
| Source task | `project/tasks/search-onliner.md` |
| Planned automation stack | Playwright, TypeScript, Page Object Model |
| Status | Draft |

## 1. Objective

Verify that the main site search field provides relevant autocomplete suggestions for product queries and that selecting the first suggestion navigates to a valid product (or catalog) page without empty or broken suggestion UI.

## 2. Scope

### In scope

- Global/header search input on the homepage (`https://www.onliner.by/`)
- Typing product names and observing autocomplete dropdown
- Visibility and non-empty state of suggestion list
- Clicking the **first** suggestion and validating navigation
- Test data: `наушники`, `телевизоры`

### Out of scope

- Search on other Onliner subdomains (e.g. catalog-only flows) unless they share the same header widget
- Sorting, filtering, or price comparison on destination pages
- Login, cart, checkout, ads, and third-party embeds
- Mobile-specific layouts (unless explicitly added later)
- Performance/load testing and SEO
- API contract testing (UI-level validation only)

## 3. Assumptions and dependencies

- Site is publicly reachable without authentication for the covered flows.
- Autocomplete may be debounced; tests must wait on UI state (visible suggestions), not fixed timeouts.
- Suggestions are returned in Belarusian/Russian locale; test strings match catalog language.
- First suggestion may be a product, category, or mixed result; success criteria focus on successful navigation and a meaningful destination page (not 404/error).
- Cookie/consent banners, if present, must be dismissed or bypassed in automation setup so they do not block the search field.

## 4. Test environment

| Item | Recommendation |
| --- | --- |
| Browsers | Chromium (primary), WebKit/Firefox (smoke, optional) |
| Viewport | Desktop 1280×720 minimum |
| Locale | `ru-RU` or site default |
| Network | Stable internet; no throttling for baseline |
| Data | Fixed strings: `наушники`, `телевизоры` |

## 5. Entry criteria

- Test plan reviewed and approved.
- Manual smoke on homepage confirms search field is present.
- Playwright project configured with base URL `https://www.onliner.by/` (for automation phase).

## 6. Exit criteria

- All P0 scenarios executed with documented results.
- No open P0 defects.
- P1 defects triaged with owners and target fix version.

## 7. Risk assessment

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Autocomplete timing/debounce | Flaky tests | Assert on visible listbox/options; use `expect(locator).toBeVisible()` |
| Dynamic suggestion order | Wrong item opened | Always select **first** visible suggestion per requirements; log suggestion text |
| Overlays (cookies, promos) | Blocked interactions | Handle in `beforeEach` or page object setup |
| Catalog/content changes | Broken assertions | Assert URL pattern + page load, not hard-coded product titles |
| Cyrillic input | Encoding issues | Use UTF-8 in test files; `fill()` / `pressSequentially()` as needed |

## 8. Test data

| ID | Query | Purpose |
| --- | --- | --- |
| TD-01 | `наушники` | Headphones category/product coverage |
| TD-02 | `телевизоры` | TVs category/product coverage |

Additional exploratory data (P2): partial strings (`науш`, `теле`), mixed case, trailing spaces.

## 9. UI elements under test (discovery notes)

Document during implementation; typical targets:

- Search input: `role=searchbox` or placeholder/aria-label containing search semantics
- Suggestion container: listbox, dropdown, or autocomplete panel adjacent to input
- Suggestion items: `role=option` or clickable links within the panel

**Selector strategy (automation):** prefer `getByRole('searchbox')`, `getByRole('listbox')`, `getByRole('option')`, then `data-testid` if exposed. Avoid XPath.

## 10. Test scenarios

### 10.1 P0 — Core happy path (required)

#### TC-P0-01: Autocomplete appears for «наушники»

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Open `https://www.onliner.by/` | Homepage loads; search field visible and enabled |
| 2 | Focus search field | Cursor in input; no errors |
| 3 | Enter `наушники` | Input shows typed text |
| 4 | Wait for autocomplete | Suggestion panel/list becomes visible |
| 5 | Inspect suggestions | At least one suggestion visible; panel is not empty |
| 6 | Verify suggestion content | Each visible item has non-empty text (no blank rows) |

**Pass criteria:** Suggestions visible; no empty suggestion block.

---

#### TC-P0-02: First suggestion opens valid page for «наушники»

| Step | Action | Expected result |
| --- | --- | --- |
| 1–4 | Same as TC-P0-01 | Autocomplete visible with ≥1 item |
| 5 | Click (or keyboard-activate) the **first** suggestion | Navigation starts |
| 6 | Wait for navigation | URL changes from homepage; document loads |
| 7 | Validate destination | No browser error page; main content visible (product or listing) |

**Pass criteria:** Redirect works correctly; HTTP 200-equivalent experience; no 404/5xx error page.

---

#### TC-P0-03: Autocomplete appears for «телевизоры»

Same as TC-P0-01 with query `телевизоры`.

---

#### TC-P0-04: First suggestion opens valid page for «телевизоры»

Same as TC-P0-02 with query `телевизоры`.

---

### 10.2 P1 — Interaction and robustness

#### TC-P1-01: Keyboard selection of first suggestion

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Type `наушники` | Suggestions appear |
| 2 | Press `ArrowDown` once | First suggestion highlighted/focused |
| 3 | Press `Enter` | Navigates to destination as in TC-P0-02 |

---

#### TC-P1-02: Suggestions update when query changes

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Type `на` | Suggestions may appear |
| 2 | Continue to `наушники` | List updates; remains non-empty at full query |
| 3 | Clear and type `телевизоры` | New relevant suggestions; not stale-only headphones |

---

#### TC-P1-03: Click outside closes suggestions (if supported)

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Type `наушники` | Panel open |
| 2 | Click outside search area | Panel hidden or collapsed |
| 3 | Refocus search | Panel can reopen with suggestions |

---

#### TC-P1-04: No empty suggestion block during loading

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Type query character by character | If panel opens, it never shows only empty placeholders/rows |
| 2 | After load completes | Either hidden or populated list |

---

### 10.3 P2 — Negative and edge cases

#### TC-P2-01: Unknown query

| Query | `xyznonexistent12345` |
| Expected | No misleading empty box with ghost rows; either no panel or explicit “nothing found” |

#### TC-P2-02: Single character

| Query | `н` |
| Expected | Graceful behavior (no panel or valid partial results); no JS errors |

#### TC-P2-03: Very long string

| Query | 200+ characters |
| Expected | Input truncated or accepted; no UI break |

#### TC-P2-04: Special characters

| Query | `наушники!@#` |
| Expected | Safe handling; suggestions or clear empty state |

#### TC-P2-05: Rapid typing (debounce)

| Action | Fast-type full query |
| Expected | Final suggestion set matches `наушники`; no duplicate panels |

## 11. Validation checklist (from requirements)

| Requirement | Covered by |
| --- | --- |
| User enters product name | TC-P0-01, TC-P0-03 |
| Autocomplete suggestions appear | TC-P0-01, TC-P0-03 |
| User selects first suggestion | TC-P0-02, TC-P0-04, TC-P1-01 |
| Product page opens successfully | TC-P0-02, TC-P0-04 |
| Suggestions visible | TC-P0-01, TC-P0-03 |
| No empty suggestion block | TC-P0-01, TC-P1-04 |
| Redirect works correctly | TC-P0-02, TC-P0-04 |

## 12. Defect reporting template

| Field | Description |
| --- | --- |
| Title | Short summary (e.g. “Empty autocomplete for наушники”) |
| Steps | Numbered reproduction |
| Expected / Actual | Per test case |
| Environment | Browser, viewport, date |
| Evidence | Screenshot, trace, URL |
| Severity | P0–P3 aligned with scenario priority |

## 13. Automation mapping (future)

| Manual ID | Suggested Playwright spec | Page object |
| --- | --- | --- |
| TC-P0-01, TC-P0-03 | `search-autocomplete-suggestions.spec.ts` | `OnlinerHomePage`, `SearchAutocomplete` |
| TC-P0-02, TC-P0-04 | `search-autocomplete-navigation.spec.ts` | Same |

**Automation rules:** one assertion focus per test where possible; no `waitForTimeout`; use `expect()` on locators; atomic tests per query where practical.

## 14. Traceability matrix

| Task requirement | Test case IDs |
| --- | --- |
| Test data: наушники | TC-P0-01, TC-P0-02, TC-P1-* |
| Test data: телевизоры | TC-P0-03, TC-P0-04 |
| Enter product name | All P0 |
| Suggestions appear | TC-P0-01, TC-P0-03 |
| Select first suggestion | TC-P0-02, TC-P0-04 |
| Product page opens | TC-P0-02, TC-P0-04 |
| suggestions visible | TC-P0-01, TC-P0-03 |
| no empty suggestion block | TC-P0-01, TC-P1-04 |
| redirect works correctly | TC-P0-02, TC-P0-04 |

## 15. Execution schedule (suggested)

1. **Day 1:** Manual P0 on Chromium; log defects.
2. **Day 2:** P1 manual + begin Playwright P0 automation.
3. **Day 3:** Regression P0 after fixes; optional cross-browser smoke.

## 16. Sign-off

| Role | Name | Date | Signature |
| --- | --- | --- | --- |
| QA | | | |
| Dev | | | |
| PO | | | |
