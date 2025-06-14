"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerHtml() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioAvailable, setAudioAvailable] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Multiple strategies to find and load audio
    const initializeAudio = async () => {
      // Strategy 1: Try different path variations
      const audioPaths = [
        "/audio/background-music.mp3",
        "./audio/background-music.mp3",
        "audio/background-music.mp3",
        "/public/audio/background-music.mp3",
        // Add your deployed URL here if you know it
        // "https://your-cdn-url.com/background-music.mp3"
      ]

      // Strategy 2: Try a reliable CDN source as fallback
      const cdnFallbacks = [
        "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
        "https://archive.org/download/testmp3testfile/mpthreetest.mp3",
        "https://file-examples.com/storage/fe68c1f7d4d2b5c8c5b7b8b/2017/11/file_example_MP3_700KB.mp3",
      ]

      // Try local paths first
      for (const path of audioPaths) {
        try {
          const response = await fetch(path, { method: "HEAD" })
          if (response.ok) {
            console.log(`✅ Audio found at: ${path}`)
            if (audioRef.current) {
              audioRef.current.src = path
              setAudioAvailable(true)
              return
            }
          }
        } catch (err) {
          console.log(`❌ Audio not found at: ${path}`)
        }
      }

      // Try CDN fallbacks
      for (const url of cdnFallbacks) {
        try {
          const response = await fetch(url, { method: "HEAD" })
          if (response.ok) {
            console.log(`✅ CDN Audio found at: ${url}`)
            if (audioRef.current) {
              audioRef.current.src = url
              audioRef.current.crossOrigin = "anonymous"
              setAudioAvailable(true)
              return
            }
          }
        } catch (err) {
          console.log(`❌ CDN Audio failed: ${url}`)
        }
      }

      // Strategy 3: Generate programmatic audio as last resort
      console.log("🎵 Using programmatic audio generation")
      setAudioAvailable(true) // We'll use Web Audio API
    }

    initializeAudio()
  }, [])

  // Web Audio API for programmatic sound generation
  const createAmbientSound = () => {
    if (typeof window === "undefined") return null

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create multiple oscillators for rich ambient sound
      const osc1 = audioContext.createOscillator()
      const osc2 = audioContext.createOscillator()
      const osc3 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()

      // Configure oscillators
      osc1.type = "sine"
      osc1.frequency.setValueAtTime(220, audioContext.currentTime) // A3
      osc2.type = "sine"
      osc2.frequency.setValueAtTime(330, audioContext.currentTime) // E4
      osc3.type = "triangle"
      osc3.frequency.setValueAtTime(165, audioContext.currentTime) // E3

      // Configure filter for warmth
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(800, audioContext.currentTime)

      // Configure gain (volume)
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 1)

      // Connect the audio graph
      osc1.connect(filter)
      osc2.connect(filter)
      osc3.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)

      return { osc1, osc2, osc3, gainNode, audioContext }
    } catch (err) {
      console.log("Web Audio API not supported:", err)
      return null
    }
  }

  const toggleAudio = () => {
    if (!audioAvailable) {
      setErrorMessage("Audio not available")
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (isPlaying) {
      // Stop audio
      if (audioRef.current && audioRef.current.src) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
    } else {
      // Start audio
      if (audioRef.current && audioRef.current.src) {
        // Try to play the loaded audio file
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((err) => {
              console.log("File playback failed, trying programmatic audio:", err)
              // Fallback to programmatic audio
              const audioSetup = createAmbientSound()
              if (audioSetup) {
                const { osc1, osc2, osc3 } = audioSetup
                osc1.start()
                osc2.start()
                osc3.start()
                setIsPlaying(true)

                // Auto-stop after 30 seconds to prevent indefinite playing
                setTimeout(() => {
                  try {
                    osc1.stop()
                    osc2.stop()
                    osc3.stop()
                    setIsPlaying(false)
                  } catch (e) {
                    console.log("Audio cleanup error:", e)
                  }
                }, 30000)
              } else {
                setErrorMessage("Audio playback not supported")
                setShowError(true)
                setTimeout(() => setShowError(false), 3000)
              }
            })
        }
      } else {
        // No audio file loaded, use programmatic audio
        const audioSetup = createAmbientSound()
        if (audioSetup) {
          const { osc1, osc2, osc3 } = audioSetup
          osc1.start()
          osc2.start()
          osc3.start()
          setIsPlaying(true)

          setTimeout(() => {
            try {
              osc1.stop()
              osc2.stop()
              osc3.stop()
              setIsPlaying(false)
            } catch (e) {
              console.log("Audio cleanup error:", e)
            }
          }, 30000)
        }
      }
    }
  }

  return (
    <>
      {/* Audio element - only render if we have a source */}
      <audio
        ref={audioRef}
        preload="none"
        loop
        onError={(e) => {
          console.log("Audio element error:", e)
          // Don't set audioAvailable to false here, we have fallbacks
        }}
        onCanPlayThrough={() => {
          console.log("Audio can play through")
        }}
      />

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300 transition-all duration-300"
        onClick={toggleAudio}
        title={isPlaying ? "Stop music" : "Play ambient music"}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : audioRef.current?.src ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Music className="h-5 w-5" />
        )}
      </Button>

      {showError && (
        <div className="fixed bottom-24 left-8 z-50 bg-red-900/80 text-white text-xs p-3 rounded-lg max-w-xs border border-red-700">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Development info */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded border border-gray-700">
          🎵 Audio: {audioRef.current?.src ? "File Loaded" : "Programmatic"} | Status:{" "}
          {audioAvailable ? "Ready" : "Loading"}
        </div>
      )}
    </>
  )
}
