"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"

export function StaticHero() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-teal-500/5 blur-3xl"></div>
      </div>

      <div className="max-w-3xl text-center mb-8 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          <span className="text-teal-500">Creative</span> Developer
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Crafting immersive digital experiences with code and creativity
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <Button
          variant="ghost"
          className="text-white hover:text-teal-400 hover:bg-transparent animate-bounce"
          onClick={() => {
            const aboutSection = document.getElementById("about")
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-8 right-8 flex space-x-4">
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
        <a href="/pdf/kiran.k(8).pdf" download="Kiran_K_CV.pdf">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:text-teal-400 hover:bg-transparent"
          >
            <FileText className="h-5 w-5" />
          </Button>
        </a>
      </div>

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute h-4 w-4 rounded-full bg-teal-500/30"
          style={{ top: "20%", left: "10%", animation: "float 8s infinite ease-in-out" }}
        ></div>
        <div
          className="absolute h-6 w-6 rounded-full bg-teal-500/20"
          style={{ top: "60%", left: "15%", animation: "float 12s infinite ease-in-out" }}
        ></div>
        <div
          className="absolute h-3 w-3 rounded-full bg-teal-500/40"
          style={{ top: "30%", left: "80%", animation: "float 7s infinite ease-in-out" }}
        ></div>
        <div
          className="absolute h-5 w-5 rounded-full bg-teal-500/30"
          style={{ top: "70%", left: "75%", animation: "float 10s infinite ease-in-out" }}
        ></div>
        <div
          className="absolute h-8 w-8 rounded-full bg-teal-500/10"
          style={{ top: "40%", left: "30%", animation: "float 15s infinite ease-in-out" }}
        ></div>
        <div
          className="absolute h-10 w-10 rounded-full bg-teal-500/10"
          style={{ top: "50%", left: "60%", animation: "float 18s infinite ease-in-out" }}
        ></div>
      </div>
    </div>
  )
}
