"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerAlternative() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // We'll use the HTML audio element directly in the DOM
    // This can help with some browser compatibility issues
    const audioElement = document.createElement("audio")
    audioElement.id = "background-music"
    audioElement.src = "/audio/background-music.mp3"
    audioElement.loop = true
    audioElement.volume = 0.5
    audioElement.preload = "auto"

    // Add event listeners for debugging and state management
    audioElement.addEventListener("canplaythrough", () => {
      console.log("Audio loaded and can play")
      setAudioLoaded(true)
    })

    audioElement.addEventListener("error", (e) => {
      console.error("Audio element error:", e)
    })

    // Append to document body but keep hidden
    document.body.appendChild(audioElement)
    audioRef.current = audioElement

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        document.body.removeChild(audioRef.current)
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) {
      console.error("Audio element not found")
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
            console.log("Audio started playing")
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error("Play failed:", error)
            // Try an alternative approach for browsers that block autoplay
            const userInteraction = () => {
              audioRef.current
                ?.play()
                .then(() => {
                  setIsPlaying(true)
                  document.removeEventListener("click", userInteraction)
                })
                .catch((e) => console.error("User interaction play failed:", e))
            }
            document.addEventListener("click", userInteraction, { once: true })
          })
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300"
      onClick={toggleAudio}
      title={isPlaying ? "Mute music" : "Play music"}
      disabled={!audioLoaded}
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  )
}
