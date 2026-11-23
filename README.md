# IT Support Desk API — ICT251 Activity 7

## Stack
Node.js, Express, PostgreSQL (`pg`), dotenv and cors.

## 1. Install
Open PowerShell in this folder:
```powershell
npm install
```
If PowerShell blocks npm.ps1, use `npm.cmd install`.

## 2. Configure PostgreSQL
Create a PostgreSQL database (for example `it_support_desk`). Copy `.env.example` to `.env` and set `DATABASE_URL` to your actual PostgreSQL connection URL. Never upload `.env` or share its password.

## 3. Create table and sample data
Run `schema.sql` and then `seed.sql` using pgAdmin Query Tool or `psql`. The seed inserts eight made-up records only when the table is empty.

## 4. Start
```powershell
npm start
```
Open `http://localhost:3000/` for the API guide.

## Required routes
| Method | Route | Purpose |
|---|---|---|
| GET | `/` | API guide |
| GET | `/health` | Database health |
| GET | `/api/records` | All records |
| GET | `/api/records/:id` | One record |
| POST | `/api/records` | Create |
| PUT | `/api/records/:id` | Replace all four editable fields |
| DELETE | `/api/records/:id` | Delete |

## POST/PUT body
Do not send `id`; PostgreSQL generates it. All four fields are required:
```json
{
  "title": "Unable to connect to campus Wi-Fi",
  "category": "Network",
  "description": "My laptop cannot connect to the campus wireless network.",
  "status": "Pending"
}
```
Validation: title 3–80 chars; category 2–40; description 5–300; status exactly `Pending`, `In progress`, or `Completed`. Leading/trailing spaces are trimmed.

## Postman tests
Use base URL `http://localhost:3000`.
1. GET `/health` → 200.
2. GET `/api/records` → 200 array.
3. POST `/api/records` with the JSON above → 201; note returned ID.
4. GET `/api/records/ID` → 200.
5. PUT `/api/records/ID` with all four fields → 200 and same ID.
6. DELETE `/api/records/ID` → 200 and `{"message":"Record deleted."}`.
7. GET `/api/records/ID` → 404.
8. POST invalid data, such as title `"A"` → 400.
For POST/PUT choose Body → raw → JSON in Postman.

## Render deployment
1. Push this folder to GitHub, including `package.json` and `package-lock.json`; exclude `.env` and `node_modules`.
2. Create a hosted PostgreSQL database on Render or a lecturer-approved provider.
3. Create a Render Web Service from the repository. Set Root Directory to this folder if needed.
4. Build command: `npm install`; Start command: `npm start`.
5. Set environment variables: `DATABASE_URL` (hosted DB URL), `NODE_ENV=production`, and optionally `CLIENT_ORIGINS` (your Activity 6 Netlify URL).
6. Run `schema.sql` and `seed.sql` against the hosted database.
7. Open your service URL, check `/health`, then repeat CRUD tests against the live URL.

Render free services may sleep when idle. First request can take time. Use a hosted database rather than the service's temporary local filesystem so records persist.

## Before submission
Replace `REPLACE WITH YOUR STUDENT NUMBER` in `server.js` with your student number. Verify the guide, health route and all CRUD routes on the deployed service.
