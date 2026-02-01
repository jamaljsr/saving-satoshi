#!/bin/bash
# E2E test runner - takes argument to determine which tests to run
# Usage: yarn e2e [target]
#
# Examples:
#   yarn e2e              # Show help
#   yarn e2e all          # Run all tests (both JS and Python)
#   yarn e2e full:js      # Run full course with JavaScript
#   yarn e2e full:py      # Run full course with Python
#   yarn e2e 1:js         # Run chapter 1 with JavaScript
#   yarn e2e 1:py         # Run chapter 1 with Python
#   yarn e2e smoke        # Run smoke tests only
#   yarn e2e ui           # Open Playwright UI mode

set -e
cd "$(dirname "$0")/.."

CONFIG="e2e/playwright.config.ts"
TARGET="${1}"

case "$TARGET" in
  ui)
    npx playwright test --config="$CONFIG" --ui
    ;;
  smoke)
    npx playwright test --config="$CONFIG" e2e/tests/smoke/
    ;;
  full:js)
    npx playwright test --config="$CONFIG" e2e/tests/full-course/ --project=javascript
    ;;
  full:py)
    npx playwright test --config="$CONFIG" e2e/tests/full-course/ --project=python
    ;;
  [0-9]:js)
    CHAPTER="${TARGET%:js}"
    npx playwright test --config="$CONFIG" "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=javascript
    ;;
  [0-9]:py)
    CHAPTER="${TARGET%:py}"
    npx playwright test --config="$CONFIG" "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=python
    ;;
  [0-9][0-9]:js)
    CHAPTER="${TARGET%:js}"
    npx playwright test --config="$CONFIG" "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=javascript
    ;;
  [0-9][0-9]:py)
    CHAPTER="${TARGET%:py}"
    npx playwright test --config="$CONFIG" "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=python
    ;;
  all)
    npx playwright test --config="$CONFIG"
    ;;
  *)
    echo "Unknown target: $TARGET"
    echo "Usage: yarn e2e [target]"
    echo ""
    echo "Targets:"
    echo "  all       - Run all tests (default)"
    echo "  smoke     - Run smoke tests"
    echo "  full:js   - Full course with JavaScript"
    echo "  full:py   - Full course with Python"
    echo "  N:js      - Chapter N with JavaScript (e.g., 1:js, 10:js)"
    echo "  N:py      - Chapter N with Python (e.g., 1:py, 10:py)"
    echo "  ui        - Open Playwright UI mode"
    exit 1
    ;;
esac
