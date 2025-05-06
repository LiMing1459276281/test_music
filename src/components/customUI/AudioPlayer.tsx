
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
interface AudioPlayerProps {
  audioUrl: string;
  duration: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('loadedmetadata', () => {
      setAudioDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    
    // Cleanup
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Calculate progress percentage
  const progressValue = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0;

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlayPause}
          className="w-8 h-8 flex items-center justify-center bg-music-primary rounded-full text-white hover:bg-opacity-80 transition-all"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="text-sm text-gray-600 dark:text-gray-300 min-w-[40px]">
          {formatTime(currentTime)}
        </div>
        <Progress value={progressValue} className="h-2 flex-grow" />
        <div className="text-sm text-gray-600 dark:text-gray-300 min-w-[40px]">
          {duration || formatTime(audioDuration)}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
