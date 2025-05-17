"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo })
    console.error("Uncaught error:", error, errorInfo)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-6 text-gray-400">
              We're sorry, but there was an error loading the page. This could be due to a temporary issue or a missing
              resource.
            </p>
            <div className="space-y-4">
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-black font-bold"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
              <div>
                <Button
                  variant="outline"
                  className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
                  onClick={() => (window.location.href = "/")}
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
