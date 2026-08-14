# ElRay Energy Website

Static site for ElRay Energy Ltd. No build step, no framework, no
dependencies, open the files and it works. Built to the brand system
defined in `ElRay_Brand_Guidelines.pdf` v1.0.

**Live site:** _add URL once deployed_
**Repo:** _add GitHub URL_

## Status

| Area | Status |
|---|---|
| Core pages (Home, How It Works, Services, About, Contact) | ✅ Built |
| Self-hosted Poppins | ✅ Done |
| Contact form → Formspree | ✅ Connected |
| WhatsApp links | ⚠️ Placeholder number — needs real number |
| Phone / email in Contact page | ⚠️ Placeholder — needs real details |
| Project gallery | ⏳ Not started — add once 2–3 real installs exist |
| Blog | ⏳ Not started — add once there's regular content |
| Favicon | ⚠️ Using raw PNG — works, not optimized |
| Image compression (about page hero) | ⚠️ Confirm `elray_asset7` is compressed before deploy |

## Project structure

elray-website/
├── index.html Home
├── how-it-works.html The 5-step audit process
├── services.html Residential / Commercial
├── about.html Founder story + image hero
├── contact.html Site survey booking form (→ Formspree)
├── css/
│ └── styles.css Design tokens, @font-face, all shared styles
├── js/
│ └── main.js Scroll reveal, active nav, form handling
├── fonts/ Self-hosted Poppins .ttf files
├── assets/ Logos + photography
└── README.md

Every page shares `css/styles.css` and `js/main.js`, edit either once,
it applies site-wide.

## Running locally

```bash
cd elray-website
python3 -m http.server 8000
```
Open `http://localhost:8000`. (Or use VS Code's Live Server extension, or
`npx serve elray-website`.)

## Design system

All tokens live in `:root` at the top of `css/styles.css`, locked to the
brand guide pdf:

```css
--cobalt:#1556A0;    /* primary */
--gold:#FFBF00;       /* accent - CTAs and energy moments only */
--navy:#151D2B;       /* dark surface anchor */
--teal:#16A085;       /* reserved - genuine sustainability moments only */
--charcoal:#1C2430;   /* body text */
--offwhite:#F6F8FB;   /* background surface */
--radius:10px;         /* corner radius - buttons, cards, chips, inputs */
```

**Typeface:** Poppins, self-hosted (no external font request). Font files
live in `fonts/`, loaded via `@font-face` at the top of `styles.css`:
- `Poppins-Regular.ttf` (400) - body text
- `Poppins-Medium.ttf` (500) - minor accents
- `Poppins-SemiBold.ttf` (600) - headings, buttons, the corner-bracket "tag" label
- `Poppins-Bold.ttf` (700) - reserved, lightly used

If a page renders in a system font instead of Poppins, check the browser
Network tab for a 404 on `fonts/Poppins-*.ttf`, usually a filename mismatch.

**Signature visual device:** the corner-bracket "inspection tag"
(`.tag` class), used on the hero, difference cards, and process steps to
reinforce the audit-first positioning. Reuse this rather than introducing
a new callout style.

**Cards:** `.serve-card`, `.diff-card`, `.form-card`, and `.audit-panel`
use rounded corners (`var(--radius)`) and a layered shadow for an elevated,
tactile feel, see `.serve-card` in `styles.css` for the reference shadow
stack (`box-shadow` with three layers: contact shadow, mid shadow, ambient
shadow), which lifts further on hover.

## Contact form

The survey form on `contact.html` submits to **Formspree**
(`action="https://formspree.io/f/xxxxxxxx"` on the `<form>` tag). Submissions
land in the Formspree dashboard / connected inbox, no backend required.

If Formspree's free tier (50 submissions/month) gets tight, or you want
submissions stored in your own database, that's the point to build a small
backend (Node/Express or a serverless function), not before.

## WhatsApp

Buttons pointing to WhatsApp use the format:
https://wa.me/234XXXXXXXXXX

Replace `234XXXXXXXXXX` with the real ElRay number, in every place this
link appears (Home, How It Works, Contact).

## Deploying

No build step, so any static host works:

- **Netlify / Vercel** drag-and-drop the folder, or connect the GitHub
  repo for auto-deploy on every push to `main`.
- **GitHub Pages** enable Pages in repo settings, point at root.

Recommended flow once this repo is pushed: connect Netlify or Vercel
directly to the GitHub repo so every `git push` auto-deploys, avoids
manually re-uploading files after every edit.
