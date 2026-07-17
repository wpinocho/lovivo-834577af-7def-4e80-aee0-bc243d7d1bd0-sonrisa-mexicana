# Smilo — Cepillo Eléctrico para México 🇲🇽

## Current State
Fully built DTC eCommerce brand for Mexico. Clean, minimal, premium. Funda de Viaje removed from navigation and footer. Brand renamed from SONIQ to **Smilo**. New dentist distribution landing page live at `/dentistas`. **Color palette updated to MyVariations-inspired blue + pink.** **Real Smilo logo image integrated (black wordmark with smile arc).**

## Brand
- **Name**: Smilo
- **Tagline**: Tu boca. Reimaginada.
- **Market**: Mexico 🇲🇽
- **Language**: Mexican Spanish
- **Tone**: Young, fresh, confident. Premium but accessible. Apple-style simplicity.
- **Colors**: Cornflower blue accent + Hot pink CTAs + White background + Dark navy text. Inter font.
- **Palette inspiration**: myvariations.com — clean, clinical, fresh aesthetic
- **Logo**: Black serif wordmark "Smilo" with smile arc underneath — white background, used as `<img>` in header

## Color Tokens (UPDATED 2026-07-17)
- `--primary`: `335 85% 55%` — Hot pink/magenta (main CTA buttons)
- `--accent`: `220 68% 52%` — Cornflower blue (hero, highlights, icons)
- `--spark`: `335 85% 55%` — Same hot pink (energy, CTAs)
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
| Cepillo Eléctrico Smilo | $799 MXN | 17cb3fa5-74ae-4cf7-aa6f-24bc279aec06 |
| Cabezales de Repuesto (Pack 3) | $249 MXN | ce9f2986-75ef-4544-a0c3-109abfc9ff60 |
| ~~Funda de Viaje~~ | ~~$179 MXN~~ | ~~dafb4fb5-047a-499a-9a21-281b4ac6bfe2~~ |

## Collections Created
| Collection | ID |
|-----------|-----|
| Cepillo Eléctrico | 0b0ef696-c60c-47f1-82dc-aa32d9ae6f08 |
| Cabezales de Repuesto | 188ab0c2-adea-4b42-8a34-5815d7dfaa55 |
| ~~Funda de Viaje~~ | ~~0db726a7-6f2d-4043-b323-ed5ba972aaff~~ |

## Selling Plan
- Suscripción Mensual — Cabezales: every 3 months, 20% off
- Plan ID: 24f7686e-68fa-4649-b8a9-a179ce6d517d

## Images
- `/hero-toothbrush.webp` — Hero background (public folder)
- `/dentistas-hero.webp` — Dental office with Smilo display (hero for /dentistas)
- `products/cepillo-electrico-soniq.webp` — Product shot
- `products/cabezales-repuesto.webp` — Replacement heads
- Logo: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784252640328-k1wtkp1kd5.webp`

## Files Modified
- `src/index.css` — Updated color tokens to blue+pink MyVariations palette + updated gradients
- `tailwind.config.ts` — spark and candy tokens (no change needed, references CSS vars)
- `src/templates/EcommerceTemplate.tsx` — Header nav + footer (Funda removed)
- `src/templates/PageTemplate.tsx` — No py-6 for full-width layout
- `src/pages/ui/IndexUI.tsx` — Hero section: bg-hero-gradient (blue), pink CTA button, white badge/icons
- `src/components/CollectionCard.tsx` — Overlay card design, minimal
- `src/components/ui/ProductCardUI.tsx` — Clean minimal card with rounded-full CTA
- `src/components/BrandLogoLeft.tsx` — Real Smilo logo image (black wordmark, h-9)
- `src/App.tsx` — Added /dentistas route

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

## Recent Changes
1. 2026-07-17 — Replaced text logo with real Smilo image (black wordmark + smile arc)
2. 2026-07-17 — Updated full color palette to MyVariations-inspired blue+pink scheme
3. 2026-07-17 — Hero section updated: blue gradient bg, pink CTA button, white badge/icons, pink "Reimaginada."
4. 2026-07-17 — Created /dentistas landing page for dentist distribution program
5. 2026-07-17 — Generated dentistas-hero.webp (dental office with Smilo display)
6. 2026-07-16 — Force re-deploy of EcommerceTemplate to remove Funda from nav
7. 2026-07-16 — Removed Funda de Viaje from nav and footer
8. 2026-07-14 — Renamed brand from SONIQ to Smilo across all 6 source files
9. 2026-07-14 — Homepage redesigned with joyful vibrant colors

## Known Issues
- 2026-07-16: Funda de Viaje product/collection still exists in DB — still shows in collections/products sections of homepage.
- 2026-07-17: Dentistas contact form shows success toast but doesn't actually send data anywhere — needs Supabase or email integration.
- 2026-07-17: Logo has white background — looks fine on white header but may clash on dark backgrounds (footer). Consider removing bg from logo image if needed.

## Next Steps (Optional)
- Replace testimonial placeholders with real dentist reviews
- Fill in actual pricing/commission values in the Términos section
- Connect contact form to CRM or email (requires Supabase)
- Delete Funda de Viaje product + collection from Dashboard if desired
- Connect Supabase for order management
- Set up Stripe payments (Dashboard > Configuración > Pagos)
- Consider creating a version of the logo with transparent background for footer use