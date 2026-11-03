# kozikowski.it

Bartosz Kozikowski's personal portfolio.

The website is being developed in small pull requests. This first change establishes a local Next.js development environment and a neutral Home scaffold. The Figma-based interface, interactive project cards and case studies follow in separate reviews.

## Local development

Use Node.js 24 and npm. With nvm installed:

```sh
nvm use
npm ci
npm run dev
```

Open <http://127.0.0.1:3100>. Fast Refresh reflects source changes while the development server runs. Port 3100 avoids competing with another project on the usual port 3000; the server listens only on the local machine.

## Commands

| Command                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Start the local development server                         |
| `npm run format`       | Format source and configuration                            |
| `npm run format:check` | Check formatting without changing files                    |
| `npm run lint`         | Run ESLint with no warnings allowed                        |
| `npm run typecheck`    | Generate Next.js types and run strict TypeScript checks    |
| `npm run build`        | Build the production application                           |
| `npm start`            | Preview the existing production build locally on port 3100 |
| `npm run check`        | Run formatting, lint, type checks and build                |

The quality workflow runs these checks on pull requests and changes to `main`. Interaction tests will arrive with the first interactive behavior; the foundation does not have a test suite that only checks static placeholder text.

## Structure

```text
src/app/                     App Router entry points, layout and metadata
src/core/modules/Home/       Home component, SCSS Module and public export
src/core/theme/              Shared SCSS tokens and global styles
.github/workflows/ci.yml     Quality checks
docs/review-plan.md          Small PR boundaries and review workflow
```

The structure follows EPOCA LP conventions: thin routes, feature modules, colocated SCSS Modules, shared theme and the `@/` source alias. The foundation uses current dependencies and a system font. Design-specific assets and typography belong to the Home layout PR.

Development and production builds explicitly use Next.js's supported Webpack option. During setup, the Turbopack SCSS worker failed to bind its internal port in the local execution environment; the same application built successfully with Webpack. This keeps local development and CI on the verified compiler without custom loader configuration.

Next.js supports ESLint 10, but some bundled plugins still declare peer ranges ending at ESLint 9. npm may print peer-range warnings during installation. The lockfile installation and lint command are checked independently; no `--force` or `--legacy-peer-deps` flags are required.

## Code review

See the [review plan](docs/review-plan.md). Each feature branch becomes a focused PR with local review instructions and verification results. Pull requests stay open for Bartosz's review; they are not merged automatically.

No environment variables or credentials are needed for the foundation. Keep secrets, client data and unapproved screenshots out of this public repository.

Hosting and application demos will be planned after the website is complete.
