"use client"

import { useState } from "react"
import { Volume2, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerFallback() {
  const [isPlaying, setIsPlaying] = useState(false)

  // Web Audio API fallback - generates simple ambient tones
  const createAmbientSound = () => {
    if (typeof window === "undefined") return null

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create oscillators for ambient sound
      const osc1 = audioContext.createOscillator()
      const osc2 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      osc1.type = "sine"
      osc1.frequency.setValueAtTime(220, audioContext.currentTime) // A3
      osc2.type = "sine"
      osc2.frequency.setValueAtTime(330, audioContext.currentTime) // E4

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)

      osc1.connect(gainNode)
      osc2.connect(gainNode)
      gainNode.connect(audioContext.destination)

      return { osc1, osc2, gainNode, audioContext }
    } catch (err) {
      console.log("Web Audio API not supported")
      return null
    }
  }

  const toggleAudio = () => {
    if (isPlaying) {
      setIsPlaying(false)
      // Stop any playing audio context
    } else {
      const audioSetup = createAmbientSound()
      if (audioSetup) {
        const { osc1, osc2 } = audioSetup
        osc1.start()
        osc2.start()
        setIsPlaying(true)

        // Auto-stop after some time to prevent indefinite playing
        setTimeout(() => {
          osc1.stop()
          osc2.stop()
          setIsPlaying(false)
        }, 30000) // 30 seconds
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300"
      onClick={toggleAudio}
      title={isPlaying ? "Stop ambient sound" : "Play ambient sound"}
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <Music className="h-5 w-5" />}
    </Button>
  )
}
