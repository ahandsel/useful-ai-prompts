# AGENTS.md

A personal collection of prompts the user reuses with ChatGPT and other LLMs. Pure markdown.


## Stack

* Package manager: `pnpm@10.26.1` (only for the lint pipeline).
* Lint config: `.markdownlint.json`.


## Common commands

| Command          | What it does                                                                   |
| ---------------- | ------------------------------------------------------------------------------ |
| `pnpm lint`      | `lint-code` (Prettier `--write .`) then `lint-md` (markdownlint-cli2 `--fix`). |
| `pnpm lint-code` | Prettier only.                                                                 |
| `pnpm lint-md`   | markdownlint-cli2 `--fix`.                                                     |

Run `pnpm lint` before finishing any change so the diff is already formatted.


## Conventions

* One prompt per file is the easiest pattern; group related prompts in folders.
* Prompts are designed for copy/paste into a chat - keep them self-contained and free of project-specific context unless that's explicitly part of the prompt.
* Never use en-dash or em-dash; always use a plain hyphen (`-`) instead.


## Git commits

* Never add a `Co-Authored-By` trailer.
* Use the `ai-commit` skill to draft messages.
