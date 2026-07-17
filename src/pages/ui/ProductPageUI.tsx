import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import { ShoppingCart, ArrowLeft, Plus, Minus, RefreshCw, Star, Quote, Lock, Truck, Shield, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

import type { Product, ProductVariant, SellingPlan } from "@/lib/supabase"
import { VolumeBadge } from "@/components/ui/VolumeBadge"
import { BOGOLabel } from "@/components/ui/BOGOLabel"
import { intervalLabel } from "@/lib/subscription-utils"

/**
 * EDITABLE UI COMPONENT - ProductPageUI
 * 
 * Este componente solo maneja la presentación de la página de producto.
 * Recibe toda la lógica como props del HeadlessProduct.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Header y navegación
 * - Animaciones y efectos
 * - Agregar features visuales (zoom de imagen, etc.)
 */

interface ProductPageUIProps {
  logic: {
    // Product data
    product: any
    loading: boolean
    notFound: boolean
    
    // Selection state
    selected: Record<string, string>
    quantity: number
    
    // Calculated values
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    
    // Handlers
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleNavigateBack: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    
    // Any other properties that might come from HeadlessProduct
    [key: string]: any
  }
}

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0 })
  
  // Current displayed image (selected thumbnail or variant image or first image)
  const displayImage = selectedImage || logic.displayImages?.[0] || logic.currentImage || "/placeholder.svg"
  
  // Reset selected image when variant changes
  useEffect(() => {
    setSelectedImage(null)
  }, [logic.matchingVariant])
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (logic.notFound) {
    return (
      <EcommerceTemplate>
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-8">El producto que buscas no existe o ha sido eliminado.</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!logic.product) return null

  return (
    <EcommerceTemplate hideFloatingCartOnMobile>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images Gallery */}
        <div className="space-y-4">
          {/* Main Image - Desktop */}
          <div className="hidden md:block aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={displayImage}
              alt={logic.product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Mobile Carousel */}
          {logic.displayImages && logic.displayImages.length > 1 ? (
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {logic.displayImages.map((img: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                     <img
                          src={img}
                          alt={`${logic.product.title} ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          ) : (
            <div className="md:hidden aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={displayImage}
                alt={logic.product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Thumbnails - Desktop only */}
          {logic.displayImages && logic.displayImages.length > 1 && (
            <div className="hidden md:flex gap-2 overflow-x-auto pb-2">
              {logic.displayImages.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                    (selectedImage === img || (!selectedImage && logic.currentImage === img) || (!selectedImage && !logic.currentImage && index === 0))
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-transparent hover:border-muted-foreground/30"
                  )}
                >
                  <img
                    src={img}
                    alt={`${logic.product.title} miniatura ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{logic.product.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-2xl font-bold">
                {logic.formatMoney(logic.currentPrice)}
              </span>
              {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {logic.formatMoney(logic.currentCompareAt)}
                </span>
              )}
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">4.8</span>
              <span className="text-sm text-muted-foreground">· 1,240 reseñas</span>
            </div>

            {/* Urgency */}
            <div className="flex items-center gap-1.5 mt-2">
              <Clock className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
              <span className="text-xs font-semibold text-destructive">
                {logic.matchingVariant?.inventory_quantity != null && logic.matchingVariant.inventory_quantity <= 10
                  ? `¡Solo quedan ${logic.matchingVariant.inventory_quantity} unidades en stock!`
                  : '🔥 Oferta por tiempo limitado · Envío gratis hoy'}
              </span>
            </div>

            {/* Price rule badges */}
            {logic.product?.id && (
              <div className="flex flex-wrap gap-2 mt-3">
                <VolumeBadge productId={logic.product.id} />
                <BOGOLabel productId={logic.product.id} />
              </div>
            )}
          </div>

          {/* Selling Plan Selector */}
          {logic.sellingPlans && logic.sellingPlans.length > 0 && (
            <div className="space-y-2">
              <Label className="text-base font-medium">Tipo de compra</Label>
              <div className="space-y-2">
                {/* One-time purchase option */}
                <label
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all",
                    !logic.selectedPlan
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="selling-plan"
                      checked={!logic.selectedPlan}
                      onChange={() => logic.setSelectedPlan(null)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="font-medium">Compra única</span>
                  </div>
                  <span className="font-semibold">{logic.formatMoney(logic.currentPrice)}</span>
                </label>

                {/* Subscription options */}
                {logic.sellingPlans.map((plan: SellingPlan) => {
                  const subPrice = logic.subscriptionPrice && logic.selectedPlan?.id === plan.id
                    ? logic.subscriptionPrice
                    : (plan.discount_type === 'percentage' && plan.discount_value
                        ? logic.currentPrice * (1 - plan.discount_value / 100)
                        : plan.discount_type === 'fixed' && plan.discount_value
                          ? Math.max(0, logic.currentPrice - plan.discount_value)
                          : logic.currentPrice)
                  
                  return (
                    <label
                      key={plan.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all",
                        logic.selectedPlan?.id === plan.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="selling-plan"
                          checked={logic.selectedPlan?.id === plan.id}
                          onChange={() => logic.setSelectedPlan(plan)}
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <span className="font-medium">{plan.name}</span>
                          {plan.discount_value && plan.discount_value > 0 && (
                            <span className="ml-2 text-xs text-primary font-medium">
                              -{plan.discount_value}{plan.discount_type === 'percentage' ? '%' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-semibold">
                        {logic.formatMoney(subPrice)}/{intervalLabel(plan.interval, plan.interval_count)}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {/* Product Options */}
          {logic.product.options && logic.product.options.length > 0 && (
            <div className="space-y-4">
              {logic.product.options.map((option) => (
                <div key={option.name}>
                  <Label className="text-base font-medium">{option.name}</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {option.values.map((value) => {
                      const isSelected = logic.selected[option.name] === value
                      const isAvailable = logic.isOptionValueAvailable(option.name, value)
                      
                      return (
                        <Button
                          key={value}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          disabled={!isAvailable}
                          onClick={() => logic.handleOptionSelect(option.name, value)}
                          className={!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                        >
                          {value}
                          {!isAvailable && (
                            <span className="ml-1 text-xs">(Agotado)</span>
                          )}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="quantity" className="text-base font-medium">
                Cantidad
              </Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => logic.handleQuantityChange(Math.max(1, logic.quantity - 1))}
                  disabled={logic.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={logic.quantity}
                  onChange={(e) => logic.handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div ref={ctaRef} className="flex flex-col gap-3">
              <Button
                onClick={logic.handleAddToCart}
                disabled={!logic.inStock}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {logic.inStock 
                  ? (logic.selectedPlan 
                      ? `Suscribirse — ${logic.formatMoney(logic.subscriptionPrice || logic.currentPrice)}/${intervalLabel(logic.selectedPlan.interval, logic.selectedPlan.interval_count)}`
                      : 'Agregar al carrito')
                  : 'Agotado'}
              </Button>
              
              {logic.inStock && (
                <Button
                  onClick={logic.handleBuyNow}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Comprar ahora
                </Button>
              )}
              
              {!logic.inStock && (
                <Badge variant="secondary" className="w-fit">Agotado</Badge>
              )}
            </div>
          </div>

          {/* Payment security */}
          <div className="space-y-3 border border-border rounded-xl p-4 bg-muted/30">
            <div className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-candy flex-shrink-0" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {['VISA', 'Mastercard', 'Mercado Pago', 'OXXO'].map((method) => (
                <span key={method} className="border border-border rounded-md px-2.5 py-1 text-xs font-bold tracking-wide bg-background text-foreground">
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Shipping & Guarantee */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm">
              <Truck className="h-4 w-4 text-candy flex-shrink-0" />
              <span><span className="font-semibold">Envío gratis</span> · Entrega en 24–48h</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Shield className="h-4 w-4 text-candy flex-shrink-0" />
              <span><span className="font-semibold">Garantía de 12 meses</span> · 30 días para devolución</span>
            </div>
          </div>

          {logic.product.description && (
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <div 
                className="text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: logic.product.description }}
              />
            </div>
          )}

          <Separator />

          <Button
            variant="outline"
            onClick={logic.handleNavigateBack}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Seguir comprando
          </Button>
        </div>
      </div>

      {/* ── REVIEWS SECTION ── */}
      <div className="mt-20 border-t pt-16">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-foreground mb-1">4.9 / 5 estrellas</h2>
          <p className="text-muted-foreground text-sm">+2,000 reseñas verificadas en México</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'Sofía Ramírez',
              city: 'Ciudad de México',
              verified: true,
              text: 'Llevaba años con cepillo manual y no sabía lo que me perdía. En la primera semana noté mis dientes más limpios. La batería dura un chingo, no miento.',
              stars: 5,
            },
            {
              name: 'Carlos Mendoza',
              city: 'Monterrey',
              verified: true,
              text: 'Mi dentista me preguntó qué había cambiado en mi rutina. Le conté del Smilo. Ahora quiere recomendarlo a sus pacientes. El mejor cepillo que he tenido.',
              stars: 5,
            },
            {
              name: 'Ana García',
              city: 'Guadalajara',
              verified: true,
              text: 'Tenía miedo porque tengo encías muy sensibles, pero el modo específico es increíble. Cero dolor, cero sangrado. La suscripción de cabezales es convenientísima.',
              stars: 5,
            },
            {
              name: 'Diego Torres',
              city: 'Tijuana',
              verified: true,
              text: 'Lo compré dudando si valdría la pena el precio. Vale cada peso. Mis dientes se sienten recién limpios del dentista cada mañana.',
              stars: 5,
            },
            {
              name: 'Valentina Cruz',
              city: 'Puebla',
              verified: true,
              text: 'Súper fácil de usar, silencioso y la carga dura mucho. Ya lo recomendé a mi mamá y a mis dos hermanas. No hay vuelta atrás.',
              stars: 5,
            },
            {
              name: 'Luis Herrera',
              city: 'Guadalajara',
              verified: true,
              text: 'Tenía periodontitis leve y mi dentista me recomendó un sónico. El Smilo cumple perfecto. Además el diseño es elegante, se ve caro.',
              stars: 5,
            },
          ].map(({ name, city, verified, text, stars }) => (
            <div key={name} className="bg-muted/40 rounded-2xl p-6 border border-border relative">
              <Quote className="absolute top-4 right-4 h-6 w-6 text-accent/20" />
              <div className="flex gap-1 mb-3">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-5">"{text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold text-xs">{name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{name}</div>
                  <div className="text-muted-foreground text-xs flex items-center gap-1">
                    {city}
                    {verified && <span className="text-candy font-medium">· Compra verificada</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonials with photos */}
        <div className="mt-14 border-t pt-12">
          <h3 className="text-2xl font-black text-center mb-1">Lo que dicen nuestros clientes</h3>
          <p className="text-center text-muted-foreground text-sm mb-8">Reales. Verificados. Sin filtros.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Mariana López',
                city: 'Ciudad de México',
                photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
                text: 'Mi dentista me dijo que mis dientes nunca habían estado tan limpios. ¡Y solo llevo 2 meses usándolo!',
              },
              {
                name: 'Roberto Sánchez',
                city: 'Monterrey',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
                text: 'Dudé en comprarlo por el precio. Pero de verdad es la mejor inversión en salud que he hecho en años.',
              },
              {
                name: 'Fernanda Vega',
                city: 'Guadalajara',
                photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
                text: 'La suscripción de cabezales es un detalle brillante. Nunca más voy a olvidar cambiarlos cada 6 meses.',
              },
            ].map(({ name, city, photo, text }) => (
              <div key={name} className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-2xl border border-border">
                <img src={photo} alt={name} className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-accent/20" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm italic leading-relaxed mb-4">"{text}"</p>
                <div>
                  <div className="font-semibold text-foreground text-sm">{name}</div>
                  <div className="text-muted-foreground text-xs">{city} · <span className="text-candy font-medium">Compra verificada</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar */}
      {logic.inStock && (
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-lg transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)]",
            ctaInView ? "translate-y-full" : "translate-y-0"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <h3 className="font-semibold truncate">{logic.product.title}</h3>
                <span className="font-bold text-lg shrink-0">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button onClick={logic.handleAddToCart} size="default">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </Button>
                <Button onClick={logic.handleBuyNow} variant="outline" size="default">
                  Comprar ahora
                </Button>
              </div>
            </div>
            {/* Mobile */}
            <div className="md:hidden space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm truncate">{logic.product.title}</h3>
                <span className="font-bold shrink-0">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
              </div>
              <div className="flex gap-2">
                <Button onClick={logic.handleAddToCart} size="sm" className="flex-1">
                  <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                  Agregar al carrito
                </Button>
                <Button onClick={logic.handleBuyNow} variant="outline" size="sm" className="flex-1">
                  Comprar ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EcommerceTemplate>
  )
}