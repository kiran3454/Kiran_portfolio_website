"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
// import { StaticHero } from "@/components/static-hero" // Remove StaticHero import
import { ParallaxSection } from "@/components/parallax-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/animated-text"
import { MainScene } from "@/components/main-scene" // Import MainScene

export default function Home() {
  const router = useRouter()
  // Removed the local loading state as MainScene handles its own loading

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      {/* MainScene as the landing section */}
      <div className="w-full h-screen relative">
        <MainScene />
      </div>

      {/* Parallax Background Elements (can be adjusted if MainScene covers them) */}
      <ParallaxSection speed={0.3} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl"></div>
      </ParallaxSection>

      <section id="about" className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        {/* Parallax background */}
        <ParallaxSection speed={0.2} className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/5 to-transparent"></div>
        </ParallaxSection>

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedText type="glow" className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center">
              <span className="text-teal-500 mr-2">01.</span> About Me
            </h2>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" delay={200}>
              <div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Hello! I'm Kiran, a creative developer with a passion for building beautiful, functional, and
                  user-centered digital experiences. With a background in both design and development, I bring a unique
                  perspective to every project.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I specialize in front-end development with a focus on interactive experiences and animations. My
                  expertise includes React, Three.js, TypeScript, and Next.js, allowing me to create immersive web
                  applications that stand out.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or hiking in the mountains. I believe in continuous learning and pushing the boundaries of what's
                  possible on the web.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl profile-flip">
                <div className="profile-flip-inner">
                  <div className="profile-flip-front">
                    <img src="/images/profile.png" alt="Kiran Kulal" className="w-full h-auto object-cover" />
                  </div>
                  <div className="profile-flip-back">
                    <div className="text-center p-6">
                      <h3 className="text-xl font-bold mb-4 text-white">Creative Developer</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                          <span>Full-Stack Development</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                            />
                          </svg>
                          <span>UI/UX Design</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>3D Animations</span>
                        </div>
                      </div>
                      <p className="text-sm mt-4 opacity-90 text-gray-200">
                        Passionate about creating immersive digital experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        {/* Animated background grid */}
        <ParallaxSection speed={0.1} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20, 184, 166, 0.1) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </ParallaxSection>

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedText type="slide" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
              <span className="text-teal-500 mr-2">02.</span> Featured Projects
            </h2>
          </AnimatedText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal direction="scale" delay={200} className="stagger-1">
              <ProjectCard
                title="Money Map"
                description="A Financial expense tracker built with html,css,javascript,and Flask."
                tags={["HTML", "JS", "Flask"]}
                image="/placeholder.svg?height=300&width=500"
                onClick={() => router.push("/projects/1")}
              />
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={300} className="stagger-2">
              <ProjectCard
                title="College Fest Registration Website"
                description="This website is for College fest event registration website."
                tags={["React", "Typescript", "Framermotion"]}
                image="/placeholder.svg?height=300&width=500"
                onClick={() => router.push("/projects/2")}
              />
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={400} className="stagger-3">
              <ProjectCard
                title="Network Anomaly Detection Using Machine Learning"
                description="An analytics dashboard for monitoring and visualizing AI model performance."
                tags={["HTML", "CSS", "Python", "Flask", "Emailjs"]}
                image="/placeholder.svg?height=300&width=500"
                onClick={() => router.push("/projects/3")}
              />
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={500} className="stagger-4">
              <ProjectCard
                title="KSRTC Bus Notification System"
                description="The KSRTC Rural Bus Notification System is a web-based application"
                tags={["Html", "css", "Javascript", "Java", "Javaspringboot"]}
                image="/placeholder.svg?height=300&width=500"
                onClick={() => router.push("/projects/4")}
              />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={600}>
            <div className="text-center mt-12">
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25"
                onClick={() => router.push("/projects")}
              >
                View All Projects
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen bg-gray-950 py-20 px-4 sm:px-6 lg:px-8 flex items-center relative overflow-hidden z-10"
      >
        {/* Parallax background */}
        <ParallaxSection speed={0.15} className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/10 to-transparent"></div>
        </ParallaxSection>

        <div className="max-w-3xl mx-auto w-full relative z-10">
          <AnimatedText type="glow" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <span className="text-teal-500 mr-2">03.</span> Get In Touch
            </h2>
          </AnimatedText>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-gray-300 mb-12 text-lg leading-relaxed">
              I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just
              want to connect, feel free to reach out!
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-teal-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-teal-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-teal-400"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  placeholder="Project inquiry / Collaboration / Other"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1 transition-colors group-focus-within:text-teal-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg w-full md:w-auto transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25">
                Send Message
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      <footer className="bg-black py-8 px-4 border-t border-gray-800 relative overflow-hidden z-10">
        <ParallaxSection speed={0.05} className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-teal-500/5 to-transparent"></div>
        </ParallaxSection>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
          <ScrollReveal direction="left" delay={100}>
            <div className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Kiran Kulal. All rights reserved.
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <div className="flex space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </main>
  )
}

function ProjectCard({
  title,
  description,
  tags,
  image,
  onClick,
}: {
  title: string
  description: string
  tags: string[]
  image: string
  onClick?: () => void
}) {
  return (
    <div
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/10 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-900/30 text-teal-400 text-xs px-2 py-1 rounded-full transition-all duration-300 hover:bg-teal-800/40 hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
