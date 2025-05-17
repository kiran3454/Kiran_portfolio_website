import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioPlayerHtml } from "@/components/audio-player-html"
import { MouseEffects } from "@/components/mouse-effects"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata = {
  title: "Kiran Kulal - Creative Developer",
  description:
    "Portfolio of Kiran Kulal, a creative developer specializing in interactive web experiences and 3D animations.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <MouseEffects />
            {children}
            <AudioPlayerHtml />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
