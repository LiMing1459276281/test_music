"use client"

import * as React from "react"
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { usePathname } from 'next/navigation';
import { Music, Play, Pause, Download } from "lucide-react"

const examples = [
    {
      id: 1,
      image: "/assets/banner1.png",
      audioUrl: "/assets/audio1.mp3",
      title: "Ambient Serenity",
      duration: "3:24",
      prompt: 'Create a relaxing ambient track with piano and soft synthesizers, inspired by Brian Eno\'s work'
    },
    {
      id: 2,
      image: "/assets/banner2.png",
      audioUrl: "/assets/audio2.mp3",
      title: "Techno Dreams",
      duration: "4:12",
      prompt: 'Generate an energetic techno track with pulsating beats and atmospheric pads, suitable for a dance party'
    },
    {
      id: 3,
      image: "/assets/banner3.png",
      audioUrl: "/assets/audio3.mp3",
      title: "Lo-Fi Study Session",
      duration: "2:56",
      prompt: 'Create a lo-fi hip hop beat perfect for studying, with soft drums, vinyl crackle, and jazzy chords'
    },
    {
      id: 4,
      image: "/assets/banner4.png",
      audioUrl: "/assets/audio4.mp3",
      title: "Cinematic Intensity",
      duration: "3:48",
      prompt: 'Generate an epic orchestral track with dramatic string sections and powerful percussion, suitable for a movie trailer'
    }
  ]

export default function ExampleCarousel({ dictionary }: { dictionary: any }) {
  const [api, setApi] = React.useState<any>()
  const plugin = React.useMemo(() => Autoplay({ delay: 3000, stopOnInteraction: false }), [])
  const pathname = usePathname();
  return (
    <section id="gallery" className="py-16 rounded-tr-[60px] rounded-bl-bl-[60px] bg-gray-900/80 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/action-figure-bg.jpg')] bg-cover bg-center opacity-10" />
      
      <div className="container  mx-auto px-4 md:px-6 max-w-8xl relative z-10">
        <div className="text-center space-y-4 mb-12">
          {pathname && !pathname.includes('/examples') && (
            <h2 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              {dictionary.title}
            </h2>
          )}
          <p className="text-gray-300 max-w-[700px] mx-auto">
            {dictionary.description}
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="relative w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin]}
        >
          <CarouselContent className="gap-4">
            {examples.map((example) => (
              <CarouselItem
                key={example.id}
                className="basis-[280px] md:basis-[300px] min-w-0 group"
              >
                <Card className="bg-gray-800/50 backdrop-blur border-gray-700 hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <CardContent className="p-4">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
                      <Image
                        src={example.image}
                        alt={`Example ${example.id}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 280px, 300px"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                          <Play className="w-5 h-5" />
                        </button>
                        <span className="ml-2 text-gray-300">{example.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mt-2">{example.title}</h3>
                    <p className="text-sm text-gray-400">{example.prompt}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-gray-800/50 backdrop-blur border-gray-700 hover:bg-purple-500/50" />
          <CarouselNext className="right-2 bg-gray-800/50 backdrop-blur border-gray-700 hover:bg-purple-500/50" />
        </Carousel>
      </div>
    </section>
  )
}

