---
mode: agent
model: GPT-5 mini
tools:
  - changes
  - fetch
  - search
  - edit
  - search
description: Review and refactor Airtable scripts following best practices while preserving and updating comments.
---

# Prompt: Review and Modify Airtable Script


## Context

- Workspace: {{workspace name}}
- Base: {{base name}}
- Tables/Views used: {{table/view names}}
- Runtime: {{Scripting App | Automation Script | Custom App}}
- Goal: {{brief goal}}

---


## Tasks

1. Review code for correctness and Airtable best practices.  
2. Preserve all existing comments. Update only where inaccurate or unclear. Do not delete author attributions.  
3. Refactor for clarity, safety, and maintainability.  
4. Fix bugs and edge cases.  
5. Return a single revised script and a brief change log.

---


## Hard Rules

- Keep comments. Add `// UPDATED:` or `// ADDED:` when you modify or add comments.  
- Keep behavior the same unless a bug or unsafe pattern is found. If behavior changes, mark with `// BEHAVIOR CHANGE: reason`.  
- Use modern JS: `const/let`, `async/await`, no `var`.  
- Validate all external inputs and record fields before use.  
- Use idempotent operations where possible.  
- Batch and throttle API calls. Prefer `table.updateRecordsAsync` in chunks of ≤50.  
- Handle partial failures. Wrap Airtable calls in try/catch.  
- Avoid blocking loops on network I/O. Use chunked awaits.  
- Never rely on field position. Refer by field name.  
- Check for missing tables, views, fields. Fail with clear messages.  
- No secrets in logs.  
- Keep line length readable and functions small.

---


## Best-Practice Wishlist

- Small, pure functions with single responsibility.  
- Config object at top for table/field names and tunables.  
- Reusable helpers: chunking, safe get, schema guards.  
- Defensive reads: null/undefined checks.  
- Dry-run mode with no writes when `CONFIG.DRY_RUN === true`.  
- Structured logging: `log.info/warn/error` wrappers.  
- Measured performance: simple timers for critical sections.  
- Clear exit codes/messages for Automations.

---


## Review Checklist

- **Schema safety:** verify tables/fields exist; types match.  
- **Selectors:** views filtered correctly; queries scoped.  
- **Rate limits:** batched writes; spacing if needed.  
- **Error handling:** informative messages; no silent catches.  
- **Idempotency:** reruns produce the same result.  
- **Data integrity:** guard against partial updates.  
- **Edge cases:** empty views, long text, attachments, duplicates.  
- **Complexity:** reduce nesting; extract helpers.  
- **Comments:** preserved; updated where misleading; no noise.  
- **Testing hook:** enable DRY_RUN path and sample inputs.

---


## Output Format

1. **Revised Script** in one code block.  
2. **Change Log**: bullet list of key edits and reasons.  
3. **Assumptions**: any uncertainties you had.  
4. **Follow-ups**: questions only if blocking.

---


## House Style

- Use `/** JSDoc */` on exported helpers and complex functions.  
- Use `//` for inline notes.  
- Name functions verb-first.  
- Prefer early returns.  
- Prefer `for...of` over `forEach` with async.  
- Chunk helper: `function chunk(arr, n) { ... }`.

---


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
