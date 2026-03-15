import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { CollectionCard } from '@/components/CollectionCard'
import { FloatingCart } from '@/components/FloatingCart'
import { NewsletterSection } from '@/components/NewsletterSection'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { BundleCard } from '@/components/ui/BundleCard'
import { useBundles } from '@/hooks/useBundles'
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex'
import { 
  ShieldCheck, Zap, Battery, Droplets, Star, 
  ChevronRight, RefreshCw, Package, Truck, CreditCard, CheckCircle2
} from 'lucide-react'

interface IndexUIProps {
  logic: UseIndexLogicReturn
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts
  } = logic

  const { bundles, loading: loadingBundles } = useBundles()

  return (
    <EcommerceTemplate showCart={true} layout="full-width">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-foreground">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero-toothbrush.webp"
            alt="SONIQ Cepillo Eléctrico Sónico"
            className="w-full h-full object-cover opacity-30"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-8">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-wider uppercase">Tecnología Sónica</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-background leading-[0.95] mb-6">
              Tu boca.
              <br />
              <span className="text-accent">Reimaginada.</span>
            </h1>

            <p className="text-lg text-background/60 mb-10 max-w-lg leading-relaxed">
              31,000 movimientos por minuto. Batería de 30 días. 
              El cepillo que tus dientes estaban esperando — sin el precio absurdo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 font-bold text-base h-14 px-8 rounded-full"
              >
                <Link to="/productos/cepillo-elctrico-soniq">
                  Comprar ahora — $799
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-background/70 hover:text-background hover:bg-background/10 font-medium text-base h-14 px-6"
              >
                <Link to="#como-funciona">Ver cómo funciona</Link>
              </Button>
            </div>

            {/* Mini trust signals */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { icon: Truck, text: 'Envío gratis +$699' },
                { icon: ShieldCheck, text: 'Garantía 2 años' },
                { icon: RefreshCw, text: '30 días de prueba' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-background/50 text-sm">
                  <Icon className="h-4 w-4 text-accent" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div className="bg-muted border-y overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {[
                '⭐⭐⭐⭐⭐  "El mejor cepillo que he tenido" — Sofía R., CDMX',
                '🦷  +5,000 clientes satisfechos en México',
                '⭐⭐⭐⭐⭐  "Mis encías agradecidas" — Carlos M., MTY',
                '🚚  Envíos en 24-48 hrs a toda la República',
                '⭐⭐⭐⭐⭐  "Se lo recomendé a toda mi familia" — Ana G., GDL',
                '✅  Recomendado por dentistas mexicanos',
              ].map((text, j) => (
                <span key={j} className="text-sm text-muted-foreground font-medium">{text}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black tracking-tighter text-foreground mb-4">
              Cepillado de siguiente nivel
            </h2>
            <p className="text-muted-foreground text-lg">
              Sin complicaciones. Sin excusas. Solo resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: '31K movimientos/min',
                desc: 'Tecnología sónica que limpia donde el cepillo manual no llega.',
              },
              {
                icon: Battery,
                title: 'Batería de 30 días',
                desc: 'Una carga y olvídate. Ideal para viajes largos sin preocupaciones.',
              },
              {
                icon: Droplets,
                title: 'IPX7 Impermeable',
                desc: 'Úsalo en la regadera sin problema. Diseñado para aguantar todo.',
              },
              {
                icon: ShieldCheck,
                title: '4 modos de cepillado',
                desc: 'Limpieza, blancura, encías sensibles y masaje — para cada necesidad.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group text-center p-6 rounded-2xl hover:bg-muted transition-colors">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className="py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black tracking-tighter text-foreground mb-4">
              Así de simple
            </h2>
            <p className="text-muted-foreground text-lg">
              3 pasos. Sin manual. Sin complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Pide tu SONIQ',
                desc: 'Compra en línea y recíbelo en tu casa en 24-48 horas. Envío gratis en pedidos mayores a $699.',
              },
              {
                step: '02',
                title: 'Empieza a usarlo',
                desc: 'Carga completa en 2 horas. Enciéndelo, elige tu modo y deja que la tecnología sónica haga el trabajo.',
              },
              {
                step: '03',
                title: 'Renueva tu cabezal',
                desc: 'Cada 3 meses, activa tu suscripción y recibe cabezales nuevos automáticamente. Sin pensar en ello.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="bg-background rounded-2xl p-8 h-full border border-border">
                  <div className="text-5xl font-black text-muted/60 mb-4 leading-none">{step}</div>
                  <h3 className="font-bold text-foreground text-lg mb-3">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tighter text-foreground mb-3">
                El sistema completo
              </h2>
              <p className="text-muted-foreground">Todo lo que necesitas para un cepillado perfecto.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {collections.map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onViewProducts={handleViewCollectionProducts}
                  eager={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SUBSCRIPTION SECTION ── */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-1.5 mb-8">
                <RefreshCw className="h-3.5 w-3.5 text-accent" />
                <span className="text-accent text-xs font-semibold tracking-wider uppercase">Suscripción inteligente</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight">
                Cabezales nuevos,
                <br />
                <span className="text-accent">sin que tengas que acordarte.</span>
              </h2>
              <p className="text-background/60 text-lg mb-8 leading-relaxed">
                Tu cabezal pierde efectividad después de 3 meses. Con nuestra suscripción, 
                llega solo a tu puerta — y ahorras 20% en cada envío.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Pack de 3 cabezales cada trimestre',
                  '20% de descuento en cada envío automático',
                  'Cancela cuando quieras, sin penalizaciones',
                  'Envío gratuito incluido en la suscripción',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-background/70">
                    <CheckCircle2 className={`h-5 w-5 flex-shrink-0 text-spark`} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-warm-gradient text-spark-foreground hover:opacity-90 font-bold h-14 px-8 rounded-full border-0 shadow-lg shadow-spark/30"
              >
                <Link to="/productos/cabezales-de-repuesto-soniq-pack-3">
                  Activar suscripción
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="bg-background/5 rounded-3xl p-8 border border-background/10">
                {/* Subscription card visual */}
                <div className="bg-background rounded-2xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-foreground text-sm">Cabezales de Repuesto</div>
                      <div className="text-muted-foreground text-xs">Pack de 3 — cada 3 meses</div>
                    </div>
                    <img
                      src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/834577af-7def-4e80-aee0-bc243d7d1bd0/cabezales-repuesto.webp"
                      alt="Cabezales de repuesto"
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">$199</span>
                    <span className="text-muted-foreground text-sm line-through">$249</span>
                    <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">-20%</span>
                  </div>
                </div>
                <div className="text-center text-background/40 text-xs">
                  ✓ Se renueva automáticamente · Cancela cuando quieras
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-accent text-accent" />
              ))}
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-foreground mb-2">
              4.9 / 5 estrellas
            </h2>
            <p className="text-muted-foreground">Basado en +2,000 reseñas de clientes en México</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sofía Ramírez',
                city: 'Ciudad de México',
                text: 'Llevaba años usando cepillo manual y no sabía lo que me perdía. En la primera semana noté mis dientes más limpios. La batería dura un chingo, no miento.',
                stars: 5,
              },
              {
                name: 'Carlos Mendoza',
                city: 'Monterrey',
                text: 'Mi dentista me preguntó qué había cambiado en mi rutina. Le conté del SONIQ. Ahora ya lo quiere recomendar a sus pacientes. El mejor cepillo que he tenido.',
                stars: 5,
              },
              {
                name: 'Ana García',
                city: 'Guadalajara',
                text: 'Tenía miedo porque tengo encías muy sensibles, pero el modo específico es increíble. Cero dolor, cero sangrado. La suscripción de cabezales es convenientísima.',
                stars: 5,
              },
            ].map(({ name, city, text, stars }) => (
              <div key={name} className="bg-muted/40 rounded-2xl p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-5">"{text}"</p>
                <div>
                  <div className="font-semibold text-foreground text-sm">{name}</div>
                  <div className="text-muted-foreground text-xs">{city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section id="products" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-foreground">
                {selectedCollectionId
                  ? `Productos de ${collections.find((c) => c.id === selectedCollectionId)?.name || 'Colección'}`
                  : 'Nuestros productos'}
              </h2>
              <p className="text-muted-foreground mt-1">Simple. Sin complicaciones.</p>
            </div>
            {selectedCollectionId && (
              <Button variant="outline" onClick={handleShowAllProducts} className="rounded-full">
                Ver todos
              </Button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-muted rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay productos disponibles.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── BUNDLES ── */}
      {!loadingBundles && bundles.length > 0 && (
        <section id="bundles" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black tracking-tighter text-foreground mb-12">
              Paquetes especiales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TRUST BADGES ── */}
      <section className="py-20 bg-warm-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Truck, title: 'Envío gratis', desc: 'En pedidos +$699 MXN a toda la República' },
              { icon: ShieldCheck, title: 'Garantía 2 años', desc: 'Contra defectos de fabricación' },
              { icon: RefreshCw, title: '30 días para devolver', desc: 'Si no te convence, te regresamos tu dinero' },
              { icon: CreditCard, title: 'Pago seguro', desc: 'Tarjeta, Oxxo, SPEI y Mercado Pago' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-background/20 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-spark-foreground" />
                </div>
                <div>
                  <div className="font-bold text-spark-foreground text-sm">{title}</div>
                  <div className="text-spark-foreground/70 text-xs mt-1 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  )
}