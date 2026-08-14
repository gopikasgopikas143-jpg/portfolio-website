# Gopika Sathishbabu — Portfolio

A premium, cinematic, animated developer portfolio built with plain HTML5, CSS3, and vanilla JavaScript (+ GSAP, GSAP ScrollTrigger, GSAP Flip, and Lenis via CDN).

## How to view it

Just open `index.html` in a browser. No build step, no install.

For local development with a proper server (recommended so relative paths behave identically to production), run one of:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then visit `http://localhost:8080`.

## File structure

```
index.html

/css/
  tokens.css          → design system: colors, type scale, spacing, easing
  style.css            → loader, custom cursor, nav, hero
  sections.css         → about, skills
  projects.css         → project cards + fullscreen case-study transition
  freelance.css        → freelance client showcase
  certificates.css     → certificate archive, category expansion, shared lightbox
  achievements-contact-footer.css
  responsive.css       → all breakpoint overrides (loaded last, deliberately)

/js/
  cursor.js             → custom cursor (desktop only)
  main.js               → Lenis smooth scroll, nav state, mobile menu, anchor links
  lightbox.js            → shared fullscreen viewer (used by certificates + achievements)
  skills.js               → tech stack tabs + chips
  projects.js             → Selected Projects data + card→detail Flip transition
  freelance.js             → Freelance Works data + drag-to-scroll
  certificates.js           → 8 certificate categories + expanded category view
  achievements.js            → achievements gallery
  contact.js                 → copy-email + back-to-top interactions
  animations.js               → loader sequence, hero entrance, scroll reveals, magnetic buttons

/assets/
  images/         (empty — drop real project/site imagery here)
  certificates/   (empty — organize by category folder, e.g. /workshops/)
  achievements/   (empty — drop real award/event photos here)
```

## What's real vs. placeholder

Every animation, transition, and interaction in this build is fully functional:
loader → hero handoff, kinetic type reveals, magnetic buttons, the custom cursor,
scroll-triggered reveals, the project card → fullscreen case-study Flip transition,
the certificate category → document grid transition, and the shared lightbox viewer
all work end to end right now.

What's **not** real is specific content that wasn't supplied — actual resume detail,
project screenshots, the J-Square live URL, freelance client names, certificate
files, and achievement photos. Per the brief's own rule ("do not invent
companies/clients/stats/technologies"), every one of those spots is marked
`[CONTENT NEEDED]` in the rendered page and in the relevant `.js` file, rather than
filled with invented specifics.

### Where to add real content

| Section | File | What to change |
|---|---|---|
| About bio | `index.html` (`#about`) | Replace the `<em>[CONTENT NEEDED...]</em>` sentence and the "Continuous Learning" line |
| Skills | `js/skills.js` | Edit `skillsData` — add/remove chips, set `usedIn` per chip if accurate |
| J-Square / AI Question Paper Generator | `js/projects.js` | Edit `projectsData` — summary, tech, role, liveUrl, overview/problem/solution/features |
| Freelance clients | `js/freelance.js` | Edit `freelanceData` — add one object per client; delete the two placeholder entries |
| Certificates | `js/certificates.js` | Fill each category's `docs: []` array with `{ title, org, date, src }`; rename categories if your real folder names differ |
| Achievements | `js/achievements.js` | Edit `achievementsData` — add `src` (image path), `title`, `year`, `description` per item |
| Contact | `index.html` (`#contact`) | Set the real email in `data-copy-email`, the `mailto:` href, and GitHub/LinkedIn URLs |

Once real images are added under `/assets/`, set each item's `src` field in the
matching `.js` file — the lightbox and thumbnails already know how to render an
image when `src` is present, and fall back to a labeled placeholder block when it
isn't.

## Notes

- Respects `prefers-reduced-motion` throughout (loader, hero, scroll reveals, marquee).
- Custom cursor and magnetic hover effects are automatically disabled on touch devices.
- Keyboard support: Escape closes the project detail view, certificate category
  view, and lightbox; Arrow Left/Right navigate the lightbox.
- All animation libraries load from CDN (cdnjs / unpkg) — an internet connection
  is required for the full experience.
