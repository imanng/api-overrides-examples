# Repository Guidelines

## Scope

These instructions apply to the `nextjs_coffee_app` directory.

## Project Overview

This is a Next.js 16 App Router coffee menu example for API Overrides. The app renders coffee data from the API Overrides proxy and demonstrates both server-side data fetching and a small client-side dialog flow.

## Commands

Run commands from `nextjs_coffee_app`.

```bash
npm run dev
npm run lint
npm run build
```

The repo currently contains both `package-lock.json` and `pnpm-lock.yaml`; prefer the npm scripts above unless the user asks for a different package manager. Avoid rewriting lockfiles unless dependency changes require it.

## Runtime Configuration

The app expects `NEXT_PUBLIC_DEPLOYMENT_URL` to be set to the app origin used for internal API calls. For local development this is typically:

```env
NEXT_PUBLIC_DEPLOYMENT_URL=http://localhost:3000
```

`next.config.ts` rewrites `/api/:path*` to:

```txt
https://api-overrides.anng.dev/api/proxy/main/:path*
```

Server components and client components both currently fetch through `${NEXT_PUBLIC_DEPLOYMENT_URL}/api/coffee/hot...` so the Next.js rewrite path is exercised.

## Structure

- `src/app/page.tsx` is the SSR home page and fetches the coffee list with `cache: "no-store"`.
- `src/app/coffee/[id]/page.tsx` is the SSR detail page and also generates metadata from the coffee API.
- `src/components/CoffeeCard.tsx` is a client component for the linked coffee cards.
- `src/components/TopCoffeesButton.tsx` is a client component that fetches and displays the top 10 coffees in a portal dialog.
- `src/types/coffee.ts` owns the Coffee type and normalization helpers for images and ingredients.
- `src/app/globals.css` contains the active app styling. `src/app/page.module.css` appears to be leftover create-next-app styling and is not imported by the current screens.
- `docs/ssr-user-ip-forwarding.md` documents the related SSR forwarding work expected in the API Overrides service.

## Coding Conventions

- Keep server data fetching in App Router server components unless browser-only state or interaction is required.
- Add `"use client"` only to components that need hooks, portals, event handlers, or other browser-only behavior.
- Use the `@/*` path alias for imports from `src`.
- Reuse `getCoffeeImage` and `getCoffeeIngredients` when rendering API data instead of duplicating normalization logic.
- Preserve the existing dark coffee-themed visual language when changing UI. Keep layout responsive and check mobile widths for text overflow.
- Prefer small, focused changes; this is an example app, so avoid introducing broad state management or data-fetching libraries unless the user specifically asks.

## Verification

For code changes, run:

```bash
npm run lint
npm run build
```

For UI changes, also run the dev server and check the home page plus at least one coffee detail route.
