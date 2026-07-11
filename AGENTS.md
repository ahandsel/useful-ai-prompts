# AGENTS.md

A curated collection of AI prompts for ChatGPT, Claude, and other LLMs, plus the tooling to lint them and publish them as a [VitePress][] site. Mostly Markdown.


## Stack

* Package manager: pnpm, version pinned in `package.json` under `packageManager`; CI reads it from there.
* Runtime: Node.js (see `.node-version`).
* Site: VitePress, sourced from `contents/`, deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.
* Formatting and linting: Prettier (config `.prettierrc.json5`), markdownlint-cli2 (config `.markdownlint-cli2.jsonc`), cSpell (`.cspell.json`), and `@cybozu/license-manager` (`license-manager.config.cjs`).


## Layout

| Path        | What lives there                                                                |
| ----------- | ------------------------------------------------------------------------------- |
| `contents/` | The prompts themselves and the VitePress site config; the published site root.  |
| `skills/`   | Local agent skills, one folder per skill with a SKILL.md. See skills/README.md. |
| `scripts/`  | Repository helper scripts, most wired to pnpm commands. See scripts/README.md.  |
| `docs/`     | Generated docs, including contents-structure.md, a tree snapshot of contents/.  |


## Common commands

| Command              | What it does                                                              |
| -------------------- | ------------------------------------------------------------------------- |
| `pnpm lint`          | lint-code (Prettier) then lint-md (markdownlint-cli2), both fix in place. |
| `pnpm lint-code`     | Prettier only.                                                            |
| `pnpm lint-md`       | markdownlint-cli2 fix only.                                               |
| `pnpm dev`           | Run the VitePress dev server against contents/.                           |
| `pnpm build`         | Build the VitePress site.                                                 |
| `pnpm preview`       | Preview the built site.                                                   |
| `pnpm tree`          | Regenerate docs/contents-structure.md from contents/.                     |
| `pnpm test-names`    | Lint file and folder names (kebab-case, yaml over yml, dated prefixes).   |
| `pnpm check-license` | Analyze dependency licenses via license-manager.                          |
| `pnpm cleanup`       | Find and remove temporary files.                                          |
| `pnpm test`          | Full gate: lint, name lint, tree check, license check, build, preview.    |

Run `pnpm lint` before finishing any change so the diff is already formatted. Run `pnpm tree` whenever you add, remove, or rename a file under `contents/`.


## Conventions

* One prompt per file. Group related prompts in folders.
* Prompts are designed for copy/paste into a chat - keep them self-contained and free of project-specific context unless that context is explicitly part of the prompt.
* Each file in `contents/` has a YAML front matter block with at least `title` and `description`. The `title` is used in the site navigation and must be unique across the repo. The `description` is used in the site search index.
* File and folder names are kebab-case, `.yaml` (never `.yml`); `pnpm test-names` enforces this.

Writing rules (also enforced by markdownlint and the `general-en-polisher` skill):

* Straight quotes only - no curly quotes.
* Never use an en-dash or em-dash; always use a plain hyphen (`-`).
* Use the Oxford comma; avoid contractions; use sentence case for headings.
* Asterisk (`*`) bullets, two-space indent, two blank lines above a heading and one below.


## Scripts

Guidelines for helper scripts in `scripts/` and `skills/*/scripts/` (enforced by the `script-auditor` skill):

* **Language.** Default to Node.js ES modules (`.mjs`) or zsh. Python is banned. Non-module JavaScript (`.js` / `.cjs`) and non-zsh shells are allowed but not the default.
* **`--help`.** Every script must support `--help` and print clear usage.
* **Notes section.** Every script carries a comment block near the top with general notes (what it does), usage (how to invoke it), output (what it produces, including exit codes), and a reverse-chronological version history (`vX.Y - YYYY-MM-DD - summary`).
* **Status emojis.** Use ✅ for success, ⚠️ for warnings, and ❌ for errors in user-facing output.

When you add a script, wire it into `package.json` if it should be a `pnpm` command and add a row to the relevant `README.md` (`scripts/README.md` or the skill's README).


## Git commits

* Never add a `Co-Authored-By` trailer.
* Use the `ai-commit` skill to draft messages.

[VitePress]: https://vitepress.dev
