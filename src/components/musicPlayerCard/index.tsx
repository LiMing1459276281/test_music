"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface Track {
  id: number
  title: string
  genre: string
  duration: number
  coverColor: string
  audioUrl: string
}

interface MusicPlayerCardProps {
  track: Track
  size?: "sm" | "md" | "lg"
  featured?: boolean
}

export function MusicPlayerCard({ track, size = "md", featured = false }: MusicPlayerCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(track.duration)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Size-based styling
  const sizeClasses = {
    sm: {
      container: "w-48",
      visualizer: "h-16",
      title: "text-sm",
      genre: "text-xs",
      controls: "p-2",
      playButton: "w-8 h-8",
      playIcon: "w-3 h-3",
      bars: "w-1",
    },
    md: {
      container: "w-64",
      visualizer: "h-24",
      title: "text-base",
      genre: "text-xs",
      controls: "p-3",
      playButton: "w-10 h-10",
      playIcon: "w-4 h-4",
      bars: "w-1.5",
    },
    lg: {
      container: "w-full",
      visualizer: "h-32",
      title: "text-lg",
      genre: "text-sm",
      controls: "p-4",
      playButton: "w-12 h-12",
      playIcon: "w-5 h-5",
      bars: "w-2",
    },
  }

  // Format time for display (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error)
      })
    }

    setIsPlaying(!isPlaying)
  }

  // Handle mute toggle
  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !audioRef.current.muted
    setIsMuted(!isMuted)
  }

  // Update time display
  const handleTimeUpdate = () => {
    if (!audioRef.current) return

    setCurrentTime(audioRef.current.currentTime)
  }

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return

    const newTime = Number(e.target.value)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Handle audio loaded
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return

    setDuration(audioRef.current.duration)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  return (
    <div
      className={`${sizeClasses[size].container} bg-gray-800/80 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 shadow-xl transition-transform hover:scale-[1.02] hover:shadow-purple-500/10`}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* Visualizer */}
      <div
        className={`${sizeClasses[size].visualizer} bg-gradient-to-br ${track.coverColor} rounded-t-lg overflow-hidden flex items-center justify-center p-2`}
      >
        <div className="flex items-end justify-center gap-1 h-full w-full">
          {/* Audio visualization bars */}
          {Array.from({ length: size === "sm" ? 12 : size === "md" ? 16 : 24 }).map((_, i) => (
            <div
              key={i}
              className={`${sizeClasses[size].bars} bg-white/70 rounded-t-sm ${
                isPlaying ? "animate-sound-wave" : "h-1"
              }`}
              style={{
                height: isPlaying ? `${Math.random() * 100}%` : "4px",
                animationDelay: `${i * 0.05}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Track info */}
      <div className="p-3">
        <h3 className={`${sizeClasses[size].title} font-medium text-white truncate`}>{track.title}</h3>
        <p className={`${sizeClasses[size].genre} text-gray-400`}>{track.genre}</p>

        {/* Only show progress bar on medium and large cards */}
        {(size === "md" || size === "lg" || featured) && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <span className="text-xs text-gray-500">{formatTime(duration)}</span>
          </div>
        )}

        {/* Controls */}
        <div className={`flex items-center justify-between mt-2 ${size === "sm" ? "gap-1" : "gap-2"}`}>
          {size !== "sm" && (
            <button onClick={toggleMute} className="p-1 rounded-full hover:bg-gray-700/50 transition-colors">
              {isMuted ? (
                <VolumeX className={`${sizeClasses[size].playIcon} text-gray-400`} />
              ) : (
                <Volume2 className={`${sizeClasses[size].playIcon} text-gray-300`} />
              )}
            </button>
          )}

          <button
            onClick={togglePlayPause}
            className={`${sizeClasses[size].playButton} rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center transition-colors`}
          >
            {isPlaying ? (
              <Pause className={`${sizeClasses[size].playIcon} text-white`} />
            ) : (
              <Play className={`${sizeClasses[size].playIcon} text-white`} />
            )}
          </button>

          {size === "lg" && <div className="text-xs text-gray-400 font-medium">AI Generated</div>}
        </div>
      </div>
    </div>
  )
}
