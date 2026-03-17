"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Play, ChevronRight, Users, Award, BookOpen,
  CheckCircle2, Star, Sparkles
} from "lucide-react"
import { useCMS, type CMSHeroConfig, type CMSTextStyle } from "@/hooks/use-cms"
import StudioInlineText from "@/components/studio/studio-inline-text"

interface HeroSectionProps {
  onGetStarted?: () => void
  onWatchDemo?: () => void
  dataOverride?: CMSHeroConfig
  editMode?: boolean
  onFieldChange?: (field: keyof Pick<CMSHeroConfig, "badge" | "titulo" | "descripcion" | "ctaPrimario" | "ctaSecundario">, value: string) => void
  onTextStyleChange?: (field: "badge" | "titulo" | "descripcion" | "ctaPrimario" | "ctaSecundario", style: CMSTextStyle) => void
  onFeatureChange?: (index: number, value: string) => void
  onActivate?: () => void
}

const STAT_ICONS = [Users, Award, BookOpen]

export default function HeroSection({
  onGetStarted,
  onWatchDemo,
  dataOverride,
  editMode = false,
  onFieldChange,
  onTextStyleChange,
  onFeatureChange,
  onActivate,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { config } = useCMS()
  const hero = dataOverride ?? config.hero
  const textStyles = hero.textStyles ?? {}

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <StudioInlineText
                as="span"
                value={hero.badge}
                editable={editMode}
                onActivate={onActivate}
                onChange={(value) => onFieldChange?.("badge", value)}
                formatting={textStyles.badge}
                onFormattingChange={(style) => onTextStyleChange?.("badge", style)}
                className="text-sm font-semibold text-primary"
                editorClassName="min-w-[14rem] text-sm font-semibold text-primary"
              />
            </div>

            <StudioInlineText
              as="h1"
              value={hero.titulo}
              editable={editMode}
              multiline
              onActivate={onActivate}
              onChange={(value) => onFieldChange?.("titulo", value)}
              formatting={textStyles.titulo}
              onFormattingChange={(style) => onTextStyleChange?.("titulo", style)}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6"
              editorClassName="font-display text-3xl md:text-5xl text-foreground leading-[1.1]"
            />

            <StudioInlineText
              as="p"
              value={hero.descripcion}
              editable={editMode}
              multiline
              onActivate={onActivate}
              onChange={(value) => onFieldChange?.("descripcion", value)}
              formatting={textStyles.descripcion}
              onFormattingChange={(style) => onTextStyleChange?.("descripcion", style)}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8"
              editorClassName="max-w-xl text-lg text-muted-foreground"
            />

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {hero.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <StudioInlineText
                    as="span"
                    value={feature}
                    editable={editMode}
                    onActivate={onActivate}
                    onChange={(value) => onFeatureChange?.(i, value)}
                    className="flex-1"
                  />
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-[#ff4433] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(232,57,42,0.4)] transition-all duration-300"
              >
                <StudioInlineText
                  as="span"
                  value={hero.ctaPrimario}
                  editable={editMode}
                  onActivate={onActivate}
                  onChange={(value) => onFieldChange?.("ctaPrimario", value)}
                  formatting={textStyles.ctaPrimario}
                  onFormattingChange={(style) => onTextStyleChange?.("ctaPrimario", style)}
                  allowLink={false}
                  editorClassName="min-w-[10rem] text-sm font-bold text-white"
                />
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onWatchDemo}
                className="group flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
              >
                <Play className="w-5 h-5" />
                <StudioInlineText
                  as="span"
                  value={hero.ctaSecundario}
                  editable={editMode}
                  onActivate={onActivate}
                  onChange={(value) => onFieldChange?.("ctaSecundario", value)}
                  formatting={textStyles.ctaSecundario}
                  onFormattingChange={(style) => onTextStyleChange?.("ctaSecundario", style)}
                  allowLink={false}
                  editorClassName="min-w-[10rem] text-sm font-semibold text-foreground"
                />
              </button>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 mt-8 pt-8 border-t border-border">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5C842] text-[#F5C842]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">+2,000 resenas positivas</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Main Card */}
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl animate-glow-red">
              {/* Preview Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Simulador QSM</div>
                    <div className="text-xs text-muted-foreground">En progreso</div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-500/15 text-green-500 text-xs font-bold rounded-full">
                  EN VIVO
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="text-foreground font-bold">75%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-[#ff6b5e] rounded-full transition-all duration-1000" />
                </div>
              </div>

              {/* Question Preview */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                <div className="text-xs text-muted-foreground mb-2">Pregunta 15 de 20</div>
                <p className="text-sm text-foreground leading-relaxed">
                  Segun el curriculo nacional, cual es el enfoque pedagogico principal en la educacion basica?
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {["Constructivismo", "Conductismo", "Cognitivismo", "Conectivismo"].map((opt, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                      i === 0
                        ? "border-green-500 bg-green-500/10 text-green-500"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="mr-2 font-bold">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {i === 0 && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">92%</div>
                  <div className="text-xs text-muted-foreground">Puntaje promedio</div>
                </div>
              </div>
            </div>

            {/* Floating Users Card */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-3 shadow-xl animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card" />
                  ))}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-foreground">+124</div>
                  <div className="text-muted-foreground">en linea</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-6 mt-20 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {hero.stats.map((stat, i) => {
            const Icon = STAT_ICONS[i] ?? Users
            return (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-display text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
