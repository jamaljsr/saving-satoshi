# E2E Tests

End-to-end tests for Saving Satoshi using [Playwright](https://playwright.dev/).

## Directory Structure

```
e2e/
├── answers/           # Challenge solutions (cloned from challenges repo)
│   └── chapter{N}/
│       ├── javascript/
│       │   └── {lesson}-answer.js
│       ├── python/
│       │   └── {lesson}-answer.py
│       ├── {lesson}-answer.txt    # Non-code challenges
│       └── {lesson}.json          # Opcode challenges
├── fixtures/          # Playwright test fixtures
├── helpers/           # Test utilities and answer loaders
├── pages/             # Page Object Models
│   └── challenges/    # Challenge-specific page objects
└── tests/             # Test spec files (one per chapter)
```

## How Answers Are Sourced

Challenge answers are stored in the [saving-satoshi/challenges](https://github.com/saving-satoshi/challenges) repository and cloned into `e2e/answers/` during setup.

The `answer-loader.ts` helper provides functions to load answers:

- **Scripting challenges**: `getAnswerFromFile(chapter, lesson, language)` loads from `answers/chapter{N}/{language}/{lesson}-answer.{js|py}`
- **Text challenges**: `getAnswerFromFile(chapter, lesson)` loads from `answers/chapter{N}/{lesson}-answer.txt`
- **Opcode challenges**: `getOpcodeAnswer(chapter, lesson)` loads JSON from `answers/chapter{N}/{lesson}.json`
- **Spoiler-based**: `getAnswerFromSpoiler()` extracts answers from the lesson's spoiler component

## Running Locally

### Prerequisites

1. **Backend running** on port 8000 (see `saving-satoshi-backend/` README)
2. **Answers cloned** into `e2e/answers/`

### Setup

Clone the answers repository (one-time setup):

```bash
./scripts/setup-e2e.sh
```

### Run Tests

```bash
# Run all tests (both JavaScript and Python projects)
yarn e2e all

# Run smoke tests only (navigation)
yarn e2e smoke

# Run a specific chapter with JavaScript
yarn e2e 4:js

# Run a specific chapter with Python
yarn e2e 4:py

# Open Playwright UI mode (interactive debugging)
yarn e2e ui
```

Individual chapter tests (`N:js`, `N:py`) run in headed mode so you can watch the browser.

## Test Projects

Tests run in two projects defined in `playwright.config.ts`:

- **javascript** - Tests scripting challenges using JavaScript
- **python** - Tests scripting challenges using Python

Both projects use Chrome and test the same chapter flows, just with different code languages for challenges.
