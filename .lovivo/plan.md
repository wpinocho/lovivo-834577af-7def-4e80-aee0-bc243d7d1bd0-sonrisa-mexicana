# Smilo — Cepillo Eléctrico para México 🇲🇽

## Current State
Fully built DTC eCommerce brand for Mexico. Clean, minimal, premium. Funda de Viaje removed from navigation and footer. Brand renamed from SONIQ to **Smilo**. New dentist distribution landing page live at `/dentistas`. **Color palette updated to MyVariations-inspired blue + pink.** **Real Smilo logo image integrated (black wordmark with smile arc).** **ProfileMenu (iniciar sesión) removed from header.** **Color variant names translated to Mexican Spanish.** **PDP color selector updated to circular swatches with poetic Spanish names.** **Promo bar + scrolling social proof bar added above header site-wide.** **PDP body expanded with 4 new full-width sections below the 2-col grid.**

## Brand
- **Name**: Smilo
- **Tagline**: Tu boca. Reimaginada.
- **Market**: Mexico 🇲🇽
- **Language**: Mexican Spanish
- **Tone**: Young, fresh, confident. Premium but accessible. Apple-style simplicity.
- **Colors**: Cornflower blue accent + Hot pink CTAs + White background + Dark navy text. Inter font.
- **Palette inspiration**: myvariations.com — clean, clinical, fresh aesthetic
- **Logo**: Black serif wordmark "Smilo" with smile arc underneath — mix-blend-mode: multiply to remove white background

## Color Tokens (UPDATED 2026-07-17)
- `--primary`: `335 85% 55%` — Hot pink/magenta (main CTA buttons)
- `--accent`: `220 68% 52%` — Cornflower blue (hero, highlights, icons)
- `--spark`: `335 85% 55%` — Same hot pink (energy, CTAs, promo bar bg)
- `--candy`: `145 55% 45%` — Mint green (success checks, positive signals)
- `--background`: `0 0% 100%` — Pure white
- `--foreground`: `220 15% 8%` — Dark navy text
- Gradient utilities:
  - `.bg-hero-gradient` — Blue gradient (220 72% 36% → 220 68% 52% → 215 65% 60%)
  - `.bg-warm-gradient` — Hot pink gradient (335 85% 50% → 340 80% 62%)
  - `.bg-candy-gradient` — Light blue/pink pastel gradient
  - `.bg-dark-gradient` — Deep blue gradient

## Products Created
| Product | Price | ID |
|---------|-------|-----|
| Cepillo Eléctrico Smilo | $899 MXN | 17cb3fa5-74ae-4cf7-aa6f-24bc279aec06 |
| Cabezales de Repuesto (Pack 3) | $249 MXN | ce9f2986-75ef-4544-a0c3-109abfc9ff60 |
| ~~Funda de Viaje~~ | ~~$179 MXN~~ | ~~dafb4fb5-047a-499a-9a21-281b4ac6bfe2~~ |

## Product Variants (Color names in Spanish)
- Cepillo: Negro, Azul, Naranja, Rosa, Blanco
- Cabezales: Negro, Blanco

## Color Swatch Display Names (PDP)
- Negro → **Negro Clásico**
- Azul → **Azul Noche**
- Naranja → **Naranja Cempasúchil**
- Rosa → **Rosa Pastel**
- Blanco → **Blanco Sueño**

## Collections Created
| Collection | ID |
|-----------|-----|
| Cepillo Eléctrico | 0b0ef696-c60c-47f1-82dc-aa32d9ae6f08 |
| Cabezales de Repuesto | 188ab0c2-adea-4b42-8a34-5815d7dfaa55 |
| ~~Funda de Viaje~~ | ~~0db726a7-6f2d-4043-b323-ed5ba972aaff~~ |

## Selling Plan
- **Suscripción** (was "Suscripción Mensual") — Cabezales: every **6 months**, 20% off
- Plan ID: 24f7686e-68fa-4649-b8a9-a179ce6d517d
- Displays as: "Suscripción — $199 / 6 meses"

