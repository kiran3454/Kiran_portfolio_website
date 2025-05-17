"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"
import dynamic from "next/dynamic"
import { FallbackHero } from "@/components/fallback-hero"

// Dynamically import the MainScene component with no SSR
const DynamicMainScene = dynamic(() => import("@/components/main-scene").then((mod) => ({ default: mod.MainScene })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin"></div>
    </div>
  ),
})

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [use3D, setUse3D] = useState(true)

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) {
      console.warn("WebGL not supported, falling back to 2D version")
      setUse3D(false)
    }

    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Handle errors in 3D content
  const handleError = (err: Error) => {
    console.error("Error loading 3D content:", err)
    setError("There was an error loading the 3D content. Please try refreshing the page.")
    setUse3D(false)
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin mb-4"></div>
          <h1 className="text-2xl font-bold text-white">
            Loading Portfolio<span className="animate-pulse">...</span>
          </h1>
        </div>
      ) : error || !use3D ? (
        <>
          <FallbackHero />
          {/* Rest of the page content remains unchanged */}
          <section id="about" className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center">
                <span className="text-teal-500 mr-2">01.</span> About Me
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-gray-300 mb-6">
                    Hello! I'm Kiran, a creative developer with a passion for building beautiful, functional, and
                    user-centered digital experiences. With a background in both design and development, I bring a
                    unique perspective to every project.
                  </p>
                  <p className="text-gray-300 mb-6">
                    I specialize in front-end development with a focus on interactive experiences and animations. My
                    expertise includes React, Three.js, TypeScript, and Next.js, allowing me to create immersive web
                    applications that stand out.
                  </p>
                  <p className="text-gray-300">
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source
                    projects, or hiking in the mountains. I believe in continuous learning and pushing the boundaries of
                    what's possible on the web.
                  </p>
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <img src="/images/profile.png" alt="Kiran Kulal" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </section>
          <section id="projects" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
                <span className="text-teal-500 mr-2">02.</span> Featured Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectCard
                  title="Portfolio Website"
                  description="A creative 3D portfolio built with Next.js, Three.js, and React Three Fiber."
                  tags={["Next.js", "Three.js", "TypeScript"]}
                  image="/placeholder.svg?height=300&width=500"
                />

                <ProjectCard
                  title="E-commerce App"
                  description="A full-featured e-commerce platform with cart, checkout, and payment integration."
                  tags={["React", "Node.js", "Stripe"]}
                  image="/placeholder.svg?height=300&width=500"
                />

                <ProjectCard
                  title="AI Dashboard"
                  description="An analytics dashboard for monitoring and visualizing AI model performance."
                  tags={["React", "D3.js", "Python"]}
                  image="/placeholder.svg?height=300&width=500"
                />

                <ProjectCard
                  title="Mobile Game"
                  description="A cross-platform mobile game built with React Native and Three.js."
                  tags={["React Native", "Three.js", "Firebase"]}
                  image="/placeholder.svg?height=300&width=500"
                />
              </div>

              <div className="text-center mt-12">
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg"
                  onClick={() => router.push("/projects")}
                >
                  View All Projects
                </Button>
              </div>
            </div>
          </section>

          <section id="contact" className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl mx-auto w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
                <span className="text-teal-500 mr-2">03.</span> Get In Touch
              </h2>

              <p className="text-gray-300 mb-12 text-lg">
                I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just
                want to connect, feel free to reach out!
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Project inquiry / Collaboration / Other"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </div>
          </section>

          <footer className="bg-black py-8 px-4 border-t border-gray-800">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © {new Date().getFullYear()} Kiran Kulal. All rights reserved.
              </div>

              <div className="flex space-x-6">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-400">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-400">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-400">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <>
          <div className="absolute inset-0 z-10">
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin"></div>
                </div>
              }
            >
              <ErrorCatcher onError={handleError}>
                <DynamicMainScene />
              </ErrorCatcher>
            </Suspense>
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none">
            <div className="max-w-3xl text-center mb-8 mt-32">
              <h1
                className="text-4xl md:text-6xl font-bold text-white mb-4 opacity-0 animate-fade-in-down"
                style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
              >
                <span className="text-teal-500">Creative</span> Developer
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-300 mb-8 opacity-0 animate-fade-in-down"
                style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
              >
                Crafting immersive digital experiences with code and creativity
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto opacity-0 animate-fade-in-down"
                style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
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
              className="absolute bottom-8 left-0 right-0 flex justify-center opacity-0 animate-fade-in-down"
              style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
            >
              <Button
                variant="ghost"
                className="text-white hover:text-teal-400 hover:bg-transparent animate-bounce pointer-events-auto"
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

            <div
              className="absolute top-8 right-8 flex space-x-4 opacity-0 animate-fade-in-down"
              style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
            >
              <a href="https://github.com/kiran3454" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:text-teal-400 hover:bg-transparent pointer-events-auto"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/kiran-k-7070ab260/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:text-teal-400 hover:bg-transparent pointer-events-auto"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://mail.google.com/mail/u/0/#inbox/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:text-teal-400 hover:bg-transparent pointer-events-auto"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:text-teal-400 hover:bg-transparent pointer-events-auto"
              >
                <FileText className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </>
      )}

      <section id="about" className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center">
            <span className="text-teal-500 mr-2">01.</span> About Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-6">
                Hello! I'm Kiran, a creative developer with a passion for building beautiful, functional, and
                user-centered digital experiences. With a background in both design and development, I bring a unique
                perspective to every project.
              </p>
              <p className="text-gray-300 mb-6">
                I specialize in front-end development with a focus on interactive experiences and animations. My
                expertise includes React, Three.js, TypeScript, and Next.js, allowing me to create immersive web
                applications that stand out.
              </p>
              <p className="text-gray-300">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or hiking in the mountains. I believe in continuous learning and pushing the boundaries of what's
                possible on the web.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              <img src="/images/profile.png" alt="Kiran Kulal" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
            <span className="text-teal-500 mr-2">02.</span> Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              title="Portfolio Website"
              description="A creative 3D portfolio built with Next.js, Three.js, and React Three Fiber."
              tags={["Next.js", "Three.js", "TypeScript"]}
              image="/placeholder.svg?height=300&width=500"
            />

            <ProjectCard
              title="E-commerce App"
              description="A full-featured e-commerce platform with cart, checkout, and payment integration."
              tags={["React", "Node.js", "Stripe"]}
              image="/placeholder.svg?height=300&width=500"
            />

            <ProjectCard
              title="AI Dashboard"
              description="An analytics dashboard for monitoring and visualizing AI model performance."
              tags={["React", "D3.js", "Python"]}
              image="/placeholder.svg?height=300&width=500"
            />

            <ProjectCard
              title="Mobile Game"
              description="A cross-platform mobile game built with React Native and Three.js."
              tags={["React Native", "Three.js", "Firebase"]}
              image="/placeholder.svg?height=300&width=500"
            />
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg"
              onClick={() => router.push("/projects")}
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
            <span className="text-teal-500 mr-2">03.</span> Get In Touch
          </h2>

          <p className="text-gray-300 mb-12 text-lg">
            I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want
            to connect, feel free to reach out!
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Project inquiry / Collaboration / Other"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg w-full md:w-auto">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      <footer className="bg-black py-8 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Kiran Kulal. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-400">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-400">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-teal-400">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Error catcher component for 3D content
function ErrorCatcher({ children, onError }: { children: React.ReactNode; onError: (err: Error) => void }) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Caught error:", event.error)
      onError(event.error)
      event.preventDefault()
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [onError])

  return <>{children}</>
}

function SkillBar({ skill, percentage }: { skill: string; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{skill}</span>
        <span className="text-teal-400">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  tags,
  image,
}: {
  title: string
  description: string
  tags: string[]
  image: string
}) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-transform hover:transform hover:scale-[1.02]">
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-teal-900/30 text-teal-400 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
