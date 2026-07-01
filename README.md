# Store App

A mobile store application built with **Expo (SDK 57)** and **expo-router**. Consumes the public [DummyJSON](https://dummyjson.com/docs) API for authentication and product management.

Features: user login, product list with server-side search & load-more pagination, product detail, add/edit/delete product, and profile view.

---

## Prerequisites

Before cloning, make sure the following are installed:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | ≥ 20 LTS | Recommended: use [nvm](https://github.com/nvm-sh/nvm) or [Volta](https://volta.sh/) |
| **npm** | ≥ 10 | Ships with Node 20+ |
| **Git** | latest | |
| **Watchman** (macOS) | latest | `brew install watchman` |

### For Android builds
- **Android Studio** (Hedgehog or newer) with an emulator image, or a physical device with USB debugging enabled
- **JDK 17** (Android Gradle Plugin 8+ requirement)
- Set `ANDROID_HOME` env var and add `platform-tools` to your `PATH`

### For iOS builds (macOS only)
- **Xcode** 15+ with Command Line Tools
- **CocoaPods** — `sudo gem install cocoapods`
- An iOS Simulator or a physical device

> **Important:** this project uses native modules (`react-native-keychain`, `expo-secure-store`) that are **not included in Expo Go**. You must run a **Development Build** — Expo Go will fail at login.

---

## Getting started

### 1. Clone & install

```bash
git clone <repo-url>
cd store-app
npm install
```

### 2. Generate native projects

The `android/` and `ios/` folders are not checked in. Generate them with `expo prebuild`:

```bash
npx expo prebuild
```

This creates the native projects and links all native modules (keychain, secure-store, reanimated, etc.).

### 3. Run a Development Build

Pick the platform:

```bash
# Android emulator or connected device
npm run android

# iOS simulator (macOS only)
npm run ios

# Web (browser)
npm run web
```

The first run compiles the native app and installs it on the device. Subsequent runs only reload the JS bundle. If Metro isn't already running, `npm start` will start it.

### 4. Login credentials

The app authenticates against `https://dummyjson.com/auth/login`. Use any account from the [DummyJSON users list](https://dummyjson.com/users). Example:

- **username:** `emilys`
- **password:** `emilyspass`

---

## Tech stack

| Category | Library |
|---------|---------|
| Framework | Expo SDK 57, React Native 0.86, React 19 |
| Navigation | `expo-router` (file-based routing, typed routes) |
| UI | `@gluestack-ui/core`, `nativewind` (Tailwind CSS for RN), `tailwindcss` |
| Data fetching | `@tanstack/react-query` v5 |
| Forms | `react-hook-form` + `@hookform/resolvers` + `zod` v4 |
| HTTP client | `axios` |
| Secure storage | `expo-secure-store` (auth token), `react-native-keychain` |
| State (local) | `@reduxjs/toolkit` + `react-redux` |
| Images | `expo-image` |
| Animation | `react-native-reanimated`, `@legendapp/motion` |

---

## Project structure

```
src/
├── app/                        # expo-router file-based routes
│   ├── _layout.tsx             # Root layout (QueryClientProvider + GluestackUIProvider)
│   ├── index.tsx               # Entry redirect
│   ├── login.tsx               # Login screen
│   ├── (tabs)/                 # Bottom-tab group
│   │   ├── _layout.tsx         # Tab bar config + auth guard
│   │   ├── index.tsx           # Home — product list, search, pagination
│   │   ├── add-product.tsx     # Add product form
│   │   ├── profile.tsx         # User profile
│   │   ├── cart.tsx
│   │   └── recipes.tsx
│   └── product/                # Product routes (outside tab bar)
│       ├── _layout.tsx         # Stack layout
│       ├── [id].tsx            # Product detail
│       └── edit/[id].tsx       # Edit product form
├── components/
│   ├── ui/                     # gluestack-ui primitives (button, input, card, ...)
│   ├── common/                 # Cross-feature components
│   ├── login/                  # Login-specific components
│   ├── product/                # Product card, form, search bar, skeleton
│   └── profile/                # Profile-specific components
├── services/                   # API service layer (auth, product)
├── interfaces/                 # TypeScript interfaces per domain
├── utils/                      # axios instance, redux helpers
├── configs/                    # Environment config (API base URL)
├── stores/                     # Redux slices
├── hooks/                      # Custom React hooks
├── constants/
└── global.css                  # Tailwind entrypoint
```

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the Metro bundler. Prompts for platform. |
| `npm run android` | Build + install dev client on Android and start Metro. |
| `npm run ios` | Build + install dev client on iOS simulator (macOS only). |
| `npm run web` | Run the app in a web browser. |
| `npm run lint` | Run ESLint via `expo lint`. |
| `npm run reset-project` | Reset the app to a blank template (see below). |

---

## Configuration

The API base URL is defined in **`src/configs/api.config.ts`**:

```ts
export const API_URL = "https://dummyjson.com";
```

Change it here if you want to point at a different backend. No `.env` file is required.

---

## Troubleshooting

- **"Cannot find native module" or crash after login** — you're likely running Expo Go. Rebuild the dev client (`npx expo prebuild && npm run android`/`ios`).
- **Metro cache issues** — `npx expo start -c` clears the cache.
- **Android build fails on JDK** — verify `java -version` prints 17. Newer/older JDKs are not supported by AGP 8.
- **iOS pods out of sync after adding a package** — `cd ios && pod install`, or re-run `npx expo prebuild --clean`.

---

## Get a fresh project

When you want to start from a blank template, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

---

## Learn more

- [Expo SDK 57 docs](https://docs.expo.dev/versions/v57.0.0/) — **use the versioned docs**, Expo APIs change between SDKs
- [expo-router](https://docs.expo.dev/router/introduction/)
- [gluestack-ui v5](https://gluestack.io/)
- [NativeWind](https://www.nativewind.dev/)
- [TanStack Query](https://tanstack.com/query/v5)
- [DummyJSON API](https://dummyjson.com/docs)
