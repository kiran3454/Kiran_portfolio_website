"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerCDN() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(false)
  const [showError, setShowError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Use a reliable CDN source or create audio element with multiple sources
    const setupAudio = () => {
      if (audioRef.current) {
        // Free ambient music from various sources
        const cdnSources = [
          "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Example
          "https://archive.org/download/testmp3testfile/mpthreetest.mp3", // Archive.org test file
          // Add your own CDN URLs here
        ]

        // Try to load from CDN
        audioRef.current.addEventListener("canplaythrough", () => {
          setAudioAvailable(true)
        })

        audioRef.current.addEventListener("error", () => {
          console.log("CDN audio failed to load")
          setAudioAvailable(false)
        })

        // Set a test source
        audioRef.current.src = cdnSources[1] // Using archive.org test file
      }
    }

    setupAudio()
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.log("Playback failed:", err)
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
          })
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} preload="metadata" loop crossOrigin="anonymous" />

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300"
        onClick={toggleAudio}
        title={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>

      {showError && (
        <div className="fixed bottom-24 left-8 z-50 bg-black/80 text-white text-xs p-2 rounded max-w-xs">
          Audio not available
        </div>
      )}
    </>
  )
}
