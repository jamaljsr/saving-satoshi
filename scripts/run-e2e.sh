#!/bin/bash
# E2E test runner - takes argument to determine which tests to run
# Usage: yarn e2e [target]

set -e
cd "$(dirname "$0")/.."
pwd

TARGET="${1}"

case "$TARGET" in
  smoke)
    npx playwright test e2e/tests/smoke/
    ;;
  all)
    npx playwright test
    ;;
  all:js)
    npx playwright test --project=javascript
    ;;
  all:py)
    npx playwright test --project=python
    ;;
  [0-9]:js)
    CHAPTER="${TARGET%:js}"
    npx playwright test "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=javascript --headed
    ;;
  [0-9]:py)
    CHAPTER="${TARGET%:py}"
    npx playwright test "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=python --headed
    ;;
  [0-9][0-9]:js)
    CHAPTER="${TARGET%:js}"
    npx playwright test "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=javascript --headed
    ;;
  [0-9][0-9]:py)
    CHAPTER="${TARGET%:py}"
    npx playwright test "e2e/tests/chapters/chapter-${CHAPTER}.spec.ts" --project=python --headed
    ;;
  ui)
    npx playwright test --ui
    ;;
  *)
    echo "Unknown target: $TARGET"
    echo "Usage: yarn e2e [target]"
    echo ""
    echo "Targets:"
    echo "  all       - Run all tests (default)"
    echo "  smoke     - Run smoke tests"
    echo "  N:js      - Chapter N with JavaScript (e.g., 1:js, 10:js)"
    echo "  N:py      - Chapter N with Python (e.g., 1:py, 10:py)"
    echo "  ui        - Open Playwright UI mode"
    echo ""
    echo "Individual chapter tests will show a browser window while running the tests."
    exit 1
    ;;
esac
