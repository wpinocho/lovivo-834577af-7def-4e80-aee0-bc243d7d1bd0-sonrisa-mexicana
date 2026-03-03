import { useState } from 'react'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    category: 'El producto',
    items: [
      {
        q: '¿Para quién está pensado el SONIQ?',
        a: 'Para cualquier persona que quiera una limpieza dental más profunda y efectiva. Sirve tanto si tienes encías sensibles como si solo quieres dientes más blancos. No hay versión infantil — está diseñado exclusivamente para adultos.',
      },
      {
        q: '¿Es bueno para encías sensibles?',
        a: 'Sí. El SONIQ tiene un modo específico para encías sensibles con vibraciones más suaves. Miles de nuestros clientes con esta condición reportan cero dolor y hasta reducción del sangrado al cepillarse. Si tienes dudas, consulta con tu dentista antes de cambiar tu rutina.',
      },
      {
        q: '¿Cuánto dura la batería?',
        a: 'Con una carga completa (2 horas), tienes batería para 30 días de uso normal — que es dos veces al día por 2 minutos. No vas a estar cargándolo constantemente.',
      },
      {
        q: '¿Puedo usarlo en la regadera?',
        a: 'Sin problema. El SONIQ tiene certificación IPX7, lo que significa que aguanta sumergido en agua hasta un metro de profundidad por 30 minutos. En la regadera estás más que cubierto.',
      },
      {
        q: '¿Qué modos de cepillado tiene?',
        a: 'Cuatro modos: Limpieza (uso diario estándar), Blancura (vibración extra para remover manchas), Encías sensibles (vibraciones más suaves), y Masaje (estimulación de encías para mejorar la circulación).',
      },
    ],
  },
  {
    category: 'Envíos y entregas',
    items: [
      {
        q: '¿Hacen envíos a toda la República Mexicana?',
        a: 'Sí, enviamos a todos los estados de México. Trabajamos con Fedex y DHL para asegurar entregas rápidas y con seguimiento en tiempo real.',
      },
      {
        q: '¿Cuánto tiempo tarda en llegar?',
        a: 'En CDMX, Monterrey, Guadalajara y otras ciudades principales: 24-48 horas. En municipios más pequeños o zonas rurales: 3-5 días hábiles. Te llegará un correo con número de rastreo en cuanto enviemos tu pedido.',
      },
      {
        q: '¿Cuándo el envío es gratis?',
        a: 'El envío es gratis en pedidos mayores a $699 MXN dentro de la República Mexicana. Para pedidos menores, el costo de envío se calcula al momento del checkout según tu código postal.',
      },
    ],
  },
  {
    category: 'Pagos',
    items: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjeta de débito y crédito (Visa, Mastercard, American Express), OXXO Pay, transferencia SPEI y Mercado Pago. No necesitas tener tarjeta para comprar.',
      },
      {
        q: '¿Puedo pagar en meses sin intereses?',
        a: 'Sí. Ofrecemos meses sin intereses con tarjetas participantes de 3, 6 y hasta 12 meses. La disponibilidad depende del banco emisor de tu tarjeta.',
      },
      {
        q: '¿Es seguro pagar en línea?',
        a: 'Totalmente. Usamos Stripe, el procesador de pagos más confiable del mundo. Tus datos bancarios nunca los vemos ni los almacenamos nosotros. Todo está encriptado.',
      },
    ],
  },
  {
    category: 'Suscripción de cabezales',
    items: [
      {
        q: '¿Cómo funciona la suscripción de cabezales?',
        a: 'Al activar la suscripción, recibirás automáticamente un pack de 3 cabezales cada 3 meses — justo cuando los necesitas cambiar. Se cobra el mismo día del envío y pagas 20% menos que comprando solo. Puedes pausar o cancelar en cualquier momento desde tu cuenta.',
      },
      {
        q: '¿Por qué debo cambiar el cabezal cada 3 meses?',
        a: 'Las cerdas se desgastan y pierden efectividad. Después de 3 meses, un cabezal ya no limpia de la misma manera — aunque visualmente se vea bien. Los dentistas recomiendan cambio trimestral para mantener la salud dental óptima.',
      },
      {
        q: '¿Puedo cancelar la suscripción?',
        a: 'Sí, puedes cancelarla en cualquier momento desde tu cuenta, sin penalizaciones y sin dar explicaciones. La cancelación es efectiva antes del siguiente ciclo de cobro.',
      },
    ],
  },
  {
    category: 'Garantía y devoluciones',
    items: [
      {
        q: '¿Cuánto tiempo tiene de garantía?',
        a: 'El SONIQ tiene garantía de 2 años contra defectos de fabricación. Si tu cepillo presenta algún problema de fábrica, lo reemplazamos o te regresamos tu dinero, así de simple.',
      },
      {
        q: '¿Qué pasa si no me convence?',
        a: 'Tienes 30 días desde que recibes tu pedido para devolverlo si no estás satisfecho. Solo escríbenos, nos mandas el producto en las condiciones originales y te hacemos el reembolso completo. Sin letras pequeñas.',
      },
      {
        q: '¿Cómo contacto al soporte?',
        a: 'Por WhatsApp, correo electrónico o el chat de la tienda. Respondemos de lunes a viernes de 9am a 7pm (horario CDMX). Soporte en español, sin robots, con personas reales.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-foreground text-sm pr-4 group-hover:text-accent transition-colors">
          {q}
        </span>
        {open
          ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="pb-5 text-muted-foreground text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <EcommerceTemplate>
      <div className="max-w-3xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tighter text-foreground mb-4">
            Preguntas frecuentes
          </h1>
          <p className="text-muted-foreground text-lg">
            Todo lo que necesitas saber sobre SONIQ y tu compra.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
                {section.category}
              </h2>
              <div className="bg-muted/30 rounded-2xl px-6 border border-border">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center bg-muted/40 rounded-2xl p-10 border border-border">
          <MessageCircle className="h-10 w-10 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-black text-foreground mb-2">¿No encontraste tu respuesta?</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Escríbenos por WhatsApp o al correo y te respondemos en menos de 24 horas.
          </p>
          <Button asChild size="lg" className="rounded-full font-bold">
            <a href="mailto:hola@soniq.mx" target="_blank" rel="noopener noreferrer">
              Contactar soporte
            </a>
          </Button>
        </div>
      </div>
    </EcommerceTemplate>
  )
}