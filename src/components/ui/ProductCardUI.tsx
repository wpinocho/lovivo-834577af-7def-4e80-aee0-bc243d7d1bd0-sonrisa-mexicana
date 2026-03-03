import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import { PriceRuleBadge } from "@/components/ui/PriceRuleBadge"
import { usePriceRules } from "@/hooks/usePriceRules"
import type { Product } from "@/lib/supabase"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * SONIQ ProductCardUI — Clean, minimal, premium DTC
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  const { getRulesForProduct } = usePriceRules()
  const productRules = getRulesForProduct(product.id)

  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          {/* Image */}
          <Link to={`/productos/${logic.product.slug}`} className="block">
            <div className="relative aspect-square bg-muted overflow-hidden">
              {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                <>
                  <img
                    src={logic.matchingVariant?.image_urls?.[0] || (logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-contain p-4 transition-all duration-500 ${
                      logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image
                        ? 'group-hover:opacity-0'
                        : 'group-hover:scale-105'
                    }`}
                  />
                  {logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image && (
                    <img
                      src={logic.product.images[1]}
                      alt={`${logic.product.title} — vista alternativa`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Sin imagen
                </div>
              )}

              {/* Badges */}
              {(() => {
                const badges: React.ReactNode[] = []
                if (logic.discountPercentage) {
                  badges.push(
                    <span key="discount" className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
                      -{logic.discountPercentage}%
                    </span>
                  )
                }
                if (!logic.inStock) {
                  badges.push(
                    <span key="oos" className="bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded-full font-medium">
                      Agotado
                    </span>
                  )
                }
                const volBogo = productRules.filter(r => r.rule_type === 'volume' || r.rule_type === 'bogo')
                for (const rule of volBogo) {
                  if (badges.length >= 2) break
                  badges.push(<PriceRuleBadge key={rule.id} rule={rule} />)
                }
                if (badges.length === 0) return null
                return (
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {badges.slice(0, 2)}
                  </div>
                )
              })()}
            </div>
          </Link>

          {/* Content */}
          <div className="p-5">
            <Link to={`/productos/${logic.product.slug}`}>
              <h3 className="font-bold text-foreground text-sm mb-1 leading-tight hover:text-accent transition-colors">
                {logic.product.title}
              </h3>
              {logic.product.description && (
                <p className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed">
                  {logic.product.description.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </Link>

            {/* Variant selectors */}
            {logic.hasVariants && logic.options && (
              <div className="mb-4 space-y-2">
                {logic.options.map((opt) => (
                  <div key={opt.id}>
                    <div className="text-xs font-medium text-foreground mb-1.5">{opt.name}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                        const isSelected = logic.selected[opt.name] === val
                        const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                        if (swatch) {
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              title={`${opt.name}: ${val}`}
                              className={`h-6 w-6 rounded-full border-2 transition-all ${
                                isSelected ? 'border-foreground scale-110' : 'border-transparent hover:border-muted-foreground'
                              } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                              style={{ backgroundColor: swatch }}
                              aria-label={`${opt.name}: ${val}`}
                            />
                          )
                        }

                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            className={`border rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                              isSelected
                                ? 'border-foreground bg-foreground text-background'
                                : logic.selected[opt.name] && !isSelected
                                  ? 'border-border bg-background text-muted-foreground opacity-40'
                                  : 'border-border bg-background text-foreground hover:border-foreground'
                            }`}
                            aria-pressed={isSelected}
                            aria-label={`${opt.name}: ${val}`}
                          >
                            {val}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex flex-col">
                <span className="font-black text-foreground text-lg">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-muted-foreground text-xs line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => {
                  logic.onAddToCartSuccess()
                  logic.handleAddToCart()
                }}
                disabled={!logic.canAddToCart}
                className="rounded-full h-9 px-4 font-bold"
              >
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                {logic.inStock ? 'Agregar' : 'Agotado'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </HeadlessProductCard>
  )
}