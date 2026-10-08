# JARVIS CINEMA 🎬

> **A cinematic movie-discovery interface built around the Marvel Cinematic Universe and Prabhas film universe.**

JARVIS CINEMA is a futuristic, responsive movie platform designed as a portfolio-grade cinematic experience. It combines TMDB metadata, cinematic UI motion, official YouTube trailers, Firebase authentication, personal movie lists, recent browsing, and a secure server-side TMDB architecture.

The interface is intentionally inspired by **JARVIS / Stark HUD systems**, but MCU and Prabhas content have their own distinct visual identities.

---

## ✨ Core Experience

### 🦾 Marvel Cinematic Universe

The MCU experience uses a Stark-tech visual language:

- Cyan HUD telemetry
- Marvel red accents
- Arc-reactor inspired orbital motion
- Animated scan lines
- Glassmorphism panels
- Cinematic poster cards
- TMDB-powered movie metadata
- Cast and trailer information

### 🔥 Prabhas Universe

Prabhas has a completely different cinematic treatment:

- Gold and ember color system
- Warm cinematic gradients
- Animated golden shimmer
- Floating ember effects
- Gold/orange interaction states
- Dedicated universe filtering
- TMDB-powered filmography

The two experiences are intentionally **not just different colors**. Their backgrounds, accents, motion, hover states, cards, and visual effects respond to the selected universe.

---

## 🚀 Features

- 🎬 MCU movie discovery
- 🔥 Prabhas movie discovery
- 🔎 Universe-aware movie search
- 🎭 Cast information
- ⭐ TMDB ratings
- 📝 Movie descriptions
- 🖼️ TMDB posters and backdrops
- ▶️ Official YouTube trailer playback
- ❤️ My List / favorites
- 👤 Firebase Authentication
- ☁️ Firestore synchronization for authenticated users
- 🕘 Recently viewed movies
- 🎨 Dark cinematic interface
- ☀️ Light mode
- 📱 Responsive mobile UI
- ♿ Reduced-motion accessibility support
- 📲 PWA/service-worker support
- ⚡ Lazy-loaded movie imagery
- 🔐 Server-side TMDB credential architecture
- 🧭 Infinite/paginated movie discovery
- 🎛️ Genre, year, rating and sorting controls

---

## 🧠 Architecture

The application is designed around a frontend + secure API architecture.

```text
┌─────────────────────────────┐
│        JARVIS CINEMA        │
│       Browser / PWA         │
└──────────────┬──────────────┘
               │
               │ HTTPS
               ▼
┌─────────────────────────────┐
│     TMDB API Proxy          │
│   Cloudflare Pages Function │
└──────────────┬──────────────┘
               │
               │ Server credential
               ▼
┌─────────────────────────────┐
│            TMDB             │
└─────────────────────────────┘

┌─────────────────────────────┐
│      Firebase Auth          │
│ Google / Email / Password   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          Firestore          │
│      User movie library     │
└─────────────────────────────┘
```

### Security principle

The TMDB Read Access Token **must never be placed in frontend JavaScript**.

The browser communicates with:

```text
/api/tmdb/*
```

The server-side function communicates with TMDB using:

```text
TMDB_READ_ACCESS_TOKEN
```

as an environment secret.

---

## 🗂️ Project Structure

```text
movie-stream/
│
├── assets/
│   ├── cinema.css
│   ├── cinema.js
│   ├── firebase-auth.js
│   └── firebase-config.js
│
├── functions/
│   └── api/
│       └── tmdb/
│           └── [[path]].js
│
├── index.html
├── manifest.webmanifest
├── sw.js
├── favicon.svg
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- CSS animations
- Responsive design
- PWA APIs

### Data

- TMDB API
- Firebase Authentication
- Cloud Firestore

### Backend

- Cloudflare Pages Functions
- Server-side environment variables
- TMDB API proxy

### External Services

- TMDB for movie metadata and imagery
- YouTube for official trailer playback
- Firebase for authentication and user library synchronization

---

## 🔐 TMDB Configuration

Create a server-side environment variable:

```text
TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
```

### Cloudflare Pages

In your Cloudflare Pages project:

1. Open **Settings**
2. Open **Environment variables**
3. Add:

```text
Name:
TMDB_READ_ACCESS_TOKEN

Value:
YOUR_TMDB_READ_ACCESS_TOKEN
```

4. Save the variable.
5. Redeploy the project.

### Important

Do **not** put the TMDB token inside:

- `cinema.js`
- `index.html`
- `firebase-config.js`
- GitHub commits
- localStorage
- browser-visible configuration

If a token has previously been exposed publicly, revoke it and create a replacement.

---

## 🔥 Firebase Configuration

Firebase Web configuration can be included in the frontend. Firebase API keys are identifiers rather than TMDB-style bearer secrets, but Firebase Authentication and Firestore still require proper project security configuration.

Configure:

- Firebase Authentication
- Google sign-in
- Email/password authentication
- Firestore
- Authorized domains

The deployed domain must be included in:

**Firebase Console → Authentication → Settings → Authorized domains**

For example:

```text
mokshith7777.github.io
```

### Firestore

The application stores authenticated-user library data under the user's UID.

Conceptually:

```text
users/
└── {uid}/
    └── profile/
        └── library
