# kozikowski.it

Personal portfolio of Bartosz Kozikowski, built with Next.js, React, TypeScript and SCSS Modules.

## Requirements

- Node.js 24 (`nvm use` if using nvm)
- npm

## Getting started

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:3100>.

## Scripts

| Command                | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Start the development server                            |
| `npm run build`        | Create a production build                               |
| `npm start`            | Serve locally after `npm run build`                     |
| `npm run lint`         | Run ESLint                                              |
| `npm test`             | Run interaction and formatting unit tests               |
| `npm run typecheck`    | Check TypeScript types                                  |
| `npm run format`       | Format source and configuration                         |
| `npm run format:check` | Check formatting                                        |
| `npm run check`        | Run formatting checks, lint, tests, typecheck and build |

## Measure the portfolio

Build and start the production server, then run the pinned Lighthouse desktop audit:

```sh
npm run build
npm start
```

In another terminal:

```sh
npm run metrics:audit -- --output-path /tmp/portfolio-lighthouse.json
npm run metrics:measure -- --report /tmp/portfolio-lighthouse.json
```

The audit uses Lighthouse `13.6.0` through `npm exec`, without adding a project dependency. Chrome must be installed. The measurement script accepts only localhost reports and fetches only their loaded, same-origin JavaScript responses. It updates `src/core/content/site-metrics.ts`; rebuild to display the new results. Keep the same production build running between the audit and the measurement command.

TTFB, FCP and load time are observed Lighthouse trace timings. The category scores use the recorded desktop simulation profile. JavaScript size is the sum of individually gzip-compressed loaded scripts at level 9. Unavailable measurements remain empty. Raw reports stay in the chosen local output location.

To include a timed successful build, pass `--build-time /tmp/portfolio-build.json` with this JSON structure:

```json
{
  "durationSeconds": 0,
  "recordedAt": "ISO-8601 timestamp of the actual build",
  "profile": "Describe the machine and whether the build cache was present",
  "exitCode": 0
}
```

Replace the example fields with the recorded build result; omit `--build-time` when no build measurement is available.
