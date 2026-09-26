# Contributing to EUPHORIC LIVE

EUPHORIC LIVE is a client project. The code is owned by EUPHORIC LIVE and is designed, built and
maintained by the [Stackified](https://github.com/stackified) team. The repository is public for
portfolio purposes, so outside pull requests are not part of the normal workflow. Bug reports through
[issues](https://github.com/stackified/euphoric/issues) are welcome, and security problems should be
reported privately (see [SECURITY.md](SECURITY.md)).

The notes below are for members of the Stackified team working on the project.

## Getting set up

The repository is an npm workspace with two packages: `frontend/` (React + Vite) and `backend/`
(Express + MySQL). The live site only needs the frontend.

Requirements: Node.js 18 or newer (CI uses 18). MySQL is needed only if you run the backend.

**Large files:** the videos in `frontend/src/assets/` (`.MP4`, `.MOV`, `.mov`) are stored with Git LFS
and add up to several hundred MB. If you do not need them, clone without downloading them:

```bash
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/stackified/euphoric.git
```

1. Install dependencies from the repository root:
   ```bash
   npm install          # root + both workspaces
   # or: npm run install:all
   ```
2. Frontend only (what the live site runs):
   ```bash
   cd frontend
   npm run dev          # http://localhost:3000/euphoric/
   ```
   The enquiry form sends mail through EmailJS. Put `VITE_EMAILJS_SERVICE_ID`,
   `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY` in `frontend/.env` to test it.
3. Backend (optional): create a MySQL database, add `backend/.env` with `PORT`, `FRONTEND_URL`,
   `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (and optionally `EMAIL_*`, `REDIS_*`), then:
   ```bash
   cd backend
   npm run dev          # node --watch src/server.js, http://localhost:5000
   ```
   Tables are created automatically on start.
4. Or run both together from the root with `npm run dev` (uses `concurrently`).

## Useful commands

| Where | Command | What it does |
|-------|---------|--------------|
| root | `npm run dev` | Backend and frontend together |
| root | `npm run build:frontend` | Production build of the frontend |
| `frontend/` | `npm run build` | Vite build into `frontend/dist/` |
| `frontend/` | `npm run preview` | Serve the last build |
| `backend/` | `npm start` | Start the API without file watching |

There is no lint or test script in this project.

## Project structure

- `frontend/src/pages/` - route pages (Home, About, Services, Gallery, Events, Contact, Links, Enquiry; Videos and Feedbacks exist but are not routed)
- `frontend/src/components/` - shared UI (Navbar, Footer, Hero, previews, CookieBanner, loaders) and `videos/` (VideoGallery, VideoPlayer)
- `frontend/src/data/` - `events.json` and `reviews.json`, the content source for events and reviews
- `frontend/src/store/` - Redux Toolkit store (events, reviews, cookie preferences)
- `frontend/src/utils/` - `imageImports.js` (gallery) and `videoImports.js` (video list)
- `frontend/src/hooks/useEmailJS.js` - EmailJS wrapper used by the forms
- `backend/src/` - Express server, MySQL pool, routes and controllers for reviews, events and enquiries

## Branches and deployment

`main` is the only long-lived branch. Every push to `main` runs `.github/workflows/deploy.yml`, which
builds `frontend/` and deploys `frontend/dist/` to GitHub Pages
([stackified.github.io/euphoric](https://stackified.github.io/euphoric/)). The backend is not deployed
by any workflow.

Work on a short-lived branch such as `fix/short-description` or `feat/short-description`.

## Making changes

1. Keep changes focused. One feature or fix per pull request.
2. Match the existing style: React function components, Tailwind classes, Framer Motion for animation.
3. The app uses `HashRouter` and `base: "/euphoric/"`, so internal links must go through React Router.
4. Keep large media out of the regular Git history: videos belong in Git LFS (see `.gitattributes`),
   and new images should be compressed before they are added.
5. Run `npm run build` in `frontend/` and check the affected pages before opening a pull request.

## Pull requests

1. Push your branch and open a pull request against `main`.
2. Fill in the pull request template: what changed, why, and how you tested it.
3. Link any related issue (for example, `Closes #12`).

For security issues, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
