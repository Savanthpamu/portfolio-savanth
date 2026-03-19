# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a portfolio website with two separate Node.js packages:

- **`client/`** — React 18 + Vite SPA. Single-page layout with no client-side routing; all sections are rendered as a vertical stack in `App.jsx` and navigated via anchor links.
- **`server/`** — Express API with a single functional endpoint: `POST /api/contact`, which sends two emails via Gmail SMTP using nodemailer (one to the portfolio owner, one auto-reply to the sender). Both packages use ESM (`"type": "module"`).

The client's contact form POSTs to `http://localhost:5005/api/contact` (hardcoded in `client/src/components/Contact.jsx`). The server reads Gmail credentials from a `.env` file in `server/`.

## Commands

All commands run from `client/` unless noted.

**Client:**
```bash
cd client
npm run dev          # Vite dev server (frontend only)
npm run build        # Production build to client/dist/
npm run lint         # ESLint on .js/.jsx files
npm run preview      # Preview production build locally
```

**Server:**
```bash
cd server
npm run dev          # nodemon (auto-restart on change)
npm start            # node index.js (no auto-restart)
```

**Both together (from `client/`):**
```bash
npm run dev:full     # concurrently runs server + Vite dev server
```

## Environment Setup

Create `server/.env`:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5005            # optional, defaults to 5005
```

Gmail requires an App Password (not the account password) when 2FA is enabled.

## Key Details

- Animations use **Framer Motion** throughout; scroll-triggered reveals use `react-intersection-observer`.
- Styling is **Tailwind CSS** with no custom theme extensions (`tailwind.config.js` has an empty `extend: {}`).
- There are no tests in this project.
- The server has its own `node_modules` — install dependencies separately in both `client/` and `server/`.
