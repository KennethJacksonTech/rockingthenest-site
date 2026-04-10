# Rocking The Nest — CLAUDE.md

## Overview
- **Domain**: rockingthenest.com
- **Business**: Empty nester lifestyle & travel blog
- **Owners**: Maggie & Brad Grice
- **Email**: bradandmaggiegrice@gmail.com
- **Type**: Travel, Disney, concerts, beach, running, family
- **Tagline**: "Getting older is inevitable — being old is not!"

## Stack
- Next.js 16.2.2, React 19.2.4, TypeScript 5, Tailwind CSS 4
- Static export — ~15 static pages (4 routes + 10 blog posts + SSG)
- Fonts: Josefin Sans (headings) + Nunito (body) via next/font
- Blog data: Hardcoded in `src/data/posts.ts` (HTML content, not markdown)

## Routes
| Route | Description |
|-------|-------------|
| `/` | Hero, latest 3 posts, about teaser, category pills |
| `/blog/` | Category filter, 2-column post grid |
| `/blog/[slug]/` | 10 posts — SSG via generateStaticParams |
| `/about/` | Story + fun facts grid + sign-off |
| `/contact/` | Contact form + info card |

## Design System — "Rocking"
```css
:root {
  --surface-primary: #FFF9F0;    /* Warm cream — page bg */
  --surface-secondary: #F0E6D6;  /* Warm sand — alt sections */
  --surface-inverse: #1B4D5C;    /* Dark teal — nav, footer, heroes */
  --accent-primary: #E8825E;     /* Coral/salmon — buttons, CTAs */
  --accent-secondary: #4AADA6;   /* Teal — category pills, active nav */
  --text-primary: #2C3E3A;       /* Dark forest — body text */
  --text-light: #FFFFFF;         /* White — on dark backgrounds */
  --text-muted: #6B7B76;         /* Muted — secondary text */
}
```

## Anti-Patterns
- NO blue anywhere
- NO auto-push to git
- Teal (#4AADA6) is NOT blue — it's green-leaning

## Footer
"Made in Amarillo, Texas by KennethJackson.Tech" (linked)

## Known Issues
- Default favicon.ico needs deletion (icon.svg replaces it)
- Blog post [slug] uses old sync params pattern
- WordPress still live at rockingthenest.com
- ContactForm submission method needs verification
- san-antonio-concert-weekend uses placeholder hero image (needs real photo)

## Session Log
- 2026-04-09: Della audit — SEO files, OG metadata, footer fix, trailingSlash, docs created, Gonzo/LCARS updated
- 2026-04-09: Blog migration — san-antonio-concert-weekend added from WordPress. 10 posts total. Gonzo: 8 categories + 10 posts created. Code prompt updated.
