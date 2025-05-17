"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-6 text-gray-400">
          We're sorry, but there was an error loading the page. Our team has been notified.
        </p>
        <div className="space-y-4">
          <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <div>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