## Images
- `/hero-toothbrush.webp` — Hero background (public folder)
- `/dentistas-hero.webp` — Dental office with Smilo display (hero for /dentistas)
- `products/cepillo-electrico-soniq.webp` — Product shot
- `products/cabezales-repuesto.webp` — Replacement heads
- Logo: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784402648948-wabf8o8ttxo.webp` (UPDATED 2026-07-18)
- Dental clinic photo (PDP): `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784405153969-8wsvqau4xy9.webp`

## Files Modified
- `src/index.css` — Updated color tokens to blue+pink MyVariations palette + updated gradients
- `tailwind.config.ts` — spark and candy tokens
- `src/templates/EcommerceTemplate.tsx` — Promo bar + scrolling bar above header (2026-07-18)
- `src/templates/PageTemplate.tsx` — No py-6 for full-width layout
- `src/pages/ui/IndexUI.tsx` — Hero section: bg-hero-gradient (blue), pink CTA button, white badge/icons
- `src/components/CollectionCard.tsx` — Overlay card design, minimal
- `src/components/ui/ProductCardUI.tsx` — Clean minimal card with rounded-full CTA
- `src/components/BrandLogoLeft.tsx` — Updated to new Smilo logo image (2026-07-18 v2)
- `src/pages/ui/ProductPageUI.tsx` — Full PDP body expansion + "El paquete incluye" restored to 3-card design

## New Pages
- `src/pages/Nosotros.tsx` — Brand story, values, stats
- `src/pages/FAQ.tsx` — Full FAQ with categories
- `src/pages/Dentistas.tsx` + `src/pages/ui/DentistasUI.tsx` — B2B dentist distribution landing page

## Routes Added (App.tsx)
- `/nosotros` → Nosotros page
- `/faq` → FAQ page
- `/dentistas` → Dentist distribution program landing page

## Dentistas Landing Page (/dentistas)
- **Goal**: Recruit dentists to Smilo's consignment distribution program
- **Tone**: Professional, close, trustworthy — not generic startup-speak
- **Image**: `/dentistas-hero.webp` — AI-generated dental office with Smilo display
- **Key message**: Zero inventory investment — consignment model
- **CTA**: "Quiero ser distribuidor" → scrolls to contact form
- **Form**: Nombre, Consultorio, Ciudad, Teléfono, Email → shows success toast (no backend yet)
- **TODO**: Connect form to email/CRM when Supabase is connected

## PDP Body Structure (as of 2026-07-18)
Below the 2-col grid (gallery + purchase controls), full-width sections in order:
1. **Benefits grid** — 5 cards (2-col mobile, 5-col desktop): Batería 30d, 31,000 vib/min, 5 modos, Temporizador 2min, Garantía 12m
2. **El paquete incluye** — 3 cards with green-mint bg (#eef4eb): Cepillo ($999 MXN), Cabezal gratis ($119 MXN), Cable USB-C gratis ($79 MXN)
3. **Dental clinics** — Split card: clinic photo (left) + quote from Dra. Mónica Vargas (right, dark bg)
4. **Reviews section** — 6 review cards with 4.9/5 rating

## Recent Changes
1. 2026-07-18 — "El paquete incluye" section restored to 3-card design (green-mint cards, numbered pink badges, price + Gratis labels)
2. 2026-07-18 — "¿Qué incluye?" was temporarily replaced with a single full-width image, then reverted
3. 2026-07-18 — PDP body: added benefits grid, what's included, dental clinics section; replaced description with short 2-line paragraph
4. 2026-07-18 — Added pink promo bar ("15% descuento con JULIO15") + dark scrolling social proof bar above header site-wide
5. 2026-07-18 — PDP: Color selector replaced with circular swatches + poetic Spanish names
6. 2026-07-18 — Color variant names translated to Spanish: Negro, Azul, Naranja, Rosa, Blanco
7. 2026-07-18 — Updated logo to new Smilo image v2 (cleaner wordmark, same style)
8. 2026-07-18 — PDP: reseñas changed to "1,240 reseñas verificadas en México"
9. 2026-07-18 — PDP: urgency "6 unidades" → "4 unidades", rating 4.8 → 4.9, payment logos = checkout image
10. 2026-07-17 — PDP CRO upgrade: star rating, urgency, payment logos, Truck+Shield, 3 testimonials
11. 2026-07-17 — Added reviews section to ProductPageUI (6 cards)
12. 2026-07-17 — Selling plan renamed to "Suscripción" + 6 months interval
13. 2026-07-17 — Removed ProfileMenu (iniciar sesión) from header
14. 2026-07-17 — Reordered PDP: options/qty/CTA above description
15. 2026-07-17 — Logo enlarged to h-20 + mix-blend-mode: multiply

## Known Issues
- 2026-07-16: Funda de Viaje product/collection still exists in DB — still shows in collections/products sections of homepage.
- 2026-07-17: Dentistas contact form shows success toast but doesn't actually send data anywhere — needs Supabase or email integration.
- 2026-07-17: Logo has white background removed via mix-blend-mode: multiply — works on white/light backgrounds only.
- 2026-07-18: Cards 2 & 3 in "El paquete incluye" use placeholder icons (Package, RefreshCw) — ideally replace with real product photography of brush head and USB-C cable.

## Next Steps (Optional)
- Replace review/testimonial placeholders with real customer reviews when available
- Replace dentist quote with real dentist testimonial when available
- Fill in actual pricing/commission values in the Términos section
- Connect contact form to CRM or email (requires Supabase)
- Delete Funda de Viaje product + collection from Dashboard if desired
- Connect Supabase for order management
- Set up Stripe payments (Dashboard > Configuración > Pagos)
- Add real product images for cabezal and cable USB-C in the "paquete incluye" cards