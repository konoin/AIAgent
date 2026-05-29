# QA Automation Agent Rules

## Stack

* Playwright
* TypeScript

## Architecture

* Use Page Object Model
* Reuse existing Page Objects
* Avoid duplicated code

## Selectors

* Prefer role selectors
* Prefer data-testid
* Avoid xpath

## Test Rules

* Every test must contain assertions
* Avoid waitForTimeout
* Use Playwright expect()

## File Structure

### Tasks

project/tasks/

### Generated Test Plans

project/generated/{feature}/test-plan/

### Generated Test Cases

project/generated/{feature}/test-cases/

### Generated Automation

project/generated/{feature}/automation/

## Automation Structure

### Tests

project/generated/{feature}/automation/tests/

### Page Objects

project/generated/{feature}/automation/pages/

## Naming

* kebab-case for files
* readable test names

## Reuse Rules

Before creating new Page Object:

1. Analyze existing pages
2. Reuse methods if possible
3. Extend instead of duplicating

## Playwright Best Practices

* Use locators
* Use expect()
* Use async/await properly
* Use atomic tests
