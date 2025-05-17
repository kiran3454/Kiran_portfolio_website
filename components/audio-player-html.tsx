"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerHtml() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Check if the audio file exists
    fetch("/audio/background-music.mp3", { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          setError(`Audio file not found: ${response.status} ${response.statusText}`)
          console.error(`Audio file not found: ${response.status} ${response.statusText}`)
        }
      })
      .catch((err) => {
        setError(`Error checking audio file: ${err.message}`)
        console.error("Error checking audio file:", err)
      })
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Clear any previous errors
      setError(null)

      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started successfully")
            setIsPlaying(true)
          })
          .catch((err) => {
            const errorMessage = `Playback failed: ${err.message || "Unknown error"}`
            setError(errorMessage)
            console.error(errorMessage, err)
          })
      }
    }
  }

  const handleCanPlay = () => {
    console.log("Audio can play through")
    setIsLoaded(true)
  }

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audioElement = e.currentTarget

    // Get detailed error information
    let errorMessage = "Unknown audio error"

    if (audioElement.error) {
      switch (audioElement.error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = "You aborted the audio playback"
          break
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = "A network error caused the audio download to fail"
          break
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = "The audio playback was aborted due to a corruption problem"
          break
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = "The audio format is not supported by your browser"
          break
        default:
          errorMessage = `An unknown error occurred: ${audioElement.error.message}`
      }
    }

    setError(errorMessage)
    console.error("Audio error:", errorMessage, audioElement.error)
  }

  return (
    <>
      <audio ref={audioRef} onCanPlay={handleCanPlay} onError={handleError} preload="auto" loop>
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300"
        onClick={toggleAudio}
        title={isPlaying ? "Mute music" : "Play music"}
        disabled={!isLoaded && !error}
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>

      {error && (
        <div className="fixed bottom-24 left-8 z-50 bg-red-900/80 text-white text-xs p-2 rounded max-w-xs">{error}</div>
      )}
    </>
  )
}
