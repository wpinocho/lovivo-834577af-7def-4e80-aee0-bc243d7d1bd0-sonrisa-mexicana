# Smilo — Cepillo Eléctrico para México 🇲🇽

## Current State
Fully built DTC eCommerce brand for Mexico. Clean, minimal, premium. Funda de Viaje removed from navigation and footer. Brand renamed from SONIQ to **Smilo**. New dentist distribution landing page live at `/dentistas`.

## Brand
- **Name**: Smilo
- **Tagline**: Tu boca. Reimaginada.
- **Market**: Mexico 🇲🇽
- **Language**: Mexican Spanish
- **Tone**: Young, fresh, confident. Premium but accessible. Apple-style simplicity.
- **Colors**: Black (#0D0F14) primary, Pure white background, Electric violet accent (hsl 258 80% 62%), Coral/orange spark (hsl 22 92% 60%), Hot pink candy (hsl 340 85% 62%), Inter font

## Color Tokens
- `--accent`: `258 80% 62%` — Vibrant electric violet
- `--spark`: `22 92% 60%` — Coral/orange (energy)
- `--candy`: `340 85% 62%` — Hot pink (playful pop)
- Gradient utilities: `.bg-hero-gradient`, `.bg-dark-gradient`, `.bg-warm-gradient`, `.bg-candy-gradient`

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

## Files Modified
- `src/index.css` — Smilo tokens + spark/candy tokens + gradient utility classes
- `tailwind.config.ts` — Added spark and candy color tokens
- `src/templates/EcommerceTemplate.tsx` — Header nav + footer (Funda removed)
- `src/templates/PageTemplate.tsx` — No py-6 for full-width layout
- `src/pages/ui/IndexUI.tsx` — Joyful colorful homepage
- `src/components/CollectionCard.tsx` — Overlay card design, minimal
- `src/components/ui/ProductCardUI.tsx` — Clean minimal card with rounded-full CTA
- `src/components/BrandLogoLeft.tsx` — Smilo text logo
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
- **Sections**: Hero (with real dental office photo), Trust bar, Por qué unirse (4 cards), Cómo funciona (3 steps), Términos (placeholders for pricing), Kit de arranque, Testimonios (2 placeholders), FAQ accordion (6 questions), Contact form
- **Image**: `/dentistas-hero.webp` — AI-generated dental office with Smilo display
- **Key message**: Zero inventory investment — consignment model
- **CTA**: "Quiero ser distribuidor" → scrolls to contact form
- **Form**: Nombre, Consultorio, Ciudad, Teléfono, Email → shows success toast (no backend yet)
- **TODO**: Connect form to email/CRM when Supabase is connected

## Recent Changes
1. 2026-07-17 — Created /dentistas landing page for dentist distribution program
2. 2026-07-17 — Generated dentistas-hero.webp (dental office with Smilo display)
3. 2026-07-16 — Force re-deploy of EcommerceTemplate to remove Funda from nav
4. 2026-07-16 — Removed Funda de Viaje from nav and footer
5. 2026-07-14 — Renamed brand from SONIQ to Smilo across all 6 source files
6. 2026-07-14 — Homepage redesigned with joyful vibrant colors

## Known Issues
- 2026-07-16: Funda de Viaje product/collection still exists in DB — still shows in collections/products sections of homepage. User only asked to remove from nav/menu.
- 2026-07-17: Dentistas contact form shows success toast but doesn't actually send data anywhere — needs Supabase or email integration.

## Next Steps (Optional)
- Replace testimonial placeholders with real dentist reviews
- Fill in actual pricing/commission values in the Términos section
- Connect contact form to CRM or email (requires Supabase)
- Delete Funda de Viaje product + collection from Dashboard if desired
- Connect Supabase for order management
- Set up Stripe payments (Dashboard > Configuración > Pagos)