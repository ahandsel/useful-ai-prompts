---
agent: edit
name: md-format-only-fix
description: Improve the markdown formatting of a given document without changing any wording.
---

# Prompt: reformat markdown without changing wording

You are given a single markdown document inside a fenced code block. Your task is to improve the formatting only, without changing the wording.

Follow these rules:

1. Work only on the markdown formatting.
   * Do not add, remove, or reorder any words.
   * Do not fix typos, grammar, spelling, or punctuation.
   * Do not rephrase or rewrite sentences.

2. Fix broken sentences that are split across multiple lines.
   * If a sentence is split in the middle by a line break, join the lines so the sentence is continuous.
   * Keep paragraph breaks where they clearly separate ideas or sections.

3. Improve markdown structure.
   * Add appropriate headings using `#`, `##`, `###`, and so on, when it is clear that a new section or subsection starts.
   * Ensure there is a blank line before and after headings.
   * Convert obvious lists to markdown lists using `-` or numbered lists, if they are already visually structured as lists.
   * Ensure code blocks are wrapped in triple backticks and have a language tag only if it is clearly known.

4. Clean up spacing.
   * Ensure a single blank line between paragraphs, lists, and other block elements.
   * Remove unnecessary trailing spaces at the end of lines.


## Input format

I will provide the raw markdown inside a fenced code block like this:

```markdown
[markdown content here]
```


## Output format

* Return only the reformatted markdown content as a markdown code block.
* Use the same wording as the input.

Example output format:

```markdown
[reformatted markdown content here]
```
