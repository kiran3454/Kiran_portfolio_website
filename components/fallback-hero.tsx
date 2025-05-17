"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"

export function FallbackHero() {
  const router = useRouter()

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-down">
          <span className="text-teal-500">Creative</span> Developer
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-down" style={{ animationDelay: "0.3s" }}>
          Crafting immersive digital experiences with code and creativity
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg"
            onClick={() => router.push("/about")}
          >
            About Me
          </Button>
          <Button
            variant="outline"
            className="border-teal-500 text-teal-500 hover:bg-teal-900/20 px-8 py-6 text-lg"
            onClick={() => router.push("/projects")}
          >
            View My Work
          </Button>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in-down"
        style={{ animationDelay: "0.9s" }}
      >
        <Button
          variant="ghost"
          className="text-white hover:text-teal-400 hover:bg-transparent animate-bounce"
          onClick={() => {
            const aboutSection = document.getElementById("about")
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" })
            } else {
              router.push("/about")
            }
          }}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-8 right-8 flex space-x-4 animate-fade-in-down" style={{ animationDelay: "0.7s" }}>
        <a href="https://github.com/kiran3454" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:text-teal-400 hover:bg-transparent"
          >
            <Github className="h-5 w-5" />
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/kiran-k-7070ab260/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:text-teal-400 hover:bg-transparent"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
        </a>
        <a href="https://mail.google.com/mail/u/0/#inbox/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:text-teal-400 hover:bg-transparent"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </a>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:text-teal-400 hover:bg-transparent"
        >
          <FileText className="h-5 w-5" />
        </Button>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-500/20"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
