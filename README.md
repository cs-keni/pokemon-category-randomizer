# Pokémon Nuzlocke Randomizer

A minimal full-stack web app that randomly generates 3 Pokémon category hints (genus) for Nuzlocke runs—without revealing any Pokémon names.

## Features

- Randomly selects 3 unique Pokémon and displays only their **category** (e.g., "Sea Weasel", "Sky High", "Starling")
- Optional filter by generation (Gen 1–9)
- Loading states, error handling, no Pokémon names in UI or API

## Tech Stack

- Next.js 14 (App Router)
- Serverless API routes
- PokéAPI for Pokémon data
- No TypeScript, no external UI libraries

## Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push the project to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New Project** and import your repo.
4. Leave build settings as default (Next.js auto-detected).
5. Click **Deploy**.

No environment variables are required.

## Deploy to Render (Node)

1. Create a new **Web Service** on [render.com](https://render.com).
2. Connect your Git repository.
3. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Deploy.

## API

### `GET /api/random-pokemon`

Returns 3 random Pokémon categories (genus only, no names).

**Optional query param:**

- `maxGeneration` – Include Pokémon from Gen 1 through N (1–9). Example: `/api/random-pokemon?maxGeneration=5` for Black/White pool.

**Response:**

```json
{
  "choices": [
    { "category": "Sea Weasel", "name": "buizel", "id": 418 },
    { "category": "Sky High", "name": "rayquaza", "id": 384 },
    { "category": "Starling", "name": "starly", "id": 396 }
  ]
}
```

## Project Structure

```
pokemon-scripts/
├── app/
│   ├── api/
│   │   └── random-pokemon/
│   │       └── route.js    # API route
│   ├── layout.js           # Root layout
│   └── page.js             # Homepage
├── next.config.js
├── package.json
└── README.md
```
