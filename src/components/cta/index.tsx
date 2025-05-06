'use client'
import { ScrollButton } from "@/components/customUI/scroll-button";
export default async function CTASection({ dictionary }: { dictionary: any }) {
  return (
    <section className="relative py-20 bg-gray-900/80 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30" />
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {dictionary.title}
        </h2>
        <p className="text-xl mb-8 text-gray-300">{dictionary.description}</p>
        <ScrollButton 
          targetId="create-form"
          size="lg" 
          variant="secondary" 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
        >
          {dictionary.button}
        </ScrollButton>
      </div>
    </section>
  )
}