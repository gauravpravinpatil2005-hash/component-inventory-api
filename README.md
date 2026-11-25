# Electronic Component Inventory API

RESTful API (Node.js, Express, MongoDB, Mongoose) - Practical No. 06.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` (set `MONGODB_URI`)
3. `npm run dev`  ->  http://localhost:5000/api/health

## Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/components | Create component |
| GET | /api/components | List all |
| GET | /api/components/:id | Get one |
| PUT | /api/components/:id | Update |
| DELETE | /api/components/:id | Delete |
| GET | /api/health | Health check |

Import `postman_collection.json` into Postman (change `baseUrl` to the deployed URL for deployed testing).

## Deploy (Render + MongoDB Atlas)
1. Create a free MongoDB Atlas cluster, add a database user, allow network access 0.0.0.0/0, copy the connection string.
2. Push this folder to GitHub (`.env` is git-ignored).
3. On render.com: New > Web Service > connect the repo. Build: `npm install`, Start: `npm start`.
4. Add environment variable `MONGODB_URI` = your Atlas connection string.
5. Open `https://<your-service>.onrender.com/api/health`.
