When asked to find ResearchGate links for publications, the following approach should be taken:

1.  List all the files in the `_publications` directory.
2.  For each file, extract the title of the publication.
3.  Use a search engine to search for the title on ResearchGate.
4.  If a matching publication is found, verify that it is the correct one by comparing the title, authors, and publication date.
5.  If the publication already has a `researchgateurl`, verify that the URL is correct.
6.  If the publication does not have a `researchgateurl`, add it to the file.
7.  If no matching publication is found, it is likely a placeholder file and can be ignored.

## How this agent handles GEMINI.md

To ensure that new context is always appended to `GEMINI.md` and the earlier context is never entirely replaced, this agent will adopt the following approach when it needs to update the file:

1.  **Read Existing Content:** Before writing any new content, the agent will first read the entire existing content of `GEMINI.md`.
2.  **Append New Context:** The agent will then append the new context to the retrieved existing content.
3.  **Write Combined Content:** Finally, the agent will write the combined content back to `GEMINI.md`, effectively preserving the old content and adding the new.

This approach ensures that `GEMINI.md` will only grow with new information, rather than having its previous content overwritten.