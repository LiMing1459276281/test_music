"use client"
import { useEffect, useState } from "react"
import { ScrollButton } from "@/components/customUI/scroll-button"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Music, Disc, Headphones } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Hero({ dictionary }: { dictionary: any }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Enhanced background elements with more dramatic effects */}
      <div className="absolute inset-0">
        {/* Enhanced dynamic light effects with more dramatic colors */}
        <div className="absolute top-0 left-0 w-full h-full opacity-80">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        {/* Subtle grid background with reduced opacity */}
        <div className="absolute inset-0 bg-grid-white/[0.03]" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/80 to-background" />
      </div>

      {/* Main content with improved spacing */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left side content with enhanced typography and animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 text-left space-y-7"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 leading-tight">
            {dictionary.title || "AI Music Generator"}
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            {dictionary.subtitle || "Create custom music with AI"}
          </h2>

          <p className="text-gray-200 dark:text-gray-300 text-lg max-w-xl leading-relaxed">
            {dictionary.description ||
              "Generate unique music tracks in seconds with our advanced AI. Choose your style, set the mood, and let our AI create the perfect soundtrack for your projects."}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-8">
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

        {/* Right side - Interactive sound visualization and visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="lg:w-1/2 flex justify-center lg:justify-end"
        >
          <Card className="w-full max-w-md relative overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-music-primary/20 to-music-secondary/10 z-0"></div>
            
            {/* Decorative sound waves */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Disc className="h-8 w-8 text-music-primary mr-2 animate-[spin_8s_linear_infinite]" />
                  <h3 className="text-xl font-bold text-white">AI Music Studio</h3>
                </div>
                <div className="flex gap-2">
                  <Headphones className="h-5 w-5 text-music-secondary" />
                  <Music className="h-5 w-5 text-music-accent" />
                </div>
              </div>
              
              {/* Sound wave visualization */}
              <div className="flex items-end justify-between h-32 gap-1 my-8">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-music-primary to-music-secondary rounded-full"
                    initial={{ height: '20%' }}
                    animate={{ 
                      height: `${Math.random() * 60 + 20}%` 
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.03,
                    }}
                  ></motion.div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-white/90">
                  <span>Deep Focus Beat</span>
                  <span>3:24</span>
                </div>
                
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-music-primary to-music-accent rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                  ></motion.div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" className="bg-white/10 text-white border-0 hover:bg-white/20">
                    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="19 20 9 12 19 4 19 20"></polygon>
                      <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                    Previous
                  </Button>
                  
                  <Button className="bg-music-primary hover:bg-music-primary/90 text-white">
                    Play
                    <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </Button>
                  
                  <Button variant="outline" className="bg-white/10 text-white border-0 hover:bg-white/20">
                    Next
                    <svg className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 4 15 12 5 20 5 4"></polygon>
                      <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
