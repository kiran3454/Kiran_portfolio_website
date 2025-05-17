"use client"

import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react"

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params?.id ? Number.parseInt(params.id as string, 10) : null

  // Define projects data
  const projects = [
    {
      id: 1,
      title: "Money Map",
      description: "A Financial expense tracker built with html,css,javascript,and Flask.",
      longDescription:
        "The Personalized Finance Tracker is a user-friendly platform designed to help individuals efficiently manage their income, expenses, and savings through automated transaction tracking, real-time updates, and insightful financial analytics. It features intuitive data visualizations, multi-format financial reporting, and personalized budgeting tools, all accessible across multiple devices. With secure cloud storage and customizable financial goal-setting, the tracker empowers users to achieve financial stability and long-term success.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      tags: ["HTML", "JS", "Flask"],
      category: "web",
      date: "January 2023",
      links: {
        live: "https://moneymap2.onrender.com/login",
        github: "https://github.com/kiran3454/moneymap2",
      },
      features: [
        "Automated income and expense tracking",
        "Real-time financial status dashboard",
        "Interactive data visualizations (charts, graphs, trend lines)",
        "Multi-format financial report exports (CSV, Excel, PDF)",
        "Smart budgeting with personalized recommendations",
        "Secure cloud storage with multi-device access",
      ],
      technologies: ["Html", "CSS", "Java script", "Flask", "Chart.js"],
    },
    {
      id: 2,
      title: "College Fest Registration Website",
      description: "A college fest event registration website built with React, TypeScript, and Framer Motion.",
      longDescription:
        "This website is designed for seamless registration and management of college fest events, providing a centralized platform for participants and organizers. It offers features such as event listings, online sign-ups, real-time updates, and personalized schedules for attendees. With a user-friendly interface and multi-device compatibility, the site ensures a smooth and engaging experience for all users involved in the fest.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      tags: ["React", "TypeScript", "Framer Motion"],
      category: "web",
      date: "March 2023",
      links: {
        live: "https://silver-mousse-cb486a.netlify.app/",
        github: "https://github.com/kiran3454/cypherswebsite",
      },
      features: [
        "User-friendly event registration forms",
        "Real-time event updates and announcements",
        "Personalized event schedules for attendees",
        "QR code generation for entry and check-in",
        "Organizer dashboard with event analytics",
        "Email and SMS confirmation notifications",
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Firebase", "Vercel"],
    },
    {
      id: 3,
      title: "Network Anomaly Detection Using Machine Learning",
      description: "A machine learning-based system for detecting unusual patterns in network traffic.",
      longDescription:
        "The objective of this project is to detect unusual patterns in network traffic that may indicate security threats or intrusions. It leverages machine learning models to analyze real-time and historical network data for anomaly detection. The system includes a dashboard for monitoring activity, visualizing anomalies, and alerting users to potential risks using email notifications.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      tags: ["HTML", "CSS", "Python", "Flask", "EmailJS"],
      category: "data",
      date: "February 2023",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
      features: [
        "Real-time and historical network data monitoring",
        "Machine learning-based anomaly detection",
        "Interactive dashboard for data visualization",
        "Automated email alerts for unusual activity",
        "Secure and scalable backend using Flask",
        "User-friendly interface with responsive design",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Scikit-learn", "EmailJS"],
    },
    {
      id: 4,
      title: "KSRTC Bus Notification System",
      description: "A web-based application for managing KSRTC rural bus schedules and sending live notifications.",
      longDescription:
        "The KSRTC Rural Bus Notification System is a web-based application designed to streamline the management of bus schedules and enhance communication with passengers. It includes two main modules: the Admin module, which allows authorized personnel to perform CRUD operations on bus routes and send notifications regarding delays or route cancellations, and the User module, which lets passengers access updated bus schedules in real time. This system improves efficiency and ensures timely updates for rural bus services.",
      image: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      tags: ["HTML", "CSS", "JavaScript", "Java", "Spring Boot"],
      category: "web",
      date: "April 2023",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
      features: [
        "Admin panel for bus schedule management (CRUD operations)",
        "Real-time notifications for delays or cancellations",
        "User module to view updated bus schedules",
        "Responsive design for desktop and mobile users",
        "Role-based access for admin and passengers",
        "Improved communication in rural transport services",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Java", "Spring Boot", "MySQL"],
    },
    {
      id: 5,
      title: "Weather App",
      description: "A beautiful weather application with animated visualizations.",
      longDescription:
        "A weather application that provides forecasts with beautiful, animated visualizations based on current conditions. The app uses geolocation to provide local weather and allows users to save multiple locations. Data is sourced from a reliable weather API with high accuracy.",
      image: "/placeholder.svg?height=300&width=500",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      tags: ["React", "Canvas API", "Weather API"],
      category: "web",
      date: "May 2023",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
      features: [
        "Real-time weather updates",
        "Location-based forecasts",
        "Beautiful animated visualizations",
        "7-day forecast",
        "Save multiple locations",
        "Dark mode support",
      ],
      technologies: ["React", "Canvas API", "Weather API", "Geolocation API", "CSS Animations"],
    },
    {
      id: 6,
      title: "Smart Dustbin",
      description: "The dustbin automatically detects when waste is nearby and opens.",
      longDescription:
        "The Smart Dustbin is an IoT-based solution designed to promote hygiene and automation in waste disposal. It uses ultrasonic sensors to detect the presence of nearby objects or human hands and automatically opens the lid, minimizing the need for physical contact. Ideal for public spaces, homes, and offices, the system is energy-efficient, user-friendly, and enhances sanitary conditions by reducing the spread of germs.",
      image: "/placeholder.svg?height=300&width=500",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      tags: ["Arduino", "Ultrasonic Sensor", "Servo Motor", "C++", "IoT"],
      category: "iot",
      date: "May 2023",
      links: {
        live: "https://example.com",
        github: "https://github.com/example",
      },
      features: [
        "Automatic lid opening using ultrasonic sensor",
        "Touchless waste disposal to maintain hygiene",
        "Low power consumption with efficient hardware design",
        "Compact and easy to install in various environments",
        "Can be powered by battery or USB",
        "Ideal for smart homes, offices, and public areas",
      ],
      technologies: ["Arduino", "C++", "Ultrasonic Sensor", "Servo Motor", "Breadboard Circuitry"],
    },
  ]

  // Find the project by ID
  const project = projects.find((p) => p.id === projectId)

  // If project not found, show error or redirect
  if (!project) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-black font-bold"
            onClick={() => router.push("/projects")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          className="mb-8 text-white hover:text-teal-400 hover:bg-transparent"
          onClick={() => router.push("/projects")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-teal-900/30 text-teal-400 text-sm px-3 py-1 rounded-full flex items-center"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center text-gray-400 mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{project.date}</span>
          </div>

          <div className="flex space-x-4 mb-8">
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-black font-bold"
              onClick={() => window.open(project.links.live, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live Demo
            </Button>

            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
              onClick={() => window.open(project.links.github, "_blank")}
            >
              <Github className="h-4 w-4 mr-2" />
              View Source Code
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-auto rounded-lg border border-gray-800 mb-6"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 whitespace-pre-line">{project.longDescription}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-teal-500 flex-shrink-0"></div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Technologies Used</h2>
            <ul className="space-y-2">
              {project.technologies.map((tech, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-teal-500 flex-shrink-0"></div>
                  <span className="text-gray-300">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Project Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {project.gallery.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`${project.title} screenshot ${index + 1}`}
              className="w-full h-auto rounded-lg border border-gray-800"
            />
          ))}
        </div>

        {/* Correct Internal Link to Contact Page */}
        <div className="text-center">
          <Link href="/contact">
            <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold">
              Interested in working together? Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
