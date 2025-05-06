"use client"
import { useEffect, useState,useRef } from "react"
import { ScrollButton } from "@/components/customUI/scroll-button"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Music, Disc, Headphones, Play, Pause } from "lucide-react"
import SplashCursor from '@/components/reactrbits/SplashCursor'
export default function Hero({ dictionary }: { dictionary: any }) {
  const [isClient, setIsClient] = useState(false)
  // 添加音频相关状态
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // 在组件顶部添加状态
    const [waveHeights, setWaveHeights] = useState<number[]>(
    Array.from({ length: 32 }, () => Math.random() * 60 + 20)
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(Array.from({ length: 32 }, () => Math.random() * 60 + 20));
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  const [demoTrack] = useState({
    audioUrl: "https://kieaifiles.erweima.ai/M2FhZDZlOGMtNTAyOC00YjJiLTk0YTMtNDlhMzhjZTE3MGE0.mp3",
    duration: 134.16,
    title: "Deep Focus Beat"
  })

  // 格式化时间
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative px-1 py-16 md:py-24 lg:py-32 mb-10 overflow-hidden">
      {/* <SplashCursor /> */}
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
        <div className="absolute container mx-auto inset-0 bg-gradient-to-b from-gray-800 backdrop-blur-md rounded-lg" />
      </div>

      {/* Main content with improved spacing */}
      <div className="relative z-10 max-w-[90rem] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left side content with enhanced typography and animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 text-left space-y-8 px-4 lg:px-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 leading-tight tracking-tight">
            {dictionary.title || "AI Music Generator"}
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wide">
            {dictionary.subtitle || "Create custom music with AI"}
          </h2>

          <p className="text-gray-200 dark:text-gray-300 text-xl max-w-2xl leading-relaxed">
            {dictionary.description ||
              "Generate unique music tracks in seconds with our advanced AI. Choose your style, set the mood, and let our AI create the perfect soundtrack for your projects."}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-10">
            <ScrollButton
              targetId="create-form"
              variant="default"
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-sm transition-all duration-300 shadow-xl hover:shadow-indigo-500/50 flex items-center justify-center gap-2 text-lg font-medium transform hover:scale-105"
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
              className="px-8 py-3.5 border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 rounded-sm transition-all duration-300 text-lg font-medium transform hover:scale-105"
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
                {waveHeights.map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                    initial={{ height: '20%' }}
                    animate={{ 
                      height: `${height}%` 
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-white/90">
                  <span>{demoTrack.title}</span>
                  <span>{formatTime(currentTime)} / {formatTime(demoTrack.duration)}</span>
                </div>

                <audio
                  ref={audioRef}
                  src={demoTrack.audioUrl}
                  onTimeUpdate={() => {
                    if (audioRef.current) {
                      setCurrentTime(audioRef.current.currentTime)
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                />
                
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-music-primary to-music-accent rounded-full"
                    animate={{ 
                      width: `${(currentTime / demoTrack.duration) * 100}%` 
                    }}
                    transition={{
                      duration: 0.1,
                      ease: "linear"
                    }}
                  />
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    className="bg-music-primary bg-white/10 hover:bg-music-primary/90 text-white flex items-center gap-2"
                    onClick={() => {
                      if (audioRef.current) {
                        if (isPlaying) {
                          audioRef.current.pause()
                        } else {
                          audioRef.current.play()
                        }
                        setIsPlaying(!isPlaying)
                      }
                    }}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Play
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

        {/* Floating decorative elements */}
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -20, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.2 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-10 left-10 hidden lg:block z-0"
      >
        <div className="">
          <Music className="w-16 h-16 rotate-[-15deg] text-purple-500" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 20, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.6 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-10 hidden lg:block z-0"
      >
        <div className=" ">
          <Headphones className="w-20 h-20 rotate-12 text-pink-500" />
        </div>
      </motion.div>
    </section>
  )
}
