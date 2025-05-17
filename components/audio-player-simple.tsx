"use client"

import { useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerSimple() {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = () => {
    // Get the audio element by ID
    const audio = document.getElementById("background-music") as HTMLAudioElement

    if (!audio) {
      console.error("Audio element not found")
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      // Try to play and handle any errors
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error("Error playing audio:", error)
        })
    }
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio id="background-music" src="/audio/background-music.mp3" loop preload="auto" />

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300"
        onClick={toggleAudio}
        title={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
    </>
  )
}
