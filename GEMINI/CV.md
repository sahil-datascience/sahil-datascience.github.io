# CV Update Memory

## Task Overview
Updated CV data (`_data/cv.json`) and its rendering template (`_includes/cv-template.html`) to match a new Google Doc structure. The `_pages/cv.md` file was updated to use the `cv-layout`.

## Key Challenges & Solutions

1.  **Jekyll Caching Issues:**
    *   **Problem:** Changes to `_data/cv.json`, `_includes/cv-template.html`, and `_pages/cv.md` were not consistently reflected in the `_site/cv/index.html` output after `bundle exec jekyll build`.
    *   **Solution:** Aggressive cache clearing using `git clean -fdx` (to remove untracked and ignored files, including `_site/` and `.sass-cache/`) before rebuilding the Jekyll site. This was more effective than `rmdir` on Windows.
    *   **Insight:** Jekyll's incremental build and caching can be aggressive. A full clean is often necessary to ensure all changes are picked up, especially when modifying data files or includes.

2.  **Layout and Include Processing:**
    *   **Problem:** Initial attempts to use `{% include cv-template.html %}` within `_pages/cv.md` did not render the dynamic content from `_data/cv.json`.
    *   **Solution:** Moving the content of `_includes/cv-template.html` directly into `_layouts/cv-layout.html` and setting `layout: cv-layout` in `_pages/cv.md` ensured proper processing of Liquid tags and data access.
    *   **Insight:** For complex data rendering, it's often more reliable to place Liquid logic directly within the layout file that processes the data, rather than relying solely on includes within Markdown pages.

3.  **Windows Shell Commands:**
    *   **Problem:** Standard `rm -rf` commands for directory deletion failed on Windows.
    *   **Solution:** Used `git clean -fdx` as a reliable cross-platform alternative for clearing build artifacts within a Git repository.
    *   **Insight:** Be mindful of OS-specific shell commands. `git clean -fdx` is a robust solution for clearing build directories in Git projects.

## Relevant Files
*   `_data/cv.json`
*   `_includes/cv-template.html`
*   `_layouts/cv-layout.html`
*   `_pages/cv.md`
*   `_config.yml`

## Future Considerations
*   When updating CV or similar data-driven pages, always perform a `git clean -fdx` before `bundle exec jekyll build`.
*   If rendering issues persist, verify Liquid logic directly within the layout file and ensure data access paths are correct.

---
## CV Link Addition (July 2025)

### Task Overview
Added a prominent link to an external Google Doc CV at the top of the CV page.

### Key Challenges & Solutions
1.  **Git Commit on Windows:**
    *   **Problem:** The `git commit -m "message"` command failed due to shell interpretation of quotes on Windows.
    *   **Solution:** Wrote the commit message to a temporary file (`commit_message.txt`) and used `git commit -F commit_message.txt`. This avoided shell escaping issues.
    *   **Insight:** For complex commit messages or when facing shell issues on Windows, using `git commit -F` is a more robust method.

2.  **File Deletion on Windows:**
    *   **Problem:** The `rm` command is not available on Windows.
    *   **Solution:** Used the `del` command to remove the temporary `commit_message.txt` file.

### Relevant Files
*   `_layouts/cv-layout.html` (Modified to add the link)

---
## CV Rendering Issue (July 2025)

### Task Overview
The live CV page was showing an old version despite recent updates being pushed to the repository.

### Key Challenges & Solutions
1.  **Incorrect File Content:**
    *   **Problem:** The `_pages/cv.md` file contained a redundant `{% include cv-template.html %}` tag, which was causing an old, incorrect version of the CV to be rendered. This was a regression of a previously solved issue.
    *   **Solution:** Removed the include tag from `_pages/cv.md`.
    *   **Insight:** This incident highlights the critical importance of verifying file contents against the project's memory files (`GEMINI/CV.md` in this case), especially when encountering recurring or familiar problems. A quick check of the memory file would have immediately pointed to the likely cause.
