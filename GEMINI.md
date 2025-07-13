# GEMINI.md: Agent Operating Guidelines for this Repository

This document outlines specific instructions and context for the Gemini CLI agent when interacting with this Jekyll-based personal academic/portfolio website repository.

---

## 1. Overall Website Structure & Content Management

This repository is set up for a personal academic or portfolio website using Jekyll. Jekyll converts Markdown (`.md`) files into a static website.

### Where Your Content Lives (Primary Interaction Areas)

You will primarily interact with these folders to add or modify content:

*   `_config.yml`: Main settings file for global configurations (name, site title, email, social media links).
*   `_posts/`: For blog posts (create files named `YYYY-MM-DD-your-title.md`).
*   `_publications/`: For academic papers (add each paper as a separate `.md` file).
*   `_talks/`: For presentations and talks (add each talk as a `.md` file).
*   `_teaching/`: For courses you've taught.
*   `_pages/`: For static pages like "About Me" (`about.md`) or "CV" (`cv.md`).
*   `_data/`: Holds structured data. Examples: `navigation.yml` (site menu links), `cv.json` (CV page data).

### The "Front-End" Stuff (Generally Ignore)

These folders control the site's appearance. Avoid modifying them unless significant design changes are required:

*   `_layouts/` & `_includes/`: HTML templates defining page structure.
*   `_sass/` & `assets/`: Control styling (colors, fonts, layout) and hold assets (images, CSS).

### The Generated Website (DO NOT TOUCH!)

*   `_site/`: Contains the final, generated website. **Never edit files here directly**, as Jekyll regenerates this directory on every build, overwriting any manual changes.

---

## 2. Agent's Capabilities (Common Tasks)

Based on this repository's structure, I can assist with the following common tasks:

1.  Add a new publication, blog post, or talk.
2.  Update your CV by editing `_data/cv.json` or `_pages/cv.md`.
3.  Change your bio or social media links in `_config.yml`.
4.  Add a new page (e.g., "Projects" or "Contact" page).
5.  Change the navigation menu.
6.  Find Google Scholar links for publications (see specific instructions below).

Just tell me what you'd like to accomplish, and I can guide you through the steps or perform them for you.

---

## 3. Specific Task Instructions

### Finding Google Scholar Links for Publications

When asked to find Google Scholar links for publications, follow this approach:

1.  List all files in the `_publications` directory.
2.  For each file, extract the publication title.
3.  Use a search engine to search for the title on Google Scholar.
4.  If a match is found, verify it by comparing the title, authors, and publication date.
5.  If the publication already has a `googlescholarurl`, verify its correctness.
6.  If the publication lacks a `googlescholarurl`, add it to the file.
7.  If no match is found, it's likely a placeholder and can be ignored.

---

## 4. Agent's File Handling & Git Workflow

### How this Agent Handles `GEMINI.md`

To ensure new context is always appended to `GEMINI.md` and earlier context is never entirely replaced, this agent will:

1.  **Read Existing Content:** Before writing new content, read the entire existing content of `GEMINI.md`.
2.  **Append New Context:** Append the new context to the retrieved existing content.
3.  **Write Combined Content:** Write the combined content back to `GEMINI.md`, preserving old content and adding new.

This approach ensures `GEMINI.md` grows with new information, preventing overwrites.

### Git Commit and Push Workflow

When performing changes that require a commit and push, the agent will adhere to the following workflow:

1.  **Stage Changes:** Use `git add <file_path>` for specific files or `git add .` for all relevant changes.
2.  **Prepare Commit Message:**
    *   Draft a clear, concise, and descriptive commit message.
    *   Focus on the "why" behind the change, not just the "what."
    *   Adhere to the project's existing commit message style (e.g., "type: Subject line").
    *   If the commit message contains special characters or spaces that might be misinterpreted by the shell, the agent will write the message to a temporary file (e.g., `commit_message.txt`) and use `git commit -F commit_message.txt`.
3.  **Commit Changes:** Execute `git commit -m "Your commit message"` or `git commit -F commit_message.txt`.
4.  **Verify Commit:** Run `git status` to confirm the commit was successful and the working directory is clean.
5.  **Push Changes:** Only push to the remote repository when explicitly instructed by the user, using `git push`.