# Google Forms Lite (Monorepo)

Google Forms Lite is a full-stack monorepo with:
- `client` - React + TypeScript + Vite + Redux Toolkit (RTK Query)
- `server` - Node.js + Express + GraphQL
- `packages/shared` - shared GraphQL-derived types

## Prerequisites

- Node.js 20+
- npm 10+

## Install dependencies

From repository root:

```bash
npm install
```

## Run project locally

### Option 1: Run everything from root (recommended)

```bash
npm run dev
```

This starts:
- client dev server
- GraphQL server
- GraphQL codegen watcher

### Option 2: Run services separately

Client:

```bash
npm run dev -w client
```

Server:

```bash
npm run dev -w server
```

Codegen watch:

```bash
npm run codegen:watch
```

## Useful scripts

From repository root:

```bash
npm run codegen
npm run typecheck -w server
npm run build -w client
```

## URLs

- Client: `http://localhost:5173`
- GraphQL endpoint: `http://localhost:4000/graphql`

## Architecture notes

- Server schema and resolvers are wired from generated files:
  - `server/src/generated/typeDefs.generated.ts`
  - `server/src/generated/resolvers.generated.ts`
- Runtime GraphQL schema is created in `server/src/index.ts` via `makeExecutableSchema(...)`.
- Client GraphQL hooks are generated into `client/src/api/generated.ts` and enhanced in `client/src/api/enhancedApi.ts`.

## Data persistence (important)

The project currently uses **in-memory mock storage** (`server/src/db.ts`).

This means:
- data is not persisted to a real database;
- all created forms and responses are reset after server restart.

