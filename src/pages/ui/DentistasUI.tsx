import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Package, Users, Star, ArrowRight, Stethoscope, TrendingUp, Gift, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Accordion item component
function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-base leading-snug">{question}</span>
        {open ? (
          <ChevronUp className="shrink-0 text-accent" size={20} />
        ) : (
          <ChevronDown className="shrink-0 text-gray-400" size={20} />
        )}
      </button>
      {open && (
        <p className="pb-5 text-gray-600 leading-relaxed text-sm pr-8">{answer}</p>
      )}
    </div>
  );
}

export default function DentistasUI() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    nombre: "",
    consultorio: "",
    ciudad: "",
    telefono: "",
    email: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ nombre: "", consultorio: "", ciudad: "", telefono: "", email: "" });
      toast({
        title: "¡Solicitud recibida!",
        description: "Un asesor Smilo se pondrá en contacto contigo en menos de 24 horas.",
      });
    }, 1200);
  };

  const scrollToForm = () => {
    document.getElementById("formulario-dentistas")?.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    {
      question: "¿Necesito comprar inventario por adelantado?",
      answer: "No. Smilo funciona en modelo de consignación: nosotros colocamos el inventario inicial en tu consultorio sin ningún costo para ti. Solo pagas cuando vendes. Sin riesgo, sin inversión.",
    },
    {
      question: "¿Qué pasa si no vendo todo el inventario?",
      answer: "No hay problema. Si alguna unidad no se vende en el período acordado, la retiramos o reemplazamos sin costo. El riesgo de inventario lo asumimos nosotros, no tú.",
    },
    {
      question: "¿Cómo se hace la reposición de inventario?",
      answer: "Automáticamente. Cuando tu stock baja de cierto nivel, te contactamos para coordinar la reposición sin trámites complicados. Normalmente en 2-3 días hábiles.",
    },
    {
      question: "¿Cuánto gano por cada cepillo vendido?",
      answer: "Tu ganancia por unidad se define al momento de formalizar el programa. Usamos un esquema transparente: precio público sugerido menos el precio de consignación. Los detalles exactos los coordinamos en la llamada inicial.",
    },
    {
      question: "¿Necesito dedicarle tiempo o esfuerzo a las ventas?",
      answer: "Casi ninguno. El cepillo se recomienda naturalmente durante la consulta cuando el paciente pregunta sobre higiene bucal. No requieres ser vendedor — solo hacer lo que ya haces: dar buen consejo.",
    },
    {
      question: "¿Puedo participar si tengo varios consultorios?",
      answer: "Sí, de hecho es ideal. Podemos colocar exhibidores en cada uno de tus consultorios con el mismo esquema de consignación.",
    },
  ];

  return (
    <div className="bg-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0D0F14] via-[#1a1040] to-[#0D0F14] overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-spark/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-wide uppercase mb-5">
              Programa para Dentistas
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
              Ofrece Smilo en tu consultorio y{" "}
              <span className="bg-gradient-to-r from-spark to-candy bg-clip-text text-transparent">
                genera un ingreso extra
              </span>{" "}
              en cada cita
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Sin inversión de inventario. Nosotros colocamos los cepillos en tu consultorio —{" "}
              <strong className="text-white">tú solo recomiendas y ganas</strong> por cada unidad vendida.
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base shadow-lg shadow-spark/30 transition-transform hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, hsl(22,92%,60%), hsl(340,85%,62%))" }}
            >
              Quiero ser distribuidor
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img
              src="/dentistas-hero.webp"
              alt="Exhibidor Smilo en un consultorio dental real"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 leading-none">Modelo</p>
                <p className="text-sm font-bold text-gray-900">Cero inversión inicial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5 py-8 text-center">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            <span className="text-accent font-bold">Cada semana recibimos solicitudes de dentistas para vender Smilo</span>{" "}
            — tanto que decidimos crear un programa formal para que tú también puedas aprovechar esta oportunidad.
          </p>
        </div>
      </section>

      {/* ── POR QUÉ UNIRSE ───────────────────────────────────────────────── */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Por qué dentistas eligen Smilo
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Un programa diseñado para que el ingreso extra no te cueste ni tiempo ni dinero.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Package size={24} />,
                color: "bg-accent/10 text-accent",
                title: "Cero inversión de inventario",
                desc: "Colocamos los cepillos en tu consultorio sin costo inicial. Tú solo ganas por cada unidad vendida.",
              },
              {
                icon: <Star size={24} />,
                color: "bg-spark/10 text-spark",
                title: "Marca en la que los pacientes confían",
                desc: "Smilo ya está en consultorios de todo México. Tus pacientes la conocen o la descubrirán con tu recomendación.",
              },
              {
                icon: <Stethoscope size={24} />,
                color: "bg-candy/10 text-candy",
                title: "Fácil de recomendar en consulta",
                desc: "Sin scripts complicados. En el momento natural de hablar de higiene bucal, el cepillo se recomienda solo.",
              },
              {
                icon: <Gift size={24} />,
                color: "bg-green-100 text-green-600",
                title: "Kit de punto de venta incluido",
                desc: "Exhibidor de mostrador, folletos para pacientes y todo el material para presentar la marca profesionalmente.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-gradient-to-br from-gray-900 to-[#1a1040]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Cómo funciona el programa
            </h2>
            <p className="text-gray-400 text-lg">3 pasos. Sin complicaciones.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line desktop */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-0.5 bg-gradient-to-r from-accent via-spark to-candy" />

            {[
              {
                step: "01",
                color: "bg-accent",
                title: "Solicita unirte al programa",
                desc: "Llena el formulario al final de esta página. Un asesor Smilo te contactará en menos de 24 horas para conocer tu consultorio.",
              },
              {
                step: "02",
                color: "bg-spark",
                title: "Colocamos el inventario inicial",
                desc: "Llevamos a tu consultorio el exhibidor, el kit de materiales y el inventario inicial — completamente sin costo para ti.",
              },
              {
                step: "03",
                color: "bg-candy",
                title: "Recomienda y gana",
                desc: "Cuando un paciente compra un Smilo, tú recibes tu ganancia automáticamente. La reposición es automática.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${s.color} flex items-center justify-center text-white font-black text-xl mb-5 relative z-10 shadow-lg`}>
                  {s.step}
                </div>
                <h3 className="font-bold text-white text-base mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉRMINOS / CONDICIONES ───────────────────────────────────────── */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Términos del programa</h2>
            <p className="text-gray-500 text-base">Todo claro desde el inicio — sin letras chicas.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Precio público sugerido", value: "[A definir con tu asesor]", icon: <TrendingUp size={18} /> },
              { label: "Tu ganancia por unidad", value: "[A definir con tu asesor]", icon: <CheckCircle size={18} /> },
              { label: "Reposición de inventario", value: "Automática — sin trámites", icon: <Clock size={18} /> },
              { label: "Tiempo de entrega reposición", value: "2-3 días hábiles", icon: <Package size={18} /> },
              { label: "Garantía del producto", value: "12 meses para el paciente", icon: <Star size={18} /> },
              { label: "Modelo de inventario", value: "Consignación — sin inversión", icon: <Users size={18} /> },
            ].map((t) => (
              <div key={t.label} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-accent shadow-sm shrink-0 border border-gray-100">
                  {t.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{t.label}</p>
                  <p className="text-gray-900 font-semibold text-sm">{t.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Los valores con "[A definir]" se personalizan en tu primera llamada con el equipo Smilo.
          </p>
        </div>
      </section>

      {/* ── KIT DE ARRANQUE ──────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-gradient-to-r from-accent/5 via-white to-spark/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Qué incluye tu kit de arranque</h2>
            <p className="text-gray-500 text-base">Todo lo que necesitas para empezar a vender desde el primer día.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                emoji: "🪥",
                title: "Inventario inicial",
                desc: "Unidades de Cepillo Eléctrico Smilo listas para venta, colocadas en consignación.",
              },
              {
                emoji: "🗂️",
                title: "Exhibidor de mostrador",
                desc: "Display de madera y acrílico con branding Smilo, diseñado para consultorios. Atractivo y compacto.",
              },
              {
                emoji: "📋",
                title: "Folletos para pacientes",
                desc: "Material impreso explicando los beneficios del cepillo — para dejar en la sala de espera o dar en consulta.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Lo que dicen otros dentistas</h2>
            <p className="text-gray-500 text-base">Experiencias reales del programa.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "Pensé que iba a ser complicado manejar el inventario, pero Smilo lo hace todo. Solo me avisan cuando hay que reponer y el proceso es rapidísimo. Mis pacientes lo compran solos cuando lo ven en el mostrador.",
                name: "Dra. [Nombre Apellido]",
                clinic: "Clínica Dental [Nombre] — Ciudad de México",
                initials: "D",
              },
              {
                quote: "Lo mejor es que no tuve que arriesgar nada. Me llegó el exhibidor y las unidades, y en el primer mes ya habíamos vendido el inventario completo. Ya estamos en el segundo ciclo de reposición.",
                name: "Dr. [Nombre Apellido]",
                clinic: "Consultorio Dental [Nombre] — Guadalajara, Jalisco",
                initials: "D",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.clinic}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            * Testimonios de ejemplo — se actualizarán con reseñas reales de tu red de dentistas.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Preguntas frecuentes</h2>
            <p className="text-gray-500 text-base">Todo lo que necesitas saber antes de unirte.</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl px-6 shadow-sm divide-y divide-gray-100">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO ───────────────────────────────────────────────────── */}
      <section
        id="formulario-dentistas"
        className="py-20 px-5 bg-gradient-to-br from-[#0D0F14] via-[#1a1040] to-[#0D0F14] relative overflow-hidden"
      >
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-spark/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Únete al programa Smilo para dentistas
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Llena el formulario y un asesor te contactará en menos de 24 horas para coordinar los detalles.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
          >
            {[
              { name: "nombre", label: "Tu nombre completo", placeholder: "Ej. Dra. Laura Martínez", type: "text" },
              { name: "consultorio", label: "Nombre del consultorio o clínica", placeholder: "Ej. Clínica Dental Sonrisa Feliz", type: "text" },
              { name: "ciudad", label: "Ciudad", placeholder: "Ej. Ciudad de México", type: "text" },
              { name: "telefono", label: "Teléfono de contacto", placeholder: "Ej. 55 1234 5678", type: "tel" },
              { name: "email", label: "Correo electrónico", placeholder: "tu@correo.com", type: "email" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition placeholder:text-gray-300"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-full font-bold text-white text-base mt-2 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-spark/30"
              style={{ background: "linear-gradient(135deg, hsl(22,92%,60%), hsl(340,85%,62%))" }}
            >
              {sending ? "Enviando…" : "Enviar solicitud →"}
            </button>

            <p className="text-center text-xs text-gray-400 mt-1">
              Sin spam. Solo te contactamos para coordinar el programa.
            </p>
          </form>
        </div>
      </section>

      {/* ── FOOTER CTA STRIP ─────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-t border-gray-100 py-8 px-5 text-center">
        <p className="text-gray-500 text-sm">
          ¿Tienes preguntas antes de solicitar?{" "}
          <a
            href="mailto:hola@smilo.mx"
            className="text-accent font-semibold hover:underline"
          >
            Escríbenos a hola@smilo.mx
          </a>
        </p>
      </div>
    </div>
  );
}