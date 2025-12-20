# API Overrides Examples

Example applications demonstrating [API Overrides](https://github.com/imanng/api-overrides) - a proxy service for testing and mocking API responses.

## Overview

This repository contains two sample apps that consume the [SampleAPIs Coffee API](https://api.sampleapis.com/coffee/hot) through the API Overrides proxy:

- **Flutter App** - Mobile/web application
- **Next.js App** - Web application with SSR

## Apps

### 🎯 Flutter Coffee App

A mobile-first coffee menu application built with Flutter.

**Features:**
- Grid view of coffee items with images
- Pull-to-refresh support
- Detail page with API fetch by ID
- Dark coffee theme with hero animations

**Run:**
```bash
cd flutter_coffee_app
flutter pub get
flutter run
```

---

### 🌐 Next.js Coffee App

A server-rendered web application built with Next.js 16.

**Features:**
- Server-side data fetching
- Responsive card grid with hover effects
- Dynamic routes for coffee details
- Dark theme with glassmorphism design
- Top 10 coffees dialog (client-side fetch)

**Run:**
```bash
cd nextjs_coffee_app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

Both apps use the API Overrides proxy:

| Endpoint | Description |
|----------|-------------|
| `GET /api/proxy/main/coffee/hot` | List all hot coffees |
| `GET /api/proxy/main/coffee/hot/:id` | Get coffee by ID |

**Base URL:** `https://api-overrides.anng.dev`

## Related

- [API Overrides](https://github.com/imanng/api-overrides) - The proxy service powering these examples
- [SampleAPIs](https://sampleapis.com/) - Source API for coffee data
