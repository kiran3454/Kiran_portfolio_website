"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

export default function ProjectsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<string>("all")

  const projects = [
    {
      id: 1,
      title: "Money Map",
      description: "A Financial expense tracker built with html,css,javascript,and Flask.",
      longDescription:
        "The Personalized Finance Tracker is a user-friendly platform designed to help individuals efficiently manage their income, expenses, and savings through automated transaction tracking, real-time updates, and insightful financial analytics. It features intuitive data visualizations, multi-format financial reporting, and personalized budgeting tools, all accessible across multiple devices. With secure cloud storage and customizable financial goal-setting, the tracker empowers users to achieve financial stability and long-term success.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["HTML", "JS", "Flask"],
      category: "web",
      links: {
        live: "https://moneymap2.onrender.com/login",
        github: "https://github.com/kiran3454/moneymap2",
      },
    },
    {
      id: 2,
      title: "College Fest Registration website",
      description: "This website is for College fest event regestration website.",
      longDescription:
        "This website is designed for seamless registration and management of college fest events, providing a centralized platform for participants and organizers. It offers features such as event listings, online sign-ups, real-time updates, and personalized schedules for attendees. With a user-friendly interface and multi-device compatibility, the site ensures a smooth and engaging experience for all users involved in the fest.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Typescript","Framermotion"],
      category: "web",
      links: {
        live: "https://silver-mousse-cb486a.netlify.app/",
        github: "https://github.com/kiran3454/cypherswebsite",
      },
    },
    {
      id: 3,
      title: "“Network Anomaly Detection Using Machine Learning",
      description: "An analytics dashboard for monitoring and visualizing AI model performance.",
      longDescription:
        "The objective of this project is to detect unusual patterns in network traffic that may indicate security threats or intrusions. It leverages machine learning models to analyze real-time and historical network data for anomaly detection.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["HTML", "CSS", "Python","Flask","Emailjs"],
      category: "data",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
    },
    {
      id: 4,
      title: "KSRTC Bus Notifiaction System",
      description: "The KSRTC Rural Bus Notification System is a web-based aplication",
      longDescription:
        "The system is made up of two main modules: Admin and User. The Admin module enables authorized workers to control bus routes using CRUD (Create, Read, Update, Delete) operations and to send notifications of delays or route cancellations. The User module allows passengers to view bus schedules.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Html","css","Javascript","Java","Javaspringboot"],
      category: "web",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
    },
    {
      id: 5,
      title: "Weather App",
      description: "A beautiful weather application with animated visualizations.",
      longDescription:
        "A weather application that provides forecasts with beautiful, animated visualizations based on current conditions. The app uses geolocation to provide local weather and allows users to save multiple locations. Data is sourced from a reliable weather API with high accuracy.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Canvas API", "Weather API"],
      category: "web",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
    },
    {
      id: 6,
      title: "Smart Dustbin",
      description: "the dustbin automatically detects when waste is nearby and opens",
      longDescription:
        "An interactive blockchain explorer that allows users to visualize transactions, blocks, and addresses on various blockchain networks. Features include real-time updates, transaction history, and network statistics. Built with a focus on performance and data visualization.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Vue.js", "Web3.js", "D3.js"],
      category: "data",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          className="mb-8 text-white hover:text-teal-400 hover:bg-transparent"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
        <p className="text-gray-400 mb-8 text-lg">A collection of my recent work and personal projects</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className={
              filter === "all" ? "bg-teal-500 text-black" : "border-teal-500 text-teal-500 hover:bg-teal-900/20"
            }
            onClick={() => setFilter("all")}
          >
            All Projects
          </Button>
          <Button
            variant={filter === "web" ? "default" : "outline"}
            className={
              filter === "web" ? "bg-teal-500 text-black" : "border-teal-500 text-teal-500 hover:bg-teal-900/20"
            }
            onClick={() => setFilter("web")}
          >
            Web Development
          </Button>
          <Button
            variant={filter === "mobile" ? "default" : "outline"}
            className={
              filter === "mobile" ? "bg-teal-500 text-black" : "border-teal-500 text-teal-500 hover:bg-teal-900/20"
            }
            onClick={() => setFilter("mobile")}
          >
            Mobile Apps
          </Button>
          <Button
            variant={filter === "data" ? "default" : "outline"}
            className={
              filter === "data" ? "bg-teal-500 text-black" : "border-teal-500 text-teal-500 hover:bg-teal-900/20"
            }
            onClick={() => setFilter("data")}
          >
            Data Visualization
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => router.push(`/projects/${project.id}`)} />
          ))}
        </div>
      </div>
    </main>
  )
}

function ProjectCard({
  project,
  onClick,
}: {
  project: any
  onClick: () => void
}) {
  return (
    <div
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-transform hover:transform hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
    >
      <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 h-12">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-teal-900/30 text-teal-400 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-teal-400 hover:text-teal-300 p-0"
            onClick={(e) => {
              e.stopPropagation()
              window.open(project.links.github, "_blank")
            }}
          >
            <Github className="h-4 w-4 mr-1" />
            Code
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-teal-400 hover:text-teal-300 p-0"
            onClick={(e) => {
              e.stopPropagation()
              window.open(project.links.live, "_blank")
            }}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Live Demo
          </Button>
        </div>
      </div>
    </div>
  )
}
