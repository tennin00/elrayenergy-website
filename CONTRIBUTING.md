# Contributing to the ElRay Energy site

Quick reference for making changes to this repo. Static site, no build
step — if it works when you open it locally, it'll work deployed.

## Before you start

```bash
git pull
python3 -m http.server 8000   # then open localhost:8000
```

## Branching & commits

For solo work, committing straight to `main` is fine. If you're testing
something risky (a layout change, a new section), branch first:

```bash
git checkout -b update-services-page
# ...make changes, test locally...
git add .
git commit -m "Add pricing note to services page"
git push -u origin update-services-page
```

Then merge into `main` once you've checked it in the browser.

**Commit messages** - short, plain, present tense. What changed, not why:
- `Fix WhatsApp link on contact page`
- `Round corners on serve-card`
- `Add eco-note to about page`

## Where things live

| Want to change... | Edit here |
|---|---|
| A colour, the corner radius, or a font weight | `css/styles.css` → `:root` block at the top |
| Layout/style of a specific component (cards, buttons, nav) | The matching section in `css/styles.css` — sections are labeled with comments |
| Page content/copy | The relevant `.html` file directly |
| Scroll animation, form behaviour | `js/main.js` |
| Logos, photos | `assets/` |

Don't duplicate a style into a new one-off `<style>` block in an HTML
file — if it's shared logic, it belongs in `styles.css` so every page
stays in sync.

## Brand rules (non-negotiable without updating the brand guide too)

- Colours and the typeface are locked to `ElRay_Brand_Guidelines.pdf`
  v1.0. Don't introduce a new colour or font — reuse a `:root` token.
- **Gold** (`--gold`) is for CTAs and small energy accents only — never a
  background fill or body text colour.
- **Teal** (`--teal`) is reserved for genuine sustainability moments —
  don't reach for it as a generic accent colour.
- The corner-bracket "tag" component (`.tag`) is the site's signature
  device — reuse it for callouts rather than inventing a new label style.

## Before pushing anything you'd call "done"

- [ ] Checked in the browser at both mobile width (~375px) and desktop
- [ ] No leftover placeholder text, phone numbers, or `#` links
- [ ] New images are compressed (resize to actual display size, JPEG/WebP,
      not a multi-MB original straight from upload)
- [ ] No `console.log` or test code left in `js/main.js`

## Questions about a change you're not sure fits the brand or the plan

Check `README.md` first (status table + "what's deliberately not built
yet" section), a few things (gallery, blog, pricing calculator) are
intentionally excluded for now, not forgotten.
