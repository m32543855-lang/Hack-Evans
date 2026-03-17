"use client"

import { useEffect, useState } from "react"
import StudioInlineText from "@/components/studio/studio-inline-text"

interface FeatureCardItem {
  id: string
  emoji: string
  title: string
  description: string
  accentColor?: string
}

interface FeatureCardsSectionProps {
  data: Record<string, any>
  editMode?: boolean
  onActivate?: () => void
  onFieldChange?: (field: "titulo" | "descripcion", value: string) => void
  onItemChange?: (index: number, patch: Partial<FeatureCardItem>) => void
}

export default function FeatureCardsSection({
  data,
  editMode = false,
  onActivate,
  onFieldChange,
  onItemChange,
}: FeatureCardsSectionProps) {
  const [vis, setVis] = useState(false)
  useEffect(() => { setVis(true) }, [])

  const titulo     = data.titulo     || ""
  const descripcion = data.descripcion || ""
  const items      = (data.items as FeatureCardItem[]) || []
  const columns    = data.columns || 3

  const colsClass =
    columns === 2 ? "grid-cols-1 md:grid-cols-2" :
    columns === 4 ? "grid-cols-2 md:grid-cols-4" :
                    "grid-cols-1 md:grid-cols-3"

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {(titulo || descripcion) && (
          <div className={`text-center mb-10 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {titulo && (
              <StudioInlineText
                as="h2"
                value={titulo}
                editable={editMode}
                multiline
                onActivate={onActivate}
                onChange={(value) => onFieldChange?.("titulo", value)}
                className="font-display text-3xl md:text-4xl text-foreground mb-3"
                editorClassName="mx-auto max-w-3xl font-display text-3xl md:text-4xl text-foreground text-center"
              />
            )}
            {descripcion && (
              <StudioInlineText
                as="p"
                value={descripcion}
                editable={editMode}
                multiline
                onActivate={onActivate}
                onChange={(value) => onFieldChange?.("descripcion", value)}
                className="text-muted-foreground max-w-2xl mx-auto"
                editorClassName="mx-auto max-w-2xl text-center text-muted-foreground"
              />
            )}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-sm">
            Agrega tarjetas desde el editor
          </div>
        ) : (
          <div className={`grid ${colsClass} gap-6`}>
            {items.map((item, i) => {
              const color = item.accentColor || "#E8392A"
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border border-border bg-card/80 p-6 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {item.emoji && (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <StudioInlineText
                        as="span"
                        value={item.emoji}
                        editable={editMode}
                        onActivate={onActivate}
                        onChange={(value) => onItemChange?.(i, { emoji: value })}
                        className="leading-none"
                        editorClassName="min-w-[3rem] text-center text-2xl"
                      />
                    </div>
                  )}
                  {item.title && (
                    <StudioInlineText
                      as="h3"
                      value={item.title}
                      editable={editMode}
                      multiline
                      onActivate={onActivate}
                      onChange={(value) => onItemChange?.(i, { title: value })}
                      className="text-lg font-bold text-foreground mb-2"
                      editorClassName="text-lg font-bold text-foreground"
                    />
                  )}
                  {item.description && (
                    <StudioInlineText
                      as="p"
                      value={item.description}
                      editable={editMode}
                      multiline
                      onActivate={onActivate}
                      onChange={(value) => onItemChange?.(i, { description: value })}
                      className="text-sm text-muted-foreground"
                      editorClassName="text-sm text-muted-foreground"
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
