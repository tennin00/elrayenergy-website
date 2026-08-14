# ElRay Energy — Website

Static site, no build step, no framework. Open it and it works. This is
meant to be easy to run locally and easy to hand to any host.

## Project structure

```
elray-website/
├── index.html          Home
├── how-it-works.html   The 5-step audit process
├── services.html       Residential / Commercial
├── about.html          Founder story
├── contact.html        Site survey booking form
├── css/
│   └── styles.css      All shared styles — colours, type, components
├── js/
│   └── main.js         Scroll reveal, active nav link, form handler
├── assets/              Logo files (copied from your brand kit)
│   ├── elray_horizontal-logo_color.png
│   ├── elray_horizontal-logo_white.png
│   ├── elray_icon_color.png
│   └── elray_vertical-logo_color.png
└── README.md            You are here
```

Every page shares the same `css/styles.css` and `js/main.js` — edit either
file once and it updates across the whole site.

## Running it locally

No install needed to just look at it — double-click `index.html` and it'll
open in your browser. But for the contact form and relative links to behave
exactly like they will in production, serve it over a local server instead
of opening the file directly:

**Option A — Python (already on most machines):**
```bash
cd elray-website
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — Node, if you have it:**
```bash
npx serve elray-website
```

**Option C — VS Code:**
Install the "Live Server" extension, right-click `index.html`, choose
"Open with Live Server."

## Things to fill in before this goes live

These are placeholders — search for them and replace:

- `contact.html` — the phone number `+234 XXX XXX XXXX` and email
  `hello@elrayenergy.com` are placeholders. Update in `contact.html`.
- `index.html` and `how-it-works.html` — the "WhatsApp Us" button currently
  links to `#`. Point it to `https://wa.me/234XXXXXXXXXX` once you have a
  WhatsApp Business number.
- Favicon — currently using the colour icon PNG directly, which works but
  isn't optimized. If you want a crisp favicon, generate a proper
  `favicon.ico` / multi-size set from `elray_icon_color.png` (e.g. via
  realfavicongenerator.net) and update the `<link rel="icon">` tag on every
  page.

## Wiring up the contact form

Right now `contact.html`'s form doesn't send anywhere — it just shows an
alert (see `handleSubmit` in `js/main.js`). Since this is a static site with
no backend, you have a few realistic options, roughly in order of how fast
they are to set up:

1. **A form service (fastest).** Formspree, Getform, or similar — you sign
   up, get an endpoint URL, and point the `<form>` tag's `action` at it.
   No backend code required. Good starting point while you're pre-revenue.
2. **A WhatsApp deep link.** Skip the form entirely, or use it to build a
   pre-filled WhatsApp message: `https://wa.me/234XXXXXXXXXX?text=...` —
   fits how a lot of Nigerian SMBs actually want to be contacted.
3. **A real backend later.** Once there's a reason to store leads in a
   database instead of just receiving them, you'd add a small backend
   (Node/Express, or a serverless function on Vercel/Netlify) that the form
   posts to.

## Deploying

Because there's no build step, any static host works. Simplest options:

- **Netlify / Vercel** — drag-and-drop the `elray-website` folder in their
  dashboard, or connect a GitHub repo for auto-deploys on push.
- **GitHub Pages** — push this folder to a repo, enable Pages in repo
  settings, pointed at the root or a `docs/` folder.

## Editing the brand system

All colour and type tokens live at the top of `css/styles.css` in the
`:root` block. They're locked to `ElRay_Brand_Guidelines.pdf` v1.0 — if the
brand guide changes, update the values there and the whole site follows:

```css
--cobalt:#1556A0;    /* primary */
--gold:#FFBF00;       /* accent — CTAs and energy moments only */
--navy:#151D2B;       /* dark surface anchor */
--teal:#16A085;       /* reserved — sustainability moments only */
--charcoal:#1C2430;   /* body text */
--offwhite:#F6F8FB;   /* background surface */
```

Typeface is Poppins, loaded from Google Fonts in each page's `<head>`. If
you'd rather self-host the font (faster load, no external request), download
the Poppins files and swap the `<link>` tags for a local `@font-face` rule.

## What's deliberately not built yet

Per the site plan, these are left out until there's real content to put in
them — adding them empty would hurt credibility more than help:

- **Project gallery** — add once you have 2–3 completed installs to show.
- **Blog** — add once you have something worth publishing regularly.
- **Pricing calculator** — deliberately excluded; it conflicts with the
  "no generic estimate" positioning the whole site is built around.

## Browser support / accessibility notes

- Responsive from ~360px mobile up through desktop.
- All interactive elements have a visible focus state (`:focus-visible`,
  gold outline) for keyboard navigation.
- Scroll animations respect `prefers-reduced-motion` — if a visitor has
  that OS setting on, content appears immediately instead of animating in.
- Semantic HTML throughout (`header`, `main`, `footer`, proper heading
  order) — should read reasonably with a screen reader as-is, but worth a
  manual pass once real content (like actual photos) is added.
