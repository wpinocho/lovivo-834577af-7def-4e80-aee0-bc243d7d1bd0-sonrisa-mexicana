# SONIQ — Cepillo Eléctrico para México 🇲🇽

## Current State
Fully built DTC eCommerce brand for Mexico. Clean, minimal, premium. Homepage updated with joyful, vibrant colors.

## Brand
- **Name**: SONIQ
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
| Cepillo Eléctrico SONIQ | $799 MXN | 17cb3fa5-74ae-4cf7-aa6f-24bc279aec06 |
| Cabezales de Repuesto (Pack 3) | $249 MXN | ce9f2986-75ef-4544-a0c3-109abfc9ff60 |
| Funda de Viaje | $179 MXN | dafb4fb5-047a-499a-9a21-281b4ac6bfe2 |

## Collections Created
| Collection | ID |
|-----------|-----|
| Cepillo Eléctrico | 0b0ef696-c60c-47f1-82dc-aa32d9ae6f08 |
| Cabezales de Repuesto | 188ab0c2-adea-4b42-8a34-5815d7dfaa55 |
| Funda de Viaje | 0db726a7-6f2d-4043-b323-ed5ba972aaff |

## Selling Plan
- Suscripción Mensual — Cabezales: every 3 months, 20% off
- Plan ID: 24f7686e-68fa-4649-b8a9-a179ce6d517d

## Images
- `/hero-toothbrush.webp` — Hero background (public folder)
- `products/cepillo-electrico-soniq.webp` — Product shot
- `products/cabezales-repuesto.webp` — Replacement heads
- `products/funda-viaje.webp` — Travel case

## Files Modified
- `src/index.css` — SONIQ tokens + spark/candy tokens + gradient utility classes
- `tailwind.config.ts` — Added spark and candy color tokens
- `src/templates/EcommerceTemplate.tsx` — Header (mobile menu, product nav) + footer
- `src/templates/PageTemplate.tsx` — No py-6 for full-width layout
- `src/pages/ui/IndexUI.tsx` — Joyful colorful homepage: violet hero gradient, candy-gradient benefits, spark/coral CTAs, warm-gradient trust badges
- `src/components/CollectionCard.tsx` — Overlay card design, minimal
- `src/components/ui/ProductCardUI.tsx` — Clean minimal card with rounded-full CTA
- `src/components/BrandLogoLeft.tsx` — SONIQ text logo

## New Pages
- `src/pages/Nosotros.tsx` — Brand story, values, stats
- `src/pages/FAQ.tsx` — Full FAQ with categories (product, shipping, payments, subscription, returns)

## Routes Added (App.tsx)
- `/nosotros` → Nosotros page
- `/faq` → FAQ page

## Next Steps (Optional)
- Connect Supabase for order management
- Set up Stripe payments (Dashboard > Configuración > Pagos)
- Configure shipping zones for Mexico
- Add/edit blog posts for content marketing