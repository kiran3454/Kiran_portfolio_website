"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerHtml() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(false)
  const [showError, setShowError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Check if audio file exists without trying to load it
    const checkAudio = async () => {
      try {
        const response = await fetch("/audio/background-music.mp3", { method: "HEAD" })
        if (response.ok) {
          setAudioAvailable(true)
        } else {
          console.log("Audio file not available")
          setAudioAvailable(false)
        }
      } catch (err) {
        console.log("Error checking audio file:", err)
        setAudioAvailable(false)
      }
    }

    checkAudio()
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current || !audioAvailable) {
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

  // If audio is not available, don't render the audio element
  return (
    <>
      {audioAvailable && (
        <audio ref={audioRef} preload="none">
          <source src="/audio/background-music.mp3" type="audio/mpeg" />
        </audio>
      )}

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
          {audioAvailable ? "Unable to play audio" : "Audio file not available"}
        </div>
      )}
    </>
  )
}
