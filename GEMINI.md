# GEMINI CLI Agent Context

This file provides context and instructions for the Gemini CLI agent when interacting with this project. It outlines general mandates and points to task-specific memory files for detailed insights.

## General Mandates

*   **Adhere to Project Conventions:** Always analyze existing code, tests, and configuration to maintain consistency.
*   **Verify Libraries/Frameworks:** Do not assume availability. Check `package.json`, `Gemfile`, `requirements.txt`, etc.
*   **Mimic Style & Structure:** Follow existing formatting, naming, and architectural patterns.
*   **Idiomatic Changes:** Ensure changes integrate naturally with the local context.
*   **Sparse Comments:** Add comments only for complex logic or when explicitly requested. Never use comments for communication with the user.
*   **Proactive Fulfillment:** Thoroughly complete requests, including implied follow-up actions.
*   **Confirm Ambiguity:** Clarify before taking significant actions.
*   **No Summaries (unless asked):** Do not summarize changes after completion.
*   **No Reverts (unless asked):** Do not revert changes unless explicitly requested or due to errors.

## Task-Specific Memory Files

For detailed context, common issues, and successful resolutions related to specific tasks, refer to the Markdown files within the `GEMINI/` directory. These files are designed to help future models understand the nuances of particular areas of the project.

**Instructions for Future Models:**

When working on a task, first check if a corresponding memory file exists in the `GEMINI/` directory (e.g., `GEMINI/CV.md` for CV-related tasks, `GEMINI/Publications.md` for publication tasks). Review its content for historical context, common pitfalls, and effective solutions. This will help you avoid repeating past struggles and ensure a more efficient and accurate execution of the task.

**Updating Memory Files:**

After completing a task, especially if new challenges were encountered or novel solutions were implemented, update the relevant memory file in `GEMINI/`. Focus on adding concise, high-value insights that would genuinely help a future model understand the context and efficiently resolve similar issues. Avoid dumping all information; prioritize key learnings and effective strategies.

## Project-Specific Information

*   **Operating System:** win32
*   **Current Working Directory:** E:\sahil-datascience.github.io
*   **Jekyll Build Command:** `bundle exec jekyll build` (often requires `git clean -fdx` beforehand for full cache clearing)
