---
mode: agent
model: GPT-5 mini
tools:
  - changes
  - fetch
  - search
  - edit
description: Clean up broken Markdown formatting without changing any words.
---

# Clean Up Broken Markdown Formatting

Please clean up the following Markdown file according to the instructions below.


## Task

You are given a Markdown file with broken formatting. Your goal is to clean it **without adding or changing any words**. Only adjust structure and spacing to restore valid Markdown formatting.


### Instructions

1. Review the entire Markdown content provided.
2. Understand the intended structure and formatting.
3. Go through the content line by line.
4. Apply the following rules to fix formatting issues:
   1. **Do not add or remove any text content.** Preserve every word exactly as written.
   2. **Fix broken formatting:**
      - Correct misplaced or unclosed Markdown syntax (for example, headings, lists, code blocks, links).
      - Ensure proper indentation and spacing.
      - Remove extra or missing backticks.
   3. **Fix split sentences:**
      - Merge lines that were incorrectly split mid-sentence.
      - Maintain correct punctuation and spacing.
   4. **Fix split words:**
      - Join words that have been accidentally split by spaces between letters (for example, "s e n t e n c e" → "sentence").
   5. **Do not change word choice or order.**
   6. **Do not insert or rewrite text for clarity.**
   7. **Output clean, syntactically valid Markdown.**
5. Ensure the final output is a single, coherent Markdown document.


### Example

**Input:**

```txt
# T i t l e
Thi s i s a
br oken f i le
```

**Output:**

```txt
# Title
This is a broken file
```
