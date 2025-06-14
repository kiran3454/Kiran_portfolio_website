"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Music, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AudioPlayerCloudinary() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  // Your Cloudinary URL
  const CLOUDINARY_URL = "https://res.cloudinary.com/dywdht9x0/video/upload/v1749890868/background_ybrknl.mp3"

  useEffect(() => {
    const setupAudio = () => {
      if (audioRef.current) {
        const audio = audioRef.current

        // Set up event listeners
        audio.addEventListener("canplaythrough", () => {
          console.log("✅ Cloudinary audio loaded successfully!")
          setAudioLoaded(true)
          setStatusMessage("Music ready to play!")
          setShowStatus(true)
          setTimeout(() => setShowStatus(false), 2000)
        })

        audio.addEventListener("error", (e) => {
          console.error("❌ Audio loading error:", e)
          setStatusMessage("Audio file could not be loaded")
          setShowStatus(true)
          setTimeout(() => setShowStatus(false), 3000)
        })

        audio.addEventListener("loadstart", () => {
          console.log("🔄 Starting to load audio...")
          setStatusMessage("Loading music...")
          setShowStatus(true)
        })

        audio.addEventListener("loadeddata", () => {
          console.log("📁 Audio data loaded")
        })

        // Set the source
        audio.src = CLOUDINARY_URL
        audio.crossOrigin = "anonymous"
        audio.loop = true
        audio.volume = 0.6
        audio.preload = "auto"

        // Try to load the audio
        audio.load()
      }
    }

    setupAudio()
  }, [])

  const toggleAudio = async () => {
    if (!audioRef.current) {
      setStatusMessage("Audio player not initialized")
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
      return
    }

    const audio = audioRef.current

    if (isPlaying) {
      // Stop the music
      audio.pause()
      setIsPlaying(false)
      setStatusMessage("Music paused")
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 2000)
    } else {
      // Play the music
      try {
        // Make sure the audio is loaded
        if (!audioLoaded) {
          setStatusMessage("Please wait, music is still loading...")
          setShowStatus(true)
          setTimeout(() => setShowStatus(false), 3000)
          return
        }

        // Reset to beginning if needed
        audio.currentTime = 0

        // Attempt to play
        const playPromise = audio.play()

        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
          setStatusMessage("🎵 Playing your music!")
          setShowStatus(true)
          setTimeout(() => setShowStatus(false), 2000)
          console.log("🎵 Successfully playing Cloudinary audio!")
        }
      } catch (error) {
        console.error("❌ Playback failed:", error)
        setStatusMessage("Playback failed - check browser permissions")
        setShowStatus(true)
        setTimeout(() => setShowStatus(false), 4000)
      }
    }
  }

  return (
    <>
      {/* Audio element with your Cloudinary URL */}
      <audio ref={audioRef} preload="auto" loop crossOrigin="anonymous" />

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full w-12 h-12 bg-black/50 backdrop-blur-md border-teal-500/50 text-teal-400 hover:bg-teal-900/20 hover:text-teal-300 transition-all duration-300 hover:scale-110"
        onClick={toggleAudio}
        title={isPlaying ? "Stop music" : "Play background music"}
        disabled={!audioLoaded}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : audioLoaded ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Music className="h-5 w-5 animate-pulse" />
        )}
      </Button>

      {/* Status messages */}
      {showStatus && (
        <div className="fixed bottom-24 left-8 z-50 bg-black/90 text-white text-sm p-3 rounded-lg max-w-xs border border-teal-500/50 flex items-start space-x-2">
          {audioLoaded && isPlaying ? (
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-400" />
          ) : (
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-teal-400" />
          )}
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Debug info for development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded border border-gray-700">
          🎵 Audio Status: {audioLoaded ? "✅ Loaded" : "⏳ Loading"} | Playing: {isPlaying ? "Yes" : "No"}
          <br />🔗 Source: Cloudinary
        </div>
      )}
    </>
  )
}
