<!-- .github/copilot-instructions.md: guidance for AI coding agents working on this repo -->
# Copilot instructions for this repository

Purpose: help an AI agent be productive quickly in this small Express.js example project.

- **Big picture:** This is a minimal Node.js/Express app in `index.js` that implements an in-memory `books` collection and exposes simple REST endpoints under `/books`. There is no database or framework beyond Express. The server listens on port `8000` and logs request metadata to `requests.log` via `fs.appendFileSync`.

- **How to run / debug (discoverable):**
  - Start the server: `node index.js` (there is no `start` script in `package.json`).
  - Verify endpoints: `curl http://localhost:8000/books` or use Postman.

- **Key files:**
  - `index.js` — entire application; contains middleware, CORS headers, logging, and all route handlers.
  - `package.json` — lists `express` dependency and dev types only; no build/test/start automation.
  - `readme.txt` — developer notes about middleware and upcoming routing refactors.

- **Architecture & patterns to mirror:**
  - Middlewares are stacked in `index.js` (global logging, CORS headers, request body parsing). Follow the same pattern when adding new cross-cutting behavior.
  - Error responses consistently use an object with `message` and `error` fields (e.g. `{message: 'Book not found', error: 'Not Found'}`). Keep that shape when adding new endpoints or errors.
  - Validation style: handlers validate params/body and return `400` with the same object shape. Use `parseInt(req.params.id)` and the same response format.
  - The project uses an in-memory array `books` as the persistence model. New features should either continue this pattern or explicitly introduce a persistence layer and update all routes accordingly.

- **API examples (copyable):**
  - List books: `curl http://localhost:8000/books`
  - Get book 1: `curl http://localhost:8000/books/1`
  - Create book:
    `curl -X POST -H "Content-Type: application/json" -d '{"title":"My Book","author":"Me"}' http://localhost:8000/books`

- **Project-specific caveats & notes for code changes:**
  - `requests.log` is written synchronously (`fs.appendFileSync`). This is acceptable for learning/demo but avoid heavy synchronous I/O in production changes.
  - CORS and custom headers are implemented globally. If adding route-level security or policies, be explicit about which middleware order is required.
  - There is no test suite. Avoid adding features that assume test automation exists unless you also add the test scaffolding and `package.json` scripts.
  - `package.json` currently only contains a default `test` script. If you add `npm` scripts (e.g. `start`, `dev`, `test`), update this file accordingly.

- **Where to look for follow-up work / refactors:**
  - Split `index.js` into modules: middlewares/, routes/, and models/ as hinted in `readme.txt`.
  - Replace the in-memory `books` array with a persistence layer only when all routes are refactored and the app initialization is updated.

- **Conservative behavior for AI edits:**
  - Prefer small, local changes (fix a route, add validation, or add a script) rather than large structural refactors unless asked.
  - When modifying middleware ordering, ensure logging and CORS headers remain applied in the same or compatible order.

If anything here is unclear or you want this guidance to be stricter (for example, enforcing a modular refactor), tell me which parts to expand or convert into automated checks.
