"use client"

import { useEffect, useRef, useState } from "react"

interface StatItem {
  id: string
  numero: string
  label: string
  icono: string
}

interface StatsSectionProps {
  data: Record<string, any>
}

export default function StatsSection({ data }: StatsSectionProps) {
  const titulo  = data.titulo  || ""
  const items   = (data.items as StatItem[]) || []
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const cols = items.length <= 2 ? "grid-cols-2" : items.length === 3 ? "grid-cols-3" : items.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"

  return (
    <section ref={ref} className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {titulo && (
          <h2 className={`font-display text-3xl md:text-4xl text-foreground text-center mb-10 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {titulo}
          </h2>
        )}
        {items.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-sm">
            Agrega estadísticas desde el editor de Landing Page
          </div>
        ) : (
          <div className={`grid ${cols} gap-6`}>
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`text-center group transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {item.icono && (
                  <div className="text-4xl mb-3">{item.icono}</div>
                )}
                <div className="font-display text-4xl md:text-5xl text-foreground mb-1">{item.numero}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
