# Security Policy

## Supported versions

EUPHORIC LIVE is a client project maintained by Stackified. Only the latest version on the `main`
branch (what is deployed to GitHub Pages) is maintained.

| Version | Supported |
|---------|:---------:|
| Latest (`main`) | Yes |
| Older commits | No |

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Instead, use GitHub's private reporting:

1. Go to the [Security tab](https://github.com/stackified/euphoric/security).
2. Click **Report a vulnerability**.
3. Describe the issue, steps to reproduce, and potential impact.

You can expect an acknowledgement within a few days. Thank you for helping keep the project safe.

## Notes on this project

**Live site.** The deployed site is a static React build on GitHub Pages. It has no login, no
payments and no database of its own. Events and reviews are read from JSON files bundled with the
site. The only data it collects is what visitors type into the enquiry form, which is sent from the
browser through EmailJS to the client's inbox; nothing is stored by the site. EmailJS identifiers are
injected at build time from GitHub Actions secrets and are public by design, as is anything in a
`VITE_` variable. Cookie-banner preferences are kept in the visitor's `localStorage`.

**Backend (not deployed).** `backend/` contains an Express API that the live site does not currently
call. If it is deployed, its surface is:

- **Endpoints:** `GET /api/health`; `GET/POST /api/reviews` (POST rate limited to 5 per 15 minutes per
  IP); `GET/POST/PUT/DELETE /api/events`; `POST /api/enquiry` (rate limited to 10 per 15 minutes per IP).
  There is no authentication layer, so the event write routes would need one before going live.
- **Database:** MySQL through `mysql2` with parameterised queries. Tables `reviews`, `events` and
  `enquiries` are created on start. Enquiries store name, email, optional phone and message.
- **Email:** optional Nodemailer SMTP notification for each enquiry.
- **Caching:** optional Redis cache for event and review lists.
- **Hardening:** helmet with a Content Security Policy, CORS restricted to `FRONTEND_URL` (all origins
  when `NODE_ENV=development`), a 10 MB body limit, and `express-validator` input validation.
- **Environment variables:** `PORT`, `NODE_ENV`, `FRONTEND_URL`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`,
  `DB_NAME`, `DB_SSL`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `REDIS_ENABLED`,
  `REDIS_URL`. They are read from `backend/.env`, which is git-ignored. No secrets are committed.

The JavaScript and TypeScript code is scanned by CodeQL on every push.
