# Review plan

Each pull request delivers one coherent part of the portfolio. Keep handwritten changes focused; identify generated lockfile changes separately in the PR description.

1. **Foundation:** Next.js, TypeScript, SCSS Modules, local development and quality checks. The initial Home is a neutral scaffold, not the Figma implementation.
2. **Project catalog:** canonical project names and verified public resources, replacing historical Figma names and hidden duplicate repositories. Data only; the Home scaffold remains unchanged.
3. **Home layout:** the Updated/Home Figma frame, original assets, design tokens, navigation and responsive card composition. Use the project catalog for card and menu content. Extract exact design context before implementation.
4. **Card interactions:** dragging by the title bar, active stacking order, bounded positions, click/drag separation, Shuffle/reset, keyboard access and reduced motion. Add behavior tests here.
5. **Project details:** extend the project registry with accurate responsibilities and case-study content; add individual URLs, About, CV, contact and metadata. Cover routing and link behavior.
6. **Metrics and polish:** the red strip from Figma Content, measured values with date/environment, mobile verification, accessibility and performance. Sample Figma numbers are not measurements.

The Figma names and links predate the public source publication. Use `src/core/content/projects.ts` as the canonical catalog rather than copying those historical labels into the UI. It includes the original selection and PM Traffic Manager, CELINA and FaniMani from the current portfolio. EPOCA is one project with frontend/backend links; its landing page is separate. Board.Dev exposes only the approved public frontend.

Resources distinguish `source` from `case-study`, so a README-only repository is not presented as application source. Accounting and advertising projects retain descriptive names where a public client/product name has not been established. Leave demo URLs absent until the applications are available. The portfolio itself can be added as a case study once its implementation is complete.

## Review workflow

- Work on a feature branch, never commit application changes directly to `main`.
- Run the relevant checks and inspect the diff before opening a PR.
- Include the purpose, scope, local review steps, verification and screenshots when relevant.
- Keep PRs open for Bartosz's review. Do not merge automatically.
- If work continues before a dependent PR is merged, explicitly base the next PR on that branch and state the dependency, so its diff contains only the new work.
- Address review comments in the same PR. Avoid rewriting shared history without agreement.

## Later scope

Hosting, DNS and deployment are separate decisions after the website is complete. EPOCA and PM Traffic demos follow; show demo links only after their destinations have been deployed and checked.
