"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio()

    // Set the source with proper error handling
    try {
      // First check if the file exists by making a HEAD request
      fetch("/audio/background-music.mp3", { method: "HEAD" })
        .then((response) => {
          if (response.ok) {
            // File exists, set the source
            audio.src = "/audio/background-music.mp3"
            audio.loop = true
            audio.volume = 0.5
            audio.preload = "auto"

            // Add event listeners for debugging
            audio.addEventListener("error", (e) => {
              console.error("Audio error:", e)
            })

            audio.addEventListener("canplaythrough", () => {
              console.log("Audio can play through")
            })

            audioRef.current = audio
          } else {
            console.error("Audio file not found:", response.status)
          }
        })
        .catch((error) => {
          console.error("Error checking audio file:", error)
        })
    } catch (error) {
      console.error("Error setting up audio:", error)
    }

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) {
      console.error("Audio element not initialized")
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Some browsers require user interaction before playing audio
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started successfully")
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error("Audio playback failed:", error)
            // Try to load the audio again with a different approach
            audioRef.current.load()
            setTimeout(() => {
              const retryPlay = audioRef.current?.play()
              if (retryPlay) {
                retryPlay.catch((e) => console.error("Retry playback failed:", e))
              }
            }, 1000)
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
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  )
}
