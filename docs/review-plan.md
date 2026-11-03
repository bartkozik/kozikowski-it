# Review plan

Each pull request delivers one coherent part of the portfolio. Keep handwritten changes focused; identify generated lockfile changes separately in the PR description.

1. **Foundation:** Next.js, TypeScript, SCSS Modules, local development and quality checks. The initial Home is a neutral scaffold, not the Figma implementation.
2. **Home layout:** the Updated/Home Figma frame, original assets, design tokens, navigation and responsive card composition. Extract exact design context before implementation.
3. **Card interactions:** dragging by the title bar, active stacking order, bounded positions, click/drag separation, Shuffle/reset, keyboard access and reduced motion. Add behavior tests here.
4. **Project details:** one typed project registry, individual URLs, accurate responsibilities, code/case-study links, About, CV, contact and metadata. Cover routing and link behavior.
5. **Metrics and polish:** the red strip from Figma Content, measured values with date/environment, mobile verification, accessibility and performance. Sample Figma numbers are not measurements.

The Content frame starts with Accounting SaaS, Board.Dev, Creative Platform, Art Network, EPOCA, Liquid Editions and EPOCA LP. Include PM Traffic Manager and CELINA from the later brief. EPOCA is one project with frontend/backend links; its landing page is separate.

## Review workflow

- Work on a feature branch, never commit application changes directly to `main`.
- Run the relevant checks and inspect the diff before opening a PR.
- Include the purpose, scope, local review steps, verification and screenshots when relevant.
- Keep PRs open for Bartosz's review. Do not merge automatically.
- If work continues before a dependent PR is merged, explicitly base the next PR on that branch and state the dependency, so its diff contains only the new work.
- Address review comments in the same PR. Avoid rewriting shared history without agreement.

## Later scope

Hosting, DNS and deployment are separate decisions after the website is complete. EPOCA and PM Traffic demos follow; show demo links only after their destinations have been deployed and checked.
