"use client"

import { useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerSimpleFix() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioContext, setAudioContext] = useState<{
    context: AudioContext
    oscillators: OscillatorNode[]
    gainNode: GainNode
  } | null>(null)

  const createAmbientMusic = () => {
    if (typeof window === "undefined") return null

    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create a more musical ambient sound
      const frequencies = [220, 277, 330, 415] // A3, C#4, E4, G#4 - A major chord
      const oscillators: OscillatorNode[] = []
      const gainNode = context.createGain()

      // Create multiple oscillators for harmony
      frequencies.forEach((freq, index) => {
        const osc = context.createOscillator()
        const oscGain = context.createGain()

        osc.type = index % 2 === 0 ? "sine" : "triangle"
        osc.frequency.setValueAtTime(freq, context.currentTime)

        // Different volumes for each oscillator
        oscGain.gain.setValueAtTime(0.1 / (index + 1), context.currentTime)

        osc.connect(oscGain)
        oscGain.connect(gainNode)
        oscillators.push(osc)
      })

      // Master volume control
      gainNode.gain.setValueAtTime(0, context.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 2)
      gainNode.connect(context.destination)

      return { context, oscillators, gainNode }
    } catch (err) {
      console.log("Web Audio API not supported:", err)
      return null
    }
  }

  const toggleAudio = () => {
    if (isPlaying) {
      // Stop audio
      if (audioContext) {
        audioContext.oscillators.forEach((osc) => {
          try {
            osc.stop()
          } catch (e) {
            // Oscillator might already be stopped
          }
        })
        audioContext.context.close()
        setAudioContext(null)
      }
      setIsPlaying(false)
    } else {
      // Start audio
      const newAudioContext = createAmbientMusic()
      if (newAudioContext) {
        newAudioContext.oscillators.forEach((osc) => osc.start())
        setAudioContext(newAudioContext)
        setIsPlaying(true)

        // Auto-stop after 1 minute
        setTimeout(() => {
          if (newAudioContext) {
            newAudioContext.oscillators.forEach((osc) => {
              try {
                osc.stop()
              } catch (e) {
                // Already stopped
              }
            })
            newAudioContext.context.close()
            setAudioContext(null)
            setIsPlaying(false)
          }
        }, 60000) // 1 minute
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300 transition-all duration-300"
      onClick={toggleAudio}
      title={isPlaying ? "Stop ambient music" : "Play ambient music"}
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  )
}
