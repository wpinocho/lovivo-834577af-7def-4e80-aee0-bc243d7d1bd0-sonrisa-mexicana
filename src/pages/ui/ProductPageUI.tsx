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
import { ShoppingCart, ArrowLeft, Plus, Minus, RefreshCw, Star, Quote, Lock, Truck, Shield, Clock, Battery, Zap, SlidersHorizontal, Package, Gift, CheckCircle, MapPin } from "lucide-react"
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

// Local color → image override (shown when DB variants don't have per-color images)
const COLOR_IMAGE_MAP: Record<string, string> = {
  "Negro": "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784415483079-wg27o6izdn.webp",
  "Rosa":  "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784411895621-swfyokqws0m.webp",
}

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0 })

  // Color-aware display image: thumbnail click → variant DB image → local color map → first product image
  const selectedColor = logic.selected?.["Color"]
  const colorOverrideImage = selectedColor ? (COLOR_IMAGE_MAP[selectedColor] ?? null) : null
  const displayImage = selectedImage || colorOverrideImage || logic.currentImage || logic.displayImages?.[0] || "/placeholder.svg"
  
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
              <span className="text-sm font-bold text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">
                · {logic.product?.title?.toLowerCase().includes("cabezal") ? "12" : "1,240"} reseñas
              </span>
            </div>

            {/* Urgency */}
            <div className="flex items-center gap-1.5 mt-2">
              <Clock className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
              <span className="text-xs font-semibold text-destructive">
                {logic.matchingVariant?.inventory_quantity != null && logic.matchingVariant.inventory_quantity <= 10
                  ? `¡Solo quedan 4 unidades en stock!`
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
              {logic.product.options.map((option) => {
                const isColorOption = option.name.toLowerCase() === "color"
                const selectedValue = logic.selected[option.name]

                // Color swatch map: value → { bg, border, displayName, textColor }
                const colorMap: Record<string, { bg: string; border: string; displayName: string; textColor: string }> = {
                  "Negro":  { bg: "#1a1a1a",  border: "#1a1a1a",  displayName: "Negro Clásico",         textColor: "#1a1a1a" },
                  "Azul":   { bg: "#3a6fd8",  border: "#3a6fd8",  displayName: "Azul Noche",            textColor: "#3a6fd8" },
                  "Naranja":{ bg: "#f97316",  border: "#f97316",  displayName: "Naranja Cempasúchil",   textColor: "#ea6c0a" },
                  "Rosa":   { bg: "#f9a8d4",  border: "#f9a8d4",  displayName: "Rosa Pastel",           textColor: "#db2777" },
                  "Blanco": { bg: "#ffffff",  border: "#d1d5db",  displayName: "Blanco Sueño",          textColor: "#9ca3af" },
                }

                return (
                  <div key={option.name}>
                    {isColorOption ? (
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="text-base font-semibold text-foreground">Color:</span>
                        <span
                          className="text-base font-semibold transition-colors duration-200"
                          style={{ color: selectedValue ? (colorMap[selectedValue]?.textColor ?? "inherit") : "inherit" }}
                        >
                          {selectedValue ? (colorMap[selectedValue]?.displayName ?? selectedValue) : "—"}
                        </span>
                      </div>
                    ) : (
                      <Label className="text-base font-medium">{option.name}</Label>
                    )}

                    <div className="flex flex-wrap gap-3 mt-1">
                      {option.values.map((value) => {
                        const isSelected = logic.selected[option.name] === value
                        const isAvailable = logic.isOptionValueAvailable(option.name, value)
                        const swatch = colorMap[value]

                        if (isColorOption && swatch) {
                          return (
                            <button
                              key={value}
                              title={swatch.displayName}
                              disabled={!isAvailable}
                              onClick={() => logic.handleOptionSelect(option.name, value)}
                              className={cn(
                                "w-9 h-9 rounded-full transition-all duration-200 focus:outline-none",
                                isSelected
                                  ? "ring-2 ring-offset-2 ring-primary scale-110"
                                  : "ring-1 ring-transparent hover:scale-105",
                                !isAvailable && "opacity-40 cursor-not-allowed"
                              )}
                              style={{
                                backgroundColor: swatch.bg,
                                boxShadow: `0 0 0 1.5px ${swatch.border}`,
                              }}
                            />
                          )
                        }

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
                )
              })}
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
            <div className="flex items-center">
              <img src="/lovable-uploads/43c70209-0949-4d87-9c23-50bea4ff2d48.png" alt="Visa, Mastercard, American Express" className="h-6 w-auto object-contain" />
            </div>
          </div>

          {/* Shipping & Guarantee */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-lg">
              <Truck className="h-5 w-5 text-candy flex-shrink-0" />
              <span><span className="font-semibold">Envío gratis</span> · Entrega en 24–48h</span>
            </div>
            <div className="flex items-center gap-2.5 text-lg">
              <Shield className="h-5 w-5 text-candy flex-shrink-0" />
              <span><span className="font-semibold">Garantía de 12 meses</span> · 30 días para devolución</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-foreground leading-relaxed text-lg">
              ¡Ya está! El cepillo que tus dientes estaban esperando — sin el precio absurdo.
            </p>
            <p className="text-foreground leading-relaxed text-lg">
              Diseñado pensando en la recomendación de dentistas, el cepillo SMILO limpia a fondo con tecnología sónica, sin dañar tus encías, y se adapta a tu sonrisa para una limpieza profunda todos los días.
            </p>
            <div className="w-full rounded-2xl overflow-hidden mt-4">
              <img
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784516025488-ko6ksz6t9qg.webp"
                alt="Sin Smilo vs Con Smilo — comparación de limpieza sónica"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>


        </div>
      </div>

      {/* ── BENEFITS GRID ── */}
      <div className="mt-16 border-t pt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Battery,           stat: "30 días",   label: "Batería",       sub: "sin recargar" },
            { icon: Zap,               stat: "31,000",    label: "Vibraciones",   sub: "por minuto" },
            { icon: SlidersHorizontal, stat: "5 modos",   label: "Intensidades",  sub: "de cepillado" },
            { icon: Clock,             stat: "2 min",     label: "Temporizador",  sub: "alerta c/30s" },
          ].map(({ icon: Icon, stat, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center bg-muted/40 rounded-2xl p-5 border border-border gap-2 hover:border-accent/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-2xl font-black tracking-tight text-foreground leading-none">{stat}</span>
              <div>
                <div className="text-sm font-semibold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT'S INCLUDED ── */}
      <div className="mt-14">
        <h2 className="text-2xl font-black tracking-tight text-foreground mb-8">El paquete incluye</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              num: "1",
              image: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784411895621-swfyokqws0m.webp",
              title: "El cepillo de dientes eléctrico sónico",
              price: "$999 MXN",
              isFree: false,
            },
            {
              num: "2",
              image: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784411895622-z5zsbz0vq8l.webp",
              title: "1 Cabezal de cepillo de cerdas suaves",
              price: "$119 MXN",
              isFree: true,
            },
            {
              num: "3",
              image: "https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784411895622-y6dihcqnj8.webp",
              title: "Cable de carga USB-C",
              price: "$79 MXN",
              isFree: true,
            },
          ].map(({ num, image, icon: Icon, title, price, isFree }) => (
            <div key={num} className="relative flex flex-col rounded-2xl overflow-hidden border border-border bg-[#cce0b0]">
              {/* Number badge */}
              <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center z-10">
                <span className="text-xs font-bold text-primary-foreground">{num}</span>
              </div>
              {/* Image area */}
              <div className="flex items-center justify-center h-52 bg-[#cce0b0] px-6 pt-8 pb-4">
                {image ? (
                  <img src={image} alt={title} className="h-full object-contain" style={{maxHeight: 160}} />
                ) : Icon ? (
                  <Icon className="h-20 w-20 text-muted-foreground/40" />
                ) : null}
              </div>
              {/* Text */}
              <div className="bg-background px-5 py-4 flex flex-col gap-1 flex-1">
                <p className="font-semibold text-foreground text-sm leading-snug">{title}</p>
                <p className={isFree ? "text-muted-foreground text-sm line-through" : "text-primary font-bold text-sm"}>
                  Valor de {price}
                </p>
                {isFree && (
                  <p className="text-primary font-bold text-sm">Gratis</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DENTAL CLINICS ── */}
      <div className="mt-14 rounded-3xl overflow-hidden border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-72 lg:h-auto min-h-[340px]">
            <img
              src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784415483079-wg27o6izdn.webp"
              alt="Display Smilo en consultorio dental"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* Text */}
          <div className="bg-foreground flex flex-col justify-center p-8 lg:p-12 gap-6">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">En consultorios de México</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight text-background">
              Ya está en consultorios dentales de todo México.
            </h2>
            <blockquote className="border-l-2 border-primary pl-5">
              <p className="text-background/70 text-sm leading-relaxed italic">
                "Llevo tres meses recomendando el Smilo a mis pacientes. Los resultados son notables — mejor higiene, menos placa y cero quejas de sensibilidad. Es el primero que recomendaría sin dudarlo."
              </p>
              <footer className="mt-3">
                <div className="font-semibold text-background text-sm">Dr. Alejandro Fuentes</div>
                <div className="text-background/50 text-xs">Cirujano Dentista · Clínica DentalPro, CDMX</div>
              </footer>
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-background/50 text-xs">Recomendado por dentistas profesionales</span>
            </div>
          </div>
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
          <p className="text-muted-foreground text-sm">1,240 reseñas verificadas en México</p>
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
              image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/b3071cbc-7f37-49dd-bb09-3f7c8ce155aa/1784519722621-isl1ycckt0j.webp',
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
          ].map(({ name, city, verified, text, stars, image }: { name: string; city: string; verified: boolean; text: string; stars: number; image?: string }) => (
            <div key={name} className="bg-muted/40 rounded-2xl border border-border relative overflow-hidden">
              {image && (
                <div className="w-full overflow-hidden bg-muted/60">
                  <img src={image} alt={`Foto de ${name}`} className="w-full h-auto object-contain" />
                </div>
              )}
              <div className="p-6">
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
            </div>
          ))}
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