"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          className="mb-8 text-white hover:text-teal-400 hover:bg-transparent"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold text-white mb-2">Get In Touch</h1>
        <p className="text-gray-400 mb-12 text-lg">
          I'm currently open to new opportunities and collaborations. Feel free to reach out!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
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
                  rows={8}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-3 text-lg" type="submit">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">hello@johndoe.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-teal-500 mt-1 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Connect With Me</h2>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-teal-500 text-teal-500 hover:bg-teal-900/20 justify-start"
                  onClick={() => window.open("https://github.com/johndoe", "_blank")}
                >
                  <Github className="h-5 w-5 mr-3" />
                  GitHub
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-teal-500 text-teal-500 hover:bg-teal-900/20 justify-start"
                  onClick={() => window.open("https://linkedin.com/in/johndoe", "_blank")}
                >
                  <Linkedin className="h-5 w-5 mr-3" />
                  LinkedIn
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-teal-500 text-teal-500 hover:bg-teal-900/20 justify-start"
                  onClick={() => window.open("mailto:hello@johndoe.com", "_blank")}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Email Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
