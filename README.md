# Onetechmated Solutions — Portfolio

Production-ready single-page portfolio for **Onetechmated Solutions**, a technology
company bridging **enterprise IT/Software** and **Industrial Automation (OT)**.

Built with **Vite + React + TypeScript + Tailwind CSS**, animated with **Framer Motion**,
**GSAP**, and **Lenis** smooth scroll, and fully internationalized in **7 languages**
(English, Arabic with RTL, French, Spanish, Russian, Italian, German).

## Tech stack

| Concern        | Library |
| -------------- | ------- |
| Build / dev    | Vite 8 |
| UI             | React 19 + TypeScript |
| Styling        | Tailwind CSS 3 (`tailwindcss-rtl`) |
| Animation      | Framer Motion, GSAP + ScrollTrigger |
| Smooth scroll  | Lenis |
| i18n           | i18next + react-i18next + language detector |
| Icons          | lucide-react |

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck (tsc) + production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
├── components/        # Navbar, Hero, About, Services, CaseStudies, Contact, Footer
│   └── ui/            # SectionLabel, GlassCard, AnimatedSection, LanguageSwitcher, Counter, Logo
├── hooks/             # useScrollProgress, useDirection
├── i18n/              # i18next init + 7 locale JSON files
├── lib/animations.ts  # shared Framer Motion variants
├── App.tsx            # Lenis + GSAP wiring, section layout
├── main.tsx           # entry — imports i18n before render
└── index.css          # global styles, CSS variables, dot grid, RTL rules
```

## Internationalization

- Language is detected from `localStorage` (`otm-lang`) then the browser, falling back to English.
- Selecting a language updates `i18n`, persists to `localStorage`, and sets
  `document.documentElement.lang` / `dir`. Arabic switches the layout to RTL and the
  font to **Noto Sans Arabic**.
- All display strings live in `src/i18n/locales/*.json` — no hardcoded copy in components.

## Configuration notes

- **Contact form**: posts to a Formspree endpoint placeholder in
  `src/components/Contact.tsx` — replace `FORMSPREE_ENDPOINT` with your real form ID.
  If the request fails, it falls back to a prefilled `mailto:` so no message is lost.
- **Reduced motion**: all heavy animations (Lenis, GSAP counters) are skipped when the
  user prefers reduced motion.

## Deployment (Vercel)

The app is a static SPA. `vercel.json` rewrites all routes to `/` for client-side
handling. Import the repo into Vercel and deploy with the default Vite preset
(`npm run build`, output `dist/`).
