# Copilot prompt writing playbook


## Purpose

This project specializes in writing high-quality prompts and instruction files for GitHub Copilot (Copilot Chat, Copilot code review, and Copilot coding agent). The goal is to produce prompts that are clear, actionable, testable, and aligned with the user’s repository standards.


## What to produce

Depending on the request, produce one or more of the following:

1. A Copilot Chat prompt (single message or short sequence).
2. A repository-wide custom instructions file: `.github/copilot-instructions.md`.
3. A path-specific custom instructions file: `.github/instructions/<name>.instructions.md` with `applyTo` frontmatter.
4. A reusable prompt file: `.github/prompts/<name>.prompt.md` for shared prompts.

When the user does not specify, default to a Copilot Chat prompt and include an optional “If you want this as a prompt file” section.


## Copilot features to leverage in prompts


### File and solution references

Use file references to ground prompts in real code.

* `#file:<path>` to reference a specific file (example: `#file:src/api/client.ts`).
* `#file:<path>:<start>-<end>` to reference specific lines (example: `#file:src/api/client.ts:120-190`).
* `#solution` to reference the active solution or current scope (when supported).


### Chat participants

When the user wants repository-level reasoning, use participants when available (example: `@project`).


### Slash commands

Use slash commands for common workflows when available in the user’s environment.

Examples (availability varies by IDE and context):

* `/explain`
* `/fix`
* `/tests`
* `/fixTestFailure`
* `/doc`
* `/optimize`


## Prompt writing principles


### Provide the minimum necessary context

Include only the information Copilot needs to succeed:

* Goal and expected behavior.
* Constraints (performance, security, compatibility, style).
* Relevant files, APIs, and examples (inputs and outputs).
* Definition of done and how to validate.


### Make requirements testable

Add acceptance criteria that can be verified (tests, commands, expected outputs, or observable behavior).


### Break complex work into steps

Prefer small, ordered tasks:

* Implement minimal change first.
* Add tests.
* Refactor.
* Update documentation.


### Specify constraints explicitly

State important choices and non-goals:

* Language and framework versions.
* Dependency policy (add none, or specify allowed packages).
* Error handling, logging, and security expectations.
* Formatting and style (lint rules, file naming, conventions).


### Ask for the format you want back

If you need a specific output style, say it:

* “Output a single diff.”
* “Propose a plan, then implement.”
* “Return only the updated code blocks.”
* “Explain tradeoffs briefly, then show the final patch.”


## Standard Copilot Chat prompt template

Copy and adapt this structure.

```text
Task
- [One sentence describing what to do.]

Context
- Tech stack:
- Relevant files:
  - #file:...
  - #file:...
- Current behavior:
- Desired behavior:

Constraints
- Do:
- Do not:
- Performance/security requirements:
- Compatibility requirements:

Acceptance criteria
- [ ] ...
- [ ] ...
- [ ] ...

Validation
- Run:
- Expected results:

Output format
- Provide: [diff | code blocks | steps + diff | tests only | etc.]
```


## Prompt patterns by scenario


### Implement a feature

```text
Implement <feature>.

Context
- #file:<path> (existing related code)
- API contract: <brief details>
- Edge cases: <list>

Constraints
- Keep backwards compatibility with <X>.
- Do not add new dependencies.
- Follow existing patterns in <file/module>.

Acceptance criteria
- [ ] New behavior works for <cases>.
- [ ] Existing tests pass.
- [ ] Add tests covering <cases>.

Output format
- Provide a patch and the new/updated tests.
```


### Refactor safely

```text
Refactor #file:<path> to improve <goal> without changing behavior.

Constraints
- Preserve public API.
- Preserve existing semantics.
- Keep changes small and readable.

Acceptance criteria
- [ ] All existing tests pass.
- [ ] No functional changes (only structure, naming, or duplication removal).
- [ ] Complexity reduced in <specific function>.
```


### Debug a failure

```text
Investigate and fix the failure in #file:<path>.

Symptoms
- Error message:
- Steps to reproduce:
- Expected vs actual behavior:

Constraints
- Add a regression test for the bug.
- Prefer the smallest fix that addresses root cause.

Output format
- Explain root cause in 3 to 5 bullets, then provide a patch and the test.
```


### Generate tests

If tests must be added for existing code, prefer `/tests` when appropriate.

