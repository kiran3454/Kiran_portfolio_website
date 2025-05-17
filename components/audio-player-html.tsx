"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerHtml() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Try to preload the audio file to check if it exists
    const checkAudio = async () => {
      try {
        const response = await fetch("/audio/background-music.mp3", { method: "HEAD" })
        if (!response.ok) {
          console.error(`Audio file not found: ${response.status}`)
          setAudioError(`Audio file not available (${response.status})`)
        } else {
          setIsLoaded(true)
        }
      } catch (err) {
        console.error("Error checking audio file:", err)
        setAudioError("Audio file not available")
      }
    }

    checkAudio()
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current || audioError) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Clear any previous errors
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.error("Playback failed:", err)
            setAudioError("Audio playback failed")
          })
      }
    }
  }

  // If there's an error, still render the button but disable it
  return (
    <>
      {!audioError && (
        <audio ref={audioRef} preload="auto" loop onError={() => setAudioError("Audio file not available")}>
          <source src="/audio/background-music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300"
        onClick={toggleAudio}
        title={isPlaying ? "Mute music" : "Play music"}
        disabled={!!audioError}
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>

      {audioError && (
        <div className="fixed bottom-24 left-8 z-50 bg-red-900/80 text-white text-xs p-2 rounded max-w-xs opacity-70">
          {audioError}
        </div>
      )}
    </>
  )
}
