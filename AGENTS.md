# Portfolio working agreement

- Keep changes in focused feature branches and pull requests. Bartosz reviews and merges them.
- Follow the boundaries in `docs/review-plan.md`; do not fold later features into a foundation PR.
- Follow EPOCA LP conventions: thin App Router entry points, feature modules and colocated SCSS Modules.
- Use the supplied Figma frames and original assets for the visual implementation. The initial Home is only a scaffold.
- Publish only accurate project claims and approved source/assets. Demo links require a working destination; metric values require a recorded measurement.
- Hosting, DNS and demo deployment are deferred until the website is complete.
- Run `npm run check` before a PR. Add meaningful behavior tests when introducing interactions; avoid tests that just mirror static markup.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