```

Firestore security rules should restrict users to their own documents.

---

## 🎥 Video Playback

JARVIS CINEMA currently provides **official trailer playback**, not unauthorized full-movie streaming.

Trailer playback uses official YouTube embeds discovered through TMDB video metadata.

For future full-length streaming, the platform must use content for which the project has appropriate distribution/streaming rights and an authorized video delivery service.

Recommended future architecture:

```text
Authorized Video Source
        ↓
HLS / DASH
        ↓
Video CDN
        ↓
JARVIS Player
```

Possible player capabilities:

- Play / pause
- Seek
- Volume
- Fullscreen
- Playback speed
- Quality selection
- Subtitles
- Resume position
- Mobile gestures

---

## 🎨 UI Design System

### MCU

```text
Primary:
Marvel Red

Secondary:
HUD Cyan

Background:
Stark Black / Midnight Blue

Motion:
Orbital rings
HUD scanning
Telemetry pulse
Energy glow
```

### Prabhas

```text
Primary:
Molten Gold

Secondary:
Ember Orange

Background:
Deep Charcoal / Black

Motion:
Gold shimmer
Floating embers
Cinematic glow
Energy pulse
```

The UI switches its visual system according to:

```text
MCU      → Stark / HUD
PRABHAS  → Gold / Ember Cinema
```

---

## 📱 Responsive Design

The interface adapts to:

- Desktop
- Laptop
- Tablet
- Android
- Mobile browsers

The movie grid dynamically changes column count, while controls and authentication layouts adapt for smaller screens.

---

## ♿ Accessibility

The project includes:

- Semantic buttons
- Keyboard-accessible movie cards
- Visible focus states
- Image alt text
- Responsive typography
- Reduced-motion support
- Mobile-friendly controls

Users who enable reduced motion at OS/browser level receive a less animated interface.

---

## 📲 PWA

JARVIS CINEMA includes:

- Web App Manifest
- Service Worker
- Standalone display mode
- Cached application shell
- Installable mobile experience

The PWA is designed to make the cinematic interface feel closer to an installed application.

---

## 🌐 Deployment

### GitHub Pages

The static frontend can be deployed through GitHub Pages.

Repository:

**mokshith7777/movie-stream**

Live site:

**https://mokshith7777.github.io/movie-stream/**

GitHub Pages is suitable for the static frontend, but it does **not** execute Cloudflare Pages Functions.

### Recommended production deployment

Use Cloudflare Pages when the secure TMDB proxy is required:

```text
GitHub Repository
       ↓
Cloudflare Pages
       ↓
Frontend + Functions
       ↓
TMDB
```

---

## ⚠️ Important Limitations

### TMDB

TMDB supplies metadata, posters, backdrops, ratings and related movie information.

It does **not** provide commercial full-movie streaming rights.

### YouTube

The project uses official YouTube trailer embeds.

It should not be used to embed unauthorized full movies.

### Firebase

Firebase configuration is project-specific.

Authentication providers and Firestore rules must be enabled in the Firebase Console before user accounts and cloud synchronization can work correctly.

### Cloudflare

The TMDB backend requires the environment variable:

```text
TMDB_READ_ACCESS_TOKEN
```

Without it, the proxy intentionally returns a configuration error rather than exposing a credential in the browser.

---

## 🧪 Development

For the static frontend, the project can be served using any static development server.

Example:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

For the Cloudflare Functions deployment, use the Cloudflare Pages development workflow appropriate to your project configuration.

---

## 🗺️ Roadmap

### Phase 1 — Current

- [x] MCU universe
- [x] Prabhas universe
- [x] TMDB metadata
- [x] Movie search
- [x] Filters
- [x] Movie details
- [x] Cast
- [x] Official trailers
- [x] Favorites
- [x] Firebase authentication
- [x] Firestore library sync
- [x] PWA
- [x] Responsive UI
- [x] Universe-specific animations
- [x] Server-side TMDB architecture

### Phase 2

- [ ] Advanced movie recommendations
- [ ] Watch progress synchronization
- [ ] Continue Watching
- [ ] Personal profiles
- [ ] Better recommendation engine
- [ ] Advanced MCU phase navigation
- [ ] Prabhas film timeline
- [ ] Enhanced accessibility
- [ ] Offline metadata caching

### Phase 3

- [ ] Authorized HLS/DASH video infrastructure
- [ ] Advanced cinematic player
- [ ] Subtitle support
- [ ] Multiple video qualities
- [ ] Resume playback across devices
- [ ] Watch history synchronization

---

## 🧩 Design Philosophy

JARVIS CINEMA is designed around three principles:

### 01 — Cinematic

The website should feel like a movie interface rather than a conventional database.

### 02 — Intelligent

Movie discovery, metadata, filtering, authentication and personal libraries should work together as one system.

### 03 — Secure

Credentials belong on servers.

The browser should receive data, not secrets.

---

## 📜 Credits

### Movie Metadata

Powered by **TMDB**.

This project uses TMDB APIs and imagery for movie metadata and discovery.

### Trailer Playback

Official YouTube embeds.

### Authentication & Cloud Data

Firebase Authentication and Cloud Firestore.

---

## 👨‍💻 Project

**JARVIS CINEMA**

Repository:

https://github.com/mokshith7777/movie-stream

Live:

https://mokshith7777.github.io/movie-stream/

---

## 📄 License

Add the project's preferred license before distributing the repository publicly.

---

> **JARVIS CINEMA**
>
> *Your universe. Your movies. Your interface.*
