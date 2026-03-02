# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build static export to out/
npm start        # Start production server (rarely needed — site is static)
```

There are no tests or linting scripts configured.

When creating git commits, do not add `Co-Authored-By` trailers.

## Architecture Overview

Next.js 14 portfolio site built as a **fully static export** (`output: 'export'`). All pages are pre-rendered at build time — there is no runtime server.

**`basePath: '/portfolio'`** is configured in `next.config.js` for GitHub Pages deployment. All asset paths go through `src/lib/asset-path.ts`'s `assetPath()` helper which prepends `NEXT_PUBLIC_BASE_PATH` — this must be used instead of bare strings for any path in `public/assets/`.

### Data Flow

Content is stored as JSON files in `content/`. Server components read them at build time via functions in `src/lib/content.ts` (using Node `fs` — only valid in server components). There is no API, database, or CMS.

```
content/meta.json          → getMeta()
content/about.json         → getAbout()
content/projects/*.json    → getProjects(), getProject(slug), getFeaturedProjects(), getAllTags()
```

Projects are sorted by the `order` field. Files prefixed with `_` (e.g. `_schema.json`) are excluded from loading.

### Server vs Client Components

- **Server** (default): `layout.tsx`, all page components — read JSON via `fs`, pass data as props
- **Client** (`'use client'`): `Header.tsx` (scroll + mobile menu), `ProjectCard.tsx` (onError handler), `ProjectsClient.tsx` (filter state), `ContactForm.tsx` (form submit)

The pattern is: server page reads JSON → passes typed props to a client component. Never call `fs` or content functions from client components.

### Static Routes

`src/app/projects/[slug]/page.tsx` uses `generateStaticParams()` to pre-render one page per project JSON file at build time. Adding a new project JSON automatically creates its route — no code changes needed.

## Adding a New Project

1. Create `content/projects/{slug}.json` (copy an existing file as template)
2. Add media to `public/assets/projects/{slug}/` — required: `cover.svg`; optional: `architecture.svg`, screenshots
3. The route `/projects/{slug}` and card listing are generated automatically

To find the next available `order` number:

```bash
node scripts/max-order.js
```

### Project JSON Schema

Required fields: `slug`, `title`, `isNda`, `featured`, `order`, `tags` (`type`/`stack`/`industry` arrays), `brief`, `case` (`problem`/`solution`/`result`), `media.cover`.

Optional: `subtitle`, `role`, `metrics` (`value`/`label` pairs), `media.architecture`, `media.screenshots`, `media.video`.

## Design System

Dark theme using Tailwind. Key color tokens defined in `tailwind.config.ts`:

| Token | Value |
|-------|-------|
| `background` | `#0a0a12` — main page bg |
| `surface` | `#0f0f1c` — section alternating bg |
| `card` | `#13131f` — card/panel bg |
| `border-subtle` | `#252540` — all card borders |

Accent color: `cyan-400` / `cyan-500` (`#22d3ee`).

Reusable CSS classes in `src/app/globals.css`: `.btn-primary`, `.btn-secondary`, `.card-base`, `.nda-badge`, `.section-heading`, `.text-gradient-accent`.

Stack tech tags have per-technology color mappings in `src/app/projects/[slug]/page.tsx` (`stackColors`). Add new technologies there to get colored badges.
