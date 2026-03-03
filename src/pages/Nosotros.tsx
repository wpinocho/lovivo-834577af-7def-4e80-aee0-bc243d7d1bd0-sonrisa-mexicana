import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { Zap, Heart, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Nosotros() {
  return (
    <EcommerceTemplate>
      <div className="max-w-4xl mx-auto px-4 py-20">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-1.5 mb-8">
            <Heart className="h-3.5 w-3.5 text-accent" />
            <span className="text-accent text-xs font-semibold tracking-wider uppercase">Nuestra historia</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-foreground mb-6 leading-tight">
            Creemos que cuidar
            <br />
            tus dientes no debería
            <br />
            <span className="text-accent">complicarte la vida.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Somos un equipo mexicano obsesionado con el diseño, la salud y la simpleza.
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-black text-foreground mb-4">Todo empezó con una visita al dentista</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nuestra fundadora llegó a una cita de rutina y su dentista le preguntó si seguía usando un cepillo 
                manual. La realidad: los cepillos eléctricos de calidad cuestan entre $2,000 y $5,000 pesos. 
                Y los baratos simplemente no funcionan.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ahí nació la idea de SONIQ: un cepillo eléctrico de verdad, con tecnología sónica real, 
                a un precio que cualquier mexicano pueda pagar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sin intermediarios, sin tiendas físicas, sin márketing millonario. Solo un producto 
                honesto que hace exactamente lo que promete.
              </p>
            </div>
            <div className="bg-muted rounded-2xl overflow-hidden">
              <img
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/834577af-7def-4e80-aee0-bc243d7d1bd0/cepillo-electrico-soniq.webp"
                alt="SONIQ — Cepillo eléctrico premium"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Zap,
              title: 'Tecnología real',
              desc: 'Nada de gimmicks. Nuestro motor sónico de 31,000 movimientos/min está respaldado por estudios clínicos que demuestran hasta un 100% más de efectividad que el cepillo manual.',
            },
            {
              icon: Heart,
              title: 'Diseñado para México',
              desc: 'Pensamos en el precio, en los métodos de pago mexicanos, en los tiempos de envío y en el servicio al cliente en español. Somos de aquí.',
            },
            {
              icon: Shield,
              title: 'Transparencia total',
              desc: 'Garantía de 2 años, 30 días para devolver sin preguntas y soporte real por WhatsApp. Si algo falla, lo resolvemos. Así de simple.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-muted/40 rounded-2xl p-8 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-foreground text-background rounded-3xl p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '+5,000', label: 'clientes en México' },
              { number: '4.9★', label: 'calificación promedio' },
              { number: '2 años', label: 'de garantía' },
              { number: '30 días', label: 'para devolver' },
            ].map(({ number, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-accent mb-1">{number}</div>
                <div className="text-background/60 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tighter text-foreground mb-4">
            ¿Listo para el cambio?
          </h2>
          <p className="text-muted-foreground mb-8">
            Únete a miles de mexicanos que ya tienen dientes más limpios.
          </p>
          <Button asChild size="lg" className="rounded-full h-14 px-10 font-bold text-base">
            <Link to="/productos/cepillo-elctrico-soniq">
              Comprar mi SONIQ — $799
            </Link>
          </Button>
        </div>

      </div>
    </EcommerceTemplate>
  )
}