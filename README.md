# Masterlist-EGM — Step 2 (Google Sheets Live)

A complete, production-ready build that fetches machine data **live from Google Sheets** via a serverless API on Vercel, with a **local JSON fallback** so the app always works.

## Features
- Live data via `/api/machines` (Google Sheets)
- Fallback to `public/machines.json` if the API fails
- Search, filters (location/status), pagination
- Machine detail route `/machine/:id`
- Admin panel with login (default `admin` / `admin123`) + change password (localStorage)
- Light/Dark theme toggle
- SPA routing fixed for Vercel via `.vercel.json`

## Environment Variables (Vercel → Project Settings → Environment Variables)
- `GOOGLE_SERVICE_KEY` → base64 of your service account JSON
- `SHEET_ID` → your Google Sheet ID

## Local Dev
```bash
npm install
npm run dev
```
Open the local URL (e.g. http://localhost:5173).

## Deploy (Vercel)
- Framework: **Vite**
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

## Adjusting the Sheet Columns
Update the `range` in `api/machines.js` and the mapping of columns to fields.
