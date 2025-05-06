/*
 * @Description: 
 * @Author: rendc
 * @Date: 2025-04-30 21:32:46
 * @LastEditors: rendc
 * @LastEditTime: 2025-05-01 09:10:19
 */

"use client"
import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Music } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
interface MusicCase {
  id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
}
interface MusicCaseCardProps {
  musicCase: MusicCase;
}

const MusicCaseCard: React.FC<MusicCaseCardProps> = ({ musicCase }) => {
  const { title, prompt, imageUrl, audioUrl, duration } = musicCase;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-white/5 bg-gray-800/50 backdrop-blur-lg h-full flex flex-col">
      <CardHeader className="p-0">
        <AspectRatio ratio={1/1}>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-music-primary/20 to-music-secondary/20">
              <Music size={48} className="text-purple-500" />
            </div>
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 flex-grow bg-gray-700/20">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-purple-500">{title}</h3>
      </CardContent>
      <CardFooter className="p-4 pt-0 bg-gray-700/20">
        <AudioPlayer audioUrl={audioUrl} duration={duration} />
      </CardFooter>
    </Card>
  );
};

export default MusicCaseCard;