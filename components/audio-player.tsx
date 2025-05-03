"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { AudioVisualizer } from "@/components/audio-visualizer"

type AudioPlayerProps = {
  audioUrl: string
  className?: string
  autoPlay?: boolean
  onPlayStateChange?: (isPlaying: boolean) => void
}

export function AudioPlayer({ audioUrl, className, autoPlay = true, onPlayStateChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Обновляем аудио при изменении URL
  useEffect(() => {
    if (audioRef.current) {
      setIsLoading(true)
      audioRef.current.load()
      if (autoPlay) {
        audioRef.current.play().catch((err) => console.error("Autoplay failed:", err))
      }
    }
  }, [audioUrl, autoPlay])

  // Обработчики событий аудио
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      if (onPlayStateChange) onPlayStateChange(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      if (onPlayStateChange) onPlayStateChange(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
      if (onPlayStateChange) onPlayStateChange(false)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [onPlayStateChange])

  // Обработчики управления
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((err) => console.error("Play failed:", err))
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleDownload = () => {
    if (!audioUrl) return

    const link = document.createElement("a")
    link.href = audioUrl
    link.download = `audio-response-${Date.now()}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={togglePlay} disabled={isLoading}>
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      {isPlaying && <AudioVisualizer isPlaying={isPlaying} className="mx-1" />}

      <div className="hidden sm:flex items-center space-x-2">
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={toggleMute}>
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <div className="w-20">
          <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} className="h-1" />
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={handleDownload}
        title="Скачать аудио"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  )
}
