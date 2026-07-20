# Smilo — Cepillo Eléctrico para México 🇲🇽

## Current State
Fully built DTC eCommerce brand for Mexico. Clean, minimal, premium. Funda de Viaje removed from navigation and footer. Brand renamed from SONIQ to **Smilo**. New dentist distribution landing page live at `/dentistas`. **Color palette updated to MyVariations-inspired blue + pink.** **Real Smilo logo image integrated (black wordmark with smile arc).** **ProfileMenu (iniciar sesión) removed from header.** **Color variant names translated to Mexican Spanish.** **PDP color selector updated to circular swatches with poetic Spanish names.** **Promo bar + scrolling social proof bar added above header site-wide.** **PDP body expanded with 4 new full-width sections below the 2-col grid.** **Color-image map added to PDP — clicking a color swatch now shows the correct product image.** **Homepage hero redesigned: new lifestyle girl+toothbrush image, split layout, no overlay, $899 MXN, no "Ver cómo funciona", warranty 12 meses, 5 modos, 1,240 reseñas, cada 6 meses. Suscripción Inteligente section removed.**

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

## Color → Image Map (PDP local override, in ProductPageUI.tsx)
| Color | Image |
|-------|-------|
| Negro | `1784415483079-wg27o6izdn.webp` (dentist holding black Smilo) |
| Rosa  | `1784411895621-swfyokqws0m.webp` (pink Smilo product shot) |
| Azul  | (pending — user to upload) |
| Naranja | (pending — user to upload) |
| Blanco | (pending — user to upload) |

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
- `/hero-smilo.webp` — New hero lifestyle image (girl + pink Smilo, blue sky) — UPDATED 2026-07-20
- `/dentistas-hero.webp` — Dental office with Smilo display (hero for /dentistas)
- `products/cepillo-electrico-soniq.webp` — Product shot
- `products/cabezales-repuesto.webp` — Replacement heads
- Logo: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784402648948-wabf8o8ttxo.webp` (UPDATED 2026-07-18)
- Hero girl image: `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784572650106-subv7k2985h.webp`
- Dental clinic photo (PDP): `https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784415483079-wg27o6izdn.webp` (UPDATED 2026-07-18)

## Files Modified
- `src/index.css` — Updated color tokens to blue+pink MyVariations palette + updated gradients
- `tailwind.config.ts` — spark and candy tokens
- `src/templates/EcommerceTemplate.tsx` — Promo bar + scrolling bar above header (2026-07-18)
- `src/templates/PageTemplate.tsx` — No py-6 for full-width layout
- `src/pages/ui/IndexUI.tsx` — Hero redesigned; social proof bar removed from middle; Products section moved to after Trust Badges
- `src/components/CollectionCard.tsx` — Overlay card design, minimal
- `src/components/ui/ProductCardUI.tsx` — Clean minimal card with rounded-full CTA
- `src/components/BrandLogoLeft.tsx` — Updated to new Smilo logo image (2026-07-18 v2)
- `src/pages/ui/ProductPageUI.tsx` — Full PDP body expansion + color-image map + displayImage priority fix
- `src/pages/ui/DentistasUI.tsx` — Form sends via mailto to smilomexico@gmail.com + footer CTA updated

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
- **CTA**: "Solicitar información" → scrolls to contact form
- **Form**: Nombre, Consultorio, Ciudad, Teléfono, Email → opens mailto to smilomexico@gmail.com
- **Footer CTA**: "¿Tienes preguntas antes de solicitar? Escríbenos" → mailto:smilomexico@gmail.com
- **TODO**: Connect form to proper email/CRM when Supabase is connected

## PDP Body Structure (as of 2026-07-18)
Below the 2-col grid (gallery + purchase controls), full-width sections in order:
1. **Benefits grid** — 4 cards (2-col mobile, 4-col desktop): Batería 30d, 31,000 vib/min, 5 modos, Temporizador 2min
2. **El paquete incluye** — 3 cards with green-mint bg (#d8ecbf uniform): Cepillo ($999 MXN), Cabezal gratis ($119 MXN), Cable USB-C gratis ($79 MXN)
3. **Dental clinics** — Split card: dentist photo (left) + quote from Dra. Mónica Vargas (right, dark bg)
4. **Reviews section** — 6 review cards with 4.9/5 rating; Diego Torres card has unboxing photo

## Homepage Section Order (as of 2026-07-20)
1. Hero
2. Benefits (Cepillado de siguiente nivel)
3. Cómo funciona (Así de simple)
4. Reviews
5. Bundles (if any)
6. Trust Badges (30 días para devolver)
7. **Nuestros productos** ← moved here
8. Newsletter

## Recent Changes
1. 2026-07-20 — Homepage: removed scrolling social proof bar from middle of page
2. 2026-07-20 — Homepage: moved "Nuestros productos" section to after Trust Badges section
3. 2026-07-20 — Homepage hero: new lifestyle image (girl+pink Smilo), split layout, no overlay, $899 MXN
4. 2026-07-20 — Homepage hero: removed "Ver cómo funciona" button + descriptive paragraph
5. 2026-07-20 — Homepage hero: warranty 2 años → 12 meses, 4 modos → 5 modos
6. 2026-07-20 — Homepage reviews: +2,000 → 1,240 reseñas
7. 2026-07-20 — Homepage "Así de simple" step 03: cada 3 meses → cada 6 meses
8. 2026-07-20 — Homepage: removed entire "Suscripción Inteligente" section
9. 2026-07-20 — Homepage trust badges: Garantía 2 años → 12 meses
10. 2026-07-20 — Dentistas form "Enviar solicitud" now opens mailto:smilomexico@gmail.com with form data pre-filled
11. 2026-07-20 — Dentistas footer CTA text changed to "Escríbenos" (link) → mailto:smilomexico@gmail.com
12. 2026-07-20 — FAQ "Contactar soporte" → WhatsApp wa.me/5623194438; footer added "Contactar soporte" link
13. 2026-07-20 — PDP "El paquete incluye" cards: background unified to single light green #d8ecbf
14. 2026-07-20 — Diego Torres review: unboxing image added (full, no crop, contained within card)
15. 2026-07-18 — PDP color-image fix: displayImage priority corrected (currentImage before displayImages[0]) + local COLOR_IMAGE_MAP for Negro & Rosa

## Known Issues
- 2026-07-16: Funda de Viaje product/collection still exists in DB — still shows in collections/products sections of homepage.
- 2026-07-17: Logo has white background removed via mix-blend-mode: multiply — works on white/light backgrounds only.
- 2026-07-18: Color images for Azul Noche, Naranja Cempasúchil, Blanco Sueño not yet mapped — user needs to upload those images.
- 2026-07-20: Dentistas form uses mailto — opens user's email client, not a true server-side send. Needs Supabase/email integration for reliable delivery.

## Next Steps (Optional)
- Upload Azul, Naranja, Blanco product images and add to COLOR_IMAGE_MAP in ProductPageUI.tsx
- Replace review/testimonial placeholders with real customer reviews when available
- Replace dentist quote with real dentist testimonial when available
- Fill in actual pricing/commission values in the Términos section
- Connect contact form to CRM or email (requires Supabase) for reliable delivery
- Delete Funda de Viaje product + collection from Dashboard if desired
- Connect Supabase for order management
- Set up Stripe payments (Dashboard > Configuración > Pagos)