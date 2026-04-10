# Rocking The Nest — Site Documentation

## Client

- **Name**: Maggie & Brad Grice
- **Business**: Rocking The Nest (empty nester lifestyle & travel blog)
- **Email**: bradandmaggiegrice@gmail.com
- **Site Email (Maggie)**: maggie@rockingthenest.com
- **Site Email (Brad)**: brad@rockingthenest.com
- **Domain**: rockingthenest.com

## Brand Personality

Fun, energetic, adventurous. Two empty nesters refusing to slow down — travel, Disney, concerts, beach, running, family. Tagline: "Getting older is inevitable — being old is not!" Warm tones with teal accents. No blue anywhere.

## Stack

- **Framework**: Next.js 16.2.2
- **React**: 19.2.4
- **TypeScript**: 5
- **Tailwind CSS**: 4 (via @tailwindcss/postcss)
- **Output**: Static export (`output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`)
- **Fonts**: Google Fonts via next/font (Josefin Sans headings, Nunito body)

## Pages

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Hero with photo overlay, latest 3 posts, about teaser, category pills |
| `/blog/` | Static (client) | Category filter pills, 2-column post grid. Client component with useState. |
| `/blog/[slug]/` | SSG (10 posts) | Hero with post image, prose content, prev/next navigation, back-to-blog |
| `/about/` | Static | Photo + story, fun facts grid (7 items with emojis), sign-off |
| `/contact/` | Static | Contact form + info card with emails and photo |

### Site-Wide Elements

- **Navigation**: Sticky, dark teal bg, logo text, 4 nav links, scroll blur effect, mobile hamburger
- **Footer**: 3-column (brand, quick links, contact), bottom bar with copyright + KennethJackson.Tech attribution

## Components

| Component | Path | Description |
|-----------|------|-------------|
| Navigation | `src/components/Navigation.tsx` | Sticky nav, scroll effect, active state border, mobile drawer. Client component. |
| Footer | `src/components/Footer.tsx` | 3-column footer + copyright bar with KennethJackson.Tech link. Server component. |
| PostCard | `src/components/PostCard.tsx` | Blog post card with image, categories, title, excerpt, read more link. |
| CategoryPill | `src/components/CategoryPill.tsx` | Clickable category filter pill for blog page. |
| ContactForm | `src/components/ContactForm.tsx` | Name/Email/Message form. |

## Data

- **Posts**: Hardcoded in `src/data/posts.ts` — 10 posts with HTML content, not markdown files
- **Categories**: Travel, Disney, Beach, Running, Family, Florida, Cruising, Concerts
- **Images**: `public/images/` — 11 JPG files (travel photos, Disney cruise shots)

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| surface-primary | #FFF9F0 | Page background (warm cream) |
| surface-secondary | #F0E6D6 | Alternate section bg (warm sand) |
| surface-inverse | #1B4D5C | Nav, footer, hero overlays (dark teal) |
| accent-primary | #E8825E | Buttons, CTAs, links (warm coral/salmon) |
| accent-secondary | #4AADA6 | Category pills, active nav (teal) |
| text-primary | #2C3E3A | Body text (dark forest) |
| text-light | #FFFFFF | Text on dark backgrounds |
| text-muted | #6B7B76 | Secondary text, metadata |
| border-light | #E0D5C5 | Light borders |
| border-dark | #164350 | Dark borders (footer dividers) |

**No blue. Teal (#4AADA6) is the closest — it's green-leaning, not blue.**

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 Hero | Josefin Sans | 700 | 2.5rem → 3.5rem |
| H2 Section | Josefin Sans | 600 | 2rem |
| Body | Nunito | 400 | 16px, line-height 1.7 |
| Nav Link | Josefin Sans | 600 | 0.9375rem, uppercase |
| Button | Josefin Sans | 600 | 0.9375rem, uppercase |

### Gradients

- **Hero**: `linear-gradient(135deg, #1B4D5C 0%, #164350 60%, #0F2F3A 100%)`
- **Warm**: `linear-gradient(135deg, #FFF9F0 0%, #F0E6D6 100%)`
- **Sunset**: `linear-gradient(135deg, #E8825E 0%, #D4694A 100%)`

## SEO

### Title Pattern

- Home: "Rocking The Nest — Adventures in Empty Nesting"
- Blog posts: "{Post Title} — Rocking The Nest"
- Contact: "Contact | Rocking the Nest"

### Open Graph

- `metadataBase`: `https://www.rockingthenest.com`
- OG title, description, url, siteName, locale (en_US), type (website) — set in root layout.tsx

### SEO Files

- `src/app/sitemap.ts` — Dynamic sitemap (4 static routes + 10 blog post URLs). Has `export const dynamic = "force-static"`.
- `src/app/robots.ts` — Standard crawler rules + sitemap ref. Has `export const dynamic = "force-static"`.
- `src/app/icon.svg` — Dark teal #1B4D5C background with coral "R" in #E8825E.

## Deployment

- **GitHub Repo**: KennethJacksonTech/rockingthenest-site (main branch)
- **Vercel Project**: rockingthenest-site (prj_R6ZKyuNNn8QVV5hbaoI9ZNxWX3AF)
- **Vercel Preview**: rockingthenest-site.vercel.app
- **Node Version**: 24.x
- **Domain**: rockingthenest.com
- **Registrar**: GoDaddy
- **DNS**: Cloudflare (active)
- **Custom Domain**: NOT yet configured on Vercel — needs A record → 76.76.21.21 + CNAME www → cname.vercel-dns.com

## Known Issues

- **favicon.ico**: Default Next.js favicon still present. Delete after icon.svg is confirmed working.
- **Blog post params**: `[slug]/page.tsx` uses synchronous `params` — may need async update for Next.js 16.
- **Forms**: ContactForm submission method needs verification (Formspree or mailto fallback).
- **WordPress**: rockingthenest.com still points to old WordPress site. DNS cutover pending.
- **Placeholder hero**: san-antonio-concert-weekend uses placeholder hero image (triggers gradient fallback). Needs real photo.

## Session Log

- 2026-04-09: Della audit — added sitemap.ts, robots.ts, icon.svg, OG metadata, trailingSlash. Footer attribution linked + dynamic year. Gonzo customer name updated. LCARS domain notes updated.
- 2026-04-09: Blog migration — san-antonio-concert-weekend added from WordPress (10 posts total). Gonzo: 8 categories + 10 posts seeded. Code prompt updated.
