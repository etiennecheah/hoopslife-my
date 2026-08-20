# Hoops Life: The Climb — Deployment Package

This is a complete, ready-to-deploy React project. Everything is written and
configured — the only thing left is letting a machine with internet access
(yours, or a hosting provider's build server) install the packages and
publish it. I can't do that one step myself: my environment has no internet
access at all, so I can't run `npm install`, and I'm not able to create
accounts or log into hosting services on your behalf even if I could reach
them.

Here are your two paths — pick whichever feels easier.

---

## Path A — Zero commands, ~3 minutes (recommended)

This lets Vercel (or Netlify) do the actual building for you. You never
touch a terminal.

1. Create a free account at **vercel.com** (sign in with GitHub, Google, or
   email — no credit card needed for this).
2. Create a new, empty repository on **github.com** (call it whatever you
   like, e.g. `hoops-life`).
3. Upload every file in this folder to that repository. GitHub's web
   interface lets you drag-and-drop files directly — no git commands
   required. (Keep the folder structure exactly as-is: `src/` stays a
   subfolder, etc.)
4. In Vercel, click **"Add New Project"** → **"Import"** your new GitHub
   repo. Vercel will auto-detect it's a Vite project and fill in the build
   settings correctly on its own.
5. Click **Deploy**. In about a minute you'll get a live URL like
   `hoops-life.vercel.app`.
6. Whenever you want to update the game later, just upload new files to the
   same GitHub repo — Vercel automatically rebuilds and redeploys.

## Path B — A few terminal commands, if you have Node.js installed

If you're comfortable with a terminal and have Node.js (18+) on your
computer:

```bash
cd hoops-life-deploy     # this folder
npm install              # downloads the packages (needs internet)
npm run build            # produces a dist/ folder — this is your whole game
npm run preview           # optional: test it locally first at localhost
```

The `dist/` folder that comes out is a complete static website — just HTML,
CSS, and JS files with zero server requirements. You can drag that `dist/`
folder straight onto **netlify.com** ("Deploy manually" / drag-and-drop —
no account even required for a one-off deploy, though you'll want an
account to keep the site alive long-term and add a custom domain later).

---

## Connecting your domain (once you've bought one)

Both Vercel and Netlify have a "Domains" tab in the project settings where
you paste in your domain name — they'll give you either an A record or a
CNAME to add at your registrar (wherever you bought the domain). It usually
takes a few minutes to a few hours to propagate. Both platforms also issue
a free HTTPS certificate automatically — nothing to configure.

---

## What was changed to make this deployable

The original file was built for Claude.ai's Artifacts feature, which
provides a special `window.storage` API for saving progress — that API
only exists inside Claude's own runtime. I replaced it with a version that
uses `window.storage` when available (so it still works fine as a Claude.ai
artifact) and automatically falls back to standard browser `localStorage`
everywhere else — which is what makes it work once deployed as a normal
webpage. No other game logic was touched.

## Project structure

```
hoops-life-deploy/
├── index.html          # page shell
├── package.json         # dependencies (react, react-dom, lucide-react, vite, tailwind)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx          # React entry point
    ├── index.css         # Tailwind
    └── App.jsx           # the entire game (unchanged except the storage fix)
```
