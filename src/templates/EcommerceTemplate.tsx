import { ReactNode, useState } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartUISafe } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
  hideFloatingCartOnMobile?: boolean
}

const scrollingItems = [
  '⭐⭐⭐⭐⭐  "El mejor cepillo que he tenido" — Sofía R., CDMX',
  '🦷  +5,000 clientes satisfechos en México',
  '⭐⭐⭐⭐⭐  "Mis encías agradecidas" — Carlos M., MTY',
  '🚚  Envíos en 24-48 hrs a toda la República',
  '⭐⭐⭐⭐⭐  "Se lo recomendé a toda mi familia" — Ana G., GDL',
  '✅  Recomendado por dentistas mexicanos',
]

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default',
  hideFloatingCartOnMobile = false
}: EcommerceTemplateProps) => {
  const cartUI = useCartUISafe()
  const openCart = cartUI?.openCart ?? (() => {})
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Cepillo', to: '/productos/cepillo-elctrico-soniq' },
    { label: 'Cabezales', to: '/productos/cabezales-de-repuesto-soniq-pack-3' },
    { label: 'Nosotros', to: '/nosotros' },
    { label: 'FAQ', to: '/faq' },
  ]

  const header = (
    <div className={headerClassName}>
      {/* ── PROMO BAR ── */}
      <div className="bg-spark py-3 px-4 text-center">
        <p className="text-base font-black text-white tracking-wide">
          15% de descuento con el código{' '}
          <span className="underline underline-offset-2">JULIO15</span>
        </p>
      </div>

      {/* ── SCROLLING SOCIAL PROOF BAR ── */}
      <div className="bg-foreground overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {scrollingItems.map((text, j) => (
                <span key={j} className="text-sm text-background/70 font-medium">{text}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN NAV ── */}
      <div className="py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <BrandLogoLeft />

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Cart + Mobile menu */}
            <div className="flex items-center space-x-1">
              {showCart && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openCart}
                  className="relative"
                  aria-label="Ver carrito"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </Button>
              )}

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menú"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t mt-3 pt-4 pb-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {pageTitle && (
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-foreground">{pageTitle}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-foreground text-background py-16 ${footerClassName ?? ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="text-2xl font-black tracking-tighter text-background">Smilo</span>
            <p className="mt-4 text-background/50 text-sm max-w-xs leading-relaxed">
              Cuidado dental moderno, accesible y sin complicaciones. 
              Hecho para México.
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Productos */}
          <div>
            <h3 className="font-semibold mb-4 text-background text-sm uppercase tracking-wider">Productos</h3>
            <div className="space-y-2.5">
              <Link to="/productos/cepillo-elctrico-soniq" className="block text-background/50 hover:text-background text-sm transition-colors">
                Cepillo Eléctrico
              </Link>
              <Link to="/productos/cabezales-de-repuesto-soniq-pack-3" className="block text-background/50 hover:text-background text-sm transition-colors">
                Cabezales de Repuesto
              </Link>
            </div>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-semibold mb-4 text-background text-sm uppercase tracking-wider">Ayuda</h3>
            <div className="space-y-2.5">
              <Link to="/faq" className="block text-background/50 hover:text-background text-sm transition-colors">
                Preguntas frecuentes
              </Link>
              <Link to="/nosotros" className="block text-background/50 hover:text-background text-sm transition-colors">
                Nosotros
              </Link>
              <Link to="/mis-pedidos" className="block text-background/50 hover:text-background text-sm transition-colors">
                Mis pedidos
              </Link>
              <Link to="/blog" className="block text-background/50 hover:text-background text-sm transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-sm">
            &copy; 2026 Smilo. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-background/40 text-xs">
            <span>Envíos a toda la República Mexicana</span>
            <span>🇲🇽</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>

      {showCart && <FloatingCart hideOnMobile={hideFloatingCartOnMobile} />}
    </>
  )
}