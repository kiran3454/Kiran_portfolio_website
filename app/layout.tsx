import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioPlayerCloudinary } from "@/components/audio-player-cloudinary"
import { MouseEffects } from "@/components/mouse-effects"
import { ErrorBoundary } from "@/components/error-boundary"
import { LenisProvider } from "@/components/lenis-provider" // Import LenisProvider

export const metadata = {
  title: "Kiran Kulal - Creative Developer",
  description:
    "Portfolio of Kiran Kulal, a creative developer specializing in interactive web experiences and 3D animations.",
  generator: "v0.dev",
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
            <LenisProvider>
              {" "}
              {/* Wrap children with LenisProvider */}
              {children}
            </LenisProvider>
            <AudioPlayerCloudinary />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