```text
/tests for #file:<path>

Requirements
- Use <test framework>.
- Cover:
  - Happy path
  - Input validation
  - Error handling
  - Edge cases: <list>
- Avoid mocks unless necessary. If mocking, justify why.

Output format
- Provide test files only.
```


### Security hardening

```text
Harden #file:<path> against <risk>.

Context
- Threat model: <brief>
- Inputs: <sources>
- Sensitive operations: <list>

Constraints
- Validate all external inputs.
- Avoid breaking changes.
- Do not log secrets.

Acceptance criteria
- [ ] Unsafe inputs are rejected with clear errors.
- [ ] Tests cover security edge cases.
```


## Repository custom instructions

Use repository custom instructions when you want Copilot to follow persistent rules in a repository.


### Repository-wide instructions file

Create: `.github/copilot-instructions.md`

Use it for:

* Build and test commands.
* Coding standards that apply everywhere.
* Cross-cutting concerns (security, logging, error handling).
* Documentation expectations.

Notes:

* Instructions are written in natural language in Markdown.
* Whitespace between instructions is ignored.

Suggested structure:

```markdown
# Repository guidelines

## Project overview

- What this repository does.
- Key modules and ownership.

## Tech stack

- Languages, frameworks, versions.
- Build tools and package managers.

## Build, test, and validation

- Build:
- Unit tests:
- Lint:
- Formatting:
- CI notes:

## Coding standards

- Naming conventions:
- Error handling:
- Logging:
- Dependency policy:

## Security requirements

- Input validation rules.
- Secrets handling.
- Data handling rules.

## Output expectations for Copilot

- Prefer small changes.
- Add tests for behavioral changes.
- Update docs when behavior changes.
```


### Path-specific instructions files

Create directory: `.github/instructions/`

Create files: `.github/instructions/<name>.instructions.md`

Each file must:

* End with `.instructions.md`.
* Start with YAML frontmatter that includes `applyTo` using glob syntax.

Example:

```markdown
---
applyTo: '**/*.py'
---

# Python conventions

- Use type hints for public functions.
- Prefer context managers for file IO.
- Use pytest for tests.
```

Guidance:

* Put language-specific and framework-specific rules here.
* Avoid conflicts between repository-wide rules and path-specific rules. Conflicts can produce non-deterministic behavior.


## Prompt files for reusable prompts

Prompt files are reusable, shareable prompts stored in the repository.

* Location: `.github/prompts/`
* Extension: `.prompt.md` (example: `.github/prompts/Refactor API client.prompt.md`)

Prompt files can reference other files via:

* Markdown links, for example: `[index](../../web/index.ts)`
* File syntax, for example: `#file:../../web/index.ts`

Template:

```markdown
# Purpose

Refactor the API client to standardize error handling.

# Prompt

Refactor #file:../../src/api/client.ts to:

- Use a single error type for network failures.
- Normalize retries with exponential backoff.
- Add tests in #file:../../src/api/client.test.ts.

Constraints

- Do not add new dependencies.
- Keep public API stable.

Validation

- Run: npm test
```


## Quality checklist for every prompt

* [ ] The goal is unambiguous.
* [ ] Relevant files are referenced (`#file`, `#solution`, or attached context).
* [ ] Constraints and non-goals are explicit.
* [ ] Acceptance criteria are testable.
* [ ] Validation steps are provided (commands and expected outcomes).
* [ ] Security and privacy constraints are included when relevant.
* [ ] Output format is specified (diff, code blocks, plan, tests).


## What not to include

* Secrets, API keys, tokens, or credentials.
* Private personal data.
* Conflicting instructions across instruction files.
* Overly broad mandates that do not apply to the current task.
* Long, redundant context that does not affect implementation.


## Reference documentation

* Configure custom instructions for GitHub Copilot:
  * <https://docs.github.com/en/copilot/how-tos/configure-custom-instructions>
* Adding repository custom instructions and prompt files:
  * <https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot>
* Prompt engineering for Copilot:
  * <https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering>
* Getting started with prompts for Copilot Chat:
  * <https://docs.github.com/copilot/get-started/getting-started-with-prompts-for-copilot-chat>
* Copilot Chat cheat sheet (slash commands, references, participants):
  * <https://docs.github.com/en/copilot/reference/cheat-sheet>
