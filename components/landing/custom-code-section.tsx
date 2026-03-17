"use client"

interface CustomCodeSectionProps {
  data: Record<string, any>
}

export default function CustomCodeSection({ data }: CustomCodeSectionProps) {
  const html = data.html || ""
  if (!html.trim()) return null
  return (
    <section className="py-4 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  )
}
