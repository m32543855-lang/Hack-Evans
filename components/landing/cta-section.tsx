"use client"

import { ChevronRight } from "lucide-react"

interface CTASectionProps {
  data: Record<string, any>
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}

export default function CTASection({ data, onPrimaryAction, onSecondaryAction }: CTASectionProps) {
  const titulo         = data.titulo         || "Comienza tu preparacion hoy"
  const descripcion    = data.descripcion    || "Unete a mas de 15,000 docentes que confian en nuestra plataforma."
  const ctaPrimario    = data.ctaPrimario    || "Crear cuenta gratis"
  const ctaPrimarioHref = data.ctaPrimarioHref || "/registro"
  const ctaSecundario  = data.ctaSecundario  || ""
  const ctaSecundarioHref = data.ctaSecundarioHref || "#precios"

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(232,57,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(232,57,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">{titulo}</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">{descripcion}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onPrimaryAction ? (
            <button
              type="button"
              onClick={onPrimaryAction}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-[#ff4433] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(232,57,42,0.4)] transition-all duration-300"
            >
              {ctaPrimario}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <a
              href={ctaPrimarioHref}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-[#ff4433] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(232,57,42,0.4)] transition-all duration-300"
            >
              {ctaPrimario}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {ctaSecundario && (
            onSecondaryAction ? (
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
              >
                {ctaSecundario}
              </button>
            ) : (
              <a
                href={ctaSecundarioHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
              >
                {ctaSecundario}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  )
}
