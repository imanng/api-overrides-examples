# Next.js Coffee App

A Next.js 16 App Router example for API Overrides. The app renders coffee data
through the API Overrides proxy and demonstrates server-side data fetching plus a
small client-side top-coffees dialog.

## Getting Started

Create a local environment file:

```bash
cp .env.example .env.local
```

For local development, the default values are:

```env
NEXT_PUBLIC_DEPLOYMENT_URL=http://localhost:3000
API_OVERRIDES_PROXY_BASE_URL=https://api-overrides.anng.dev/api/proxy/main
OVERRIDE_PROXY_SECRET=""
```

Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SSR User IP Forwarding

Server-rendered pages fetch through the local `/api/coffee/...` rewrite. When
`OVERRIDE_PROXY_SECRET` is set, those SSR fetches also forward:

```txt
x-override-client-ip
x-override-proxy-secret
```

`OVERRIDE_PROXY_SECRET` must match the value configured in API Overrides. It is a
server-only secret and must not use a `NEXT_PUBLIC_` prefix. Client components do
not send it.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
