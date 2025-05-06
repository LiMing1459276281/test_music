
"use client"

import React from 'react';
import MusicCaseCard from './MusicCaseCard';
import { usePathname } from 'next/navigation';

interface MusicCase {
  id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
}
interface MusicCaseGridProps {
  musicCases: MusicCase[];
}
export default function MusicCaseGrid ({ dictionary }: { dictionary: any })  {
  const musicCases :MusicCase[]= [
    {
      id: "1",
      title: "Ambient Serenity",
      prompt: "Create a relaxing ambient track with piano and soft synthesizers, inspired by Brian Eno's work",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      audioUrl: "https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "3:24"
    },
    {
      id: "2",
      title: "Techno Dreams",
      prompt: "Generate an energetic techno track with pulsating beats and atmospheric pads, suitable for a dance party",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      audioUrl: "https://soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: "4:12"
    },
    {
      id: "3",
      title: "Lo-Fi Study Session",
      prompt: "Create a lo-fi hip hop beat perfect for studying, with soft drums, vinyl crackle, and jazzy chords",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      audioUrl: "https://soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: "2:56"
    },
    {
      id: "4",
      title: "Cinematic Intensity",
      prompt: "Generate an epic orchestral track with dramatic string sections and powerful percussion, suitable for a movie trailer",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      audioUrl: "https://soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      duration: "3:48"
    },
    {
      id: "5",
      title: "Cinematic Intensity",
      prompt: "Generate an epic orchestral track with dramatic string sections and powerful percussion, suitable for a movie trailer",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      audioUrl: "https://soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      duration: "3:48"
    },
  ]

  const pathname = usePathname();

  return (
    <section id="gallery" className="py-20 bg-black/40 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20 opacity-60" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center space-y-6 mb-16">
          {pathname && !pathname.includes('/examples') && (
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
              {dictionary.title}
            </h2>
          )}
          <p className="text-gray-400 text-lg max-w-[800px] mx-auto leading-relaxed">
            {dictionary.description}
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
          {musicCases.map((musicCase) => (
            <div key={musicCase.id} className="transform hover:scale-105 transition-all duration-300">
              <MusicCaseCard musicCase={musicCase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
