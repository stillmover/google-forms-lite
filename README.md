# Google Forms Lite

## Install dependencies

From repository root:

```bash
npm install
```

## Run project locally

### Option 1: Run from root

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

This project is a **monorepo with strict client/server separation**:

### Server
- GraphQL API built with Node.js + Express
- Schema and resolvers are generated and strongly typed
- Runtime schema is composed in `server/src/index.ts` using `makeExecutableSchema(...)`

Key structure:
- `server/src/generated/typeDefs.generated.ts`
- `server/src/generated/resolvers.generated.ts`
- `server/src/modules/**` (resolvers + business logic)

The server is responsible for:
- data validation
- type normalization (GraphQL-safe values)
- mock persistence layer (`server/src/db.ts`)

---

### Client
- React + TypeScript + Vite
- State management: Redux Toolkit + RTK Query
- GraphQL integration via generated hooks

Key structure:
- `client/src/api/generated.ts` (GraphQL codegen output)
- `client/src/api/enhancedApi.ts` (RTK Query layer)
- `client/src/store/**` (Redux slices)
- `client/src/hooks/**` (UI/business hooks)

The client is responsible for:
- UI state and interactions
- server data fetching (RTK Query)
- local UI-derived state (non-persistent)

---

### Type system

There is **no shared package between client and server**.

Instead:
- Server types are generated from GraphQL schema (`generated` folder)
- Client types are independently generated from the same schema
- Type safety is achieved through GraphQL codegen, not shared TS modules

This ensures:
- strict boundary between client and server
- no runtime coupling
- schema is the single source of truth

---

### Data flow

Client → GraphQL → Server → DB (in-memory)

- Client never imports server code
- Server never imports client code
- Communication happens only via GraphQL schema

## Data persistence (important)

The project currently uses **in-memory mock storage** (`server/src/db.ts`).

This means:
- data is not persisted to a real database;
- all created forms and responses are reset after server restart.

