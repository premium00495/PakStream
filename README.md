# PakStream - Key / Access Code Portal (GitHub + Vercel ready)

## What's included
- Express backend (server.js)
- public/index.html — user access page
- public/admin.html — simple admin dashboard (adminKey required)
- data/keys.json — initial adminKey & sample access codes
- package.json, .gitignore

## Quick local run
1. `npm install`
2. Edit `data/keys.json` and change `adminKey` to a strong secret.
3. `npm start`
4. Open `http://localhost:3000`

## Deploy to Vercel (recommended)
1. Push this repo to GitHub.
2. Sign in to Vercel and import the GitHub repo.
3. Set any environment variables if needed; Vercel will run `npm start`.
4. Visit your deployed URL.

## Notes
- This is a simple starter project. For production: use a proper database, HTTPS, and stronger admin auth.
