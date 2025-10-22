---
mode: agent
model: GPT-5 mini
tools:
  - changes
  - fetch
  - search
  - edit
description: Review and refactor Airtable scripts using safe, modern JS while preserving and annotating comments.
---

# Prompt: Review and Modify Airtable Script


## Context

* Workspace: {{workspace name}}
* Base: {{base name}}
* Tables/Views used: {{table/view names}}
* Runtime: {{Scripting App | Automation Script | Custom App}}
* Goal: {{brief goal}}
* Inputs: {{if any, e.g., input.config() keys}}


## Tasks

1. Review for correctness and Airtable best practices.
2. Preserve all existing comments. Update only if inaccurate or unclear. Do not remove author attributions.
3. Refactor for clarity, safety, and maintainability.
4. Fix bugs and edge cases without altering intended behavior.
5. Return one revised script and a brief change log.


## Hard Rules

* Keep comments. Use `// UPDATED:` or `// ADDED:` for any comment edits or additions.
* Keep behavior the same unless fixing a bug or unsafe pattern. Mark changes with `// BEHAVIOR CHANGE: reason`.
* Use modern JS: `const/let`, `async/await`, no `var`, no `await` inside `Array.prototype.forEach`.
* Validate external inputs and record fields before use.
* Prefer idempotent operations.
* Batch writes. Use `table.updateRecordsAsync` in chunks of ≤ 50.
* Handle partial failures. Wrap Airtable calls in `try/catch` and report which records failed.
* Avoid blocking loops on network I/O. Process in chunks with sequential `await` per chunk.
* Never rely on field position. Prefer field names; use field IDs if names are unstable.
* Check for missing tables, views, and fields. Fail with clear messages.
* Redact secrets from logs.
* Keep functions small. Keep line length readable.


## Best-Practice Wishlist

* Small, single-purpose functions.
* `CONFIG` object at top for table/field names and tunables.
* Reusable helpers: chunking, safe gets, schema guards.
* Defensive reads: null/undefined checks.
* Dry-run mode when `CONFIG.DRY_RUN === true`.
* Structured logging: `log.info`, `log.warn`, `log.error`.
* Simple timers to measure critical sections.
* Clear outputs for Automations (set outputs and exit codes where applicable).
* Query only needed fields to reduce memory: `selectRecordsAsync({ fields: [...] })`.


## Review Checklist

* **Schema safety:** tables/fields exist; expected types.
* **Selectors:** views and queries scoped and correct.
* **Rate limits:** batched writes; spacing/backoff if needed.
* **Error handling:** informative messages; no silent catches.
* **Idempotency:** safe reruns.
* **Data integrity:** guard partial updates; only write when changes exist.
* **Edge cases:** empty views, long text, attachments, duplicates, missing inputs.
* **Complexity:** reduce nesting; extract helpers.
* **Comments:** preserved; only clarified where misleading.
* **Testing hook:** DRY_RUN path and sample inputs.


## Output Format

1. **Revised Script** in one code block.
2. **Change Log**: bullets with key edits and reasons.
3. **Assumptions**: any uncertainties.
4. **Follow-ups**: only if blocking.


## House Style

* Use `/** JSDoc */` on exported helpers and complex functions.
* Use `//` for inline notes.
* Function names are verb-first.
* Prefer early returns.
* Prefer `for...of` over `forEach` with async.
* Chunk helper name: `chunk`.


## Sample Helper Stubs

```js
const CONFIG = {
  BASE_ID: '{{optional}}',
  TABLE: '{{TableName}}',
  VIEW: '{{ViewName}}',
  DRY_RUN: false,
  WRITE_CHUNK_SIZE: 50,
};

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function safeGet(record, field) {
  return record.getCellValue(field) ?? null;
}
