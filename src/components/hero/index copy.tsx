"use client"
import { useEffect, useState } from "react"
import { ScrollButton } from "@/components/customUI/scroll-button"
import { motion } from "framer-motion"

// Sample music data for the player cards
const sampleTracks = [
  {
    id: 1,
    title: "Summer Breeze",
    genre: "Pop",
    duration: 182, // in seconds
    coverColor: "from-pink-500 to-orange-400",
    audioUrl: "/assets/audio/sample1.mp3",
  },
  {
    id: 2,
    title: "Midnight Jazz",
    genre: "Jazz",
    duration: 215,
    coverColor: "from-blue-500 to-indigo-600",
    audioUrl: "/assets/audio/sample2.mp3",
  },
  {
    id: 3,
    title: "Electronic Dreams",
    genre: "Electronic",
    duration: 198,
    coverColor: "from-cyan-400 to-blue-500",
    audioUrl: "/assets/audio/sample3.mp3",
  },
  {
    id: 4,
    title: "Acoustic Memories",
    genre: "Folk",
    duration: 176,
    coverColor: "from-amber-400 to-yellow-500",
    audioUrl: "/assets/audio/sample4.mp3",
  },
  {
    id: 5,
    title: "Epic Orchestra",
    genre: "Classical",
    duration: 243,
    coverColor: "from-purple-500 to-violet-600",
    audioUrl: "/assets/audio/sample5.mp3",
  },
]

export default function Hero({ dictionary }: { dictionary: any }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative px-4 py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Dynamic light effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-gray-900/95" />
      </div>

      {/* Floating music players - only render on client side to avoid hydration issues */}
      {isClient && (
        <>
    
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 text-left space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 leading-tight">
            {dictionary.title || "AI Music Generator"}
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {dictionary.subtitle || "Create custom music with AI"}
          </h2>

          <p className="text-gray-300 text-lg max-w-xl">
            {dictionary.description ||
              "Generate unique music tracks in seconds with our advanced AI. Choose your style, set the mood, and let our AI create the perfect soundtrack for your projects."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <ScrollButton
              targetId="create-form"
              variant="default"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2 text-lg font-medium"
            >
              {dictionary.buttons?.create || "Create Music"}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </ScrollButton>

            <ScrollButton
              targetId="steps-section"
              variant="outline"
              className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300 text-lg font-medium"
            >
              {dictionary.buttons?.tutorial || "How It Works"}
            </ScrollButton>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
