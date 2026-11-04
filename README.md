# kozikowski.it

Bartosz Kozikowski’s portfolio, built with Next.js, React, TypeScript and SCSS Modules.

Projects appear as a stack of draggable cards. Each opens a page with the project’s context, technology stack, my contribution and links to available source code.

## Interface

- Drag, filter and shuffle project cards, with keyboard controls and a stacked mobile layout.
- Switch between Day, Night and Punk modes. Punk adds an implant catalogue, animated card shuffle and a Spotify radio.
- Browse project galleries, experience and contact details, or download the PDF resume.

Animations respect the system’s reduced-motion preference. The metrics bar measures each visit in the browser: Web Vitals, load time and same-origin resource transfers. Measurements stay in memory and are not sent to an analytics service.

## Local development

Requires Node.js 24 and npm. No environment variables are needed to run the portfolio locally.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:3100>.

## Checks

```sh
npm run check
```

Runs formatting checks, ESLint, unit tests, TypeScript checks and a production build. Tests cover card movement, filtering, interface modes and metric calculations.

## Docker and deployment

```sh
docker build --tag kozikowski-it:local .
bash scripts/test-container.sh kozikowski-it:local
docker run --rm --publish 127.0.0.1:3000:3000 kozikowski-it:local
```

The image contains the standalone Next.js build and runs as a non-root user. Smoke tests check project routes, static assets, the resume PDF, image optimization and `/healthz`.

GitHub Actions checks code quality, scans Git history for secrets and tests the image before publishing it to GHCR. Production deployments use the tested image’s digest. Server configuration and rollback are maintained in [portfolio-infra](https://github.com/bartkozik/portfolio-infra).
