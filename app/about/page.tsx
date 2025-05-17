"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Linkedin, Mail, Download } from "lucide-react"

export default function AboutPage() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <div className="sticky top-20">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 mb-6">
                <img src="/images/profile.png" alt="Kiran Kulal" className="w-full h-auto" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-2">Kiran Kulal</h1>
              <p className="text-teal-500 mb-4">Creative Developer</p>

              <div className="flex space-x-3 mb-6">
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
              </div>

              <Button
                className="w-full bg-teal-500 hover:bg-teal-600 text-black font-bold mb-3"
                onClick={() => router.push("/contact")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>

              <a href="/pdf/kiran.k(8).pdf" download="Kiran_K_CV.pdf">
                <Button variant="outline" className="w-full border-teal-500 text-teal-500 hover:bg-teal-900/20">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="text-teal-500 mr-2">01.</span> About Me
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                Hello! I'm Kiran, an enthusiastic and curious fresher with a strong passion for UI/UX design and
                developing engaging web and mobile applications. My interests lie in crafting intuitive digital
                experiences that not only look good but feel seamless to use.
              </p>

              <p className="text-gray-300 mb-6">
                I enjoy turning ideas into interactive interfaces, with a growing skill set in React, React Native, and
                front-end development. My design-first approach allows me to think from a user’s perspective while
                building functional and responsive apps.
              </p>

              <p className="text-gray-300 mb-6">
                I recently completed an internship at Zephyr Technology Ltd., Mangalore, where I explored the exciting
                world of Artificial Intelligence and Machine Learning. This experience deepened my analytical thinking
                and gave me a solid foundation in emerging technologies.
              </p>

              <p className="text-gray-300 mb-6">
                Beyond code and design, I'm a passionate video editor and have worked as a freelancer on Fiverr, where I
                delivered high-quality visual content and managed projects end-to-end. I also have experience in social
                media management, helping brands grow their online presence through creative storytelling and visual
                strategy.
              </p>

              <p className="text-gray-300">
                If you're looking for a motivated, multi-talented fresher who's ready to contribute from day one —
                blending design sense, development skills, and creative thinking — let's connect and create something
                meaningful together!
              </p>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center">
              <span className="text-teal-500 mr-2">02.</span> Experience
            </h2>

            <div className="space-y-8">
              <ExperienceCard
                title="Intern developer"
                company="Zephyr Technology Ltd., Mangalore"
                period=" Nov 2024 – Jan 2025"
                description="Gained hands-on experience in AI/ML concepts including data preprocessing, model building, and evaluation.

Worked on real-time datasets and contributed to developing small-scale machine learning models under mentorship.

Participated in team brainstorming sessions and presented research findings."
              />

              <ExperienceCard
                title="Freelance Video Editor & Content Creator"
                company="Fiverr (Online Based Company)"
                period="2022 – Present"
                description="Delivered high-quality video editing services to global clients, focusing on storytelling, pacing, and brand alignment.

Created promotional content, reels, YouTube intros, and explainer videos using tools like Adobe Premiere Pro and After Effects.

Maintained strong client relationships and consistently received 5-star feedback for creativity and professionalism."
              />

              <ExperienceCard
                title="Freelance Web & App Developer"
                company="Self-employed / Remote Projects"
                period="2023 – Present"
                description="Designed and developed responsive websites and mobile apps using React, React Native, and Next.js.

Focused on delivering user-friendly interfaces with attention to UX and performance optimization.

Collaborated with clients to bring their ideas to life through functional and visually appealing digital products."
              />
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center">
              <span className="text-teal-500 mr-2">03.</span> Education
            </h2>

            <div className="space-y-8">
              <ExperienceCard
                title="Master of Computer Applications (MCA)"
                company="Vivekananda College of Engineering & Technology, Puttur"
                period="2023 - present"
                description="Currently pursuing a master’s degree focused on advanced computing concepts, software development, and real-world application of technology across platforms."
              />

              <ExperienceCard
                title="Bachelor of Computer Applications (BCA)"
                company="Vivekananda Degree College, Puttur"
                period="2020 – 2023"
                description="Completed foundational studies in programming, web development, and computer systems with a strong focus on practical application and project work."
              />
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-6 flex items-center">
              <span className="text-teal-500 mr-2">04.</span> Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>

                <div className="space-y-4">
                  <SkillBar skill="React / Next.js" percentage={70} />
                  <SkillBar skill="Three.js " percentage={65} />
                  <SkillBar skill="java" percentage={88} />
                  <SkillBar skill="UI/UX Design" percentage={90} />
                  <SkillBar skill="Html / css  / PHP" percentage={90} />
                  <SkillBar skill="AfterEffects" percentage={85} />
                  <SkillBar skill="Adobe Photoshop" percentage={95} />
                  <SkillBar skill="Python" percentage={75} />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Soft Skills</h3>

                <div className="space-y-4">
                  <SkillBar skill="Designing Skill" percentage={95} />
                  <SkillBar skill="Problem Solving" percentage={90} />
                  <SkillBar skill="Communication" percentage={85} />
                  <SkillBar skill="Teamwork" percentage={95} />
                  <SkillBar skill="Project Management" percentage={80} />
                  <SkillBar skill="Creativity" percentage={92} />
                  <SkillBar skill="Adaptability" percentage={88} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
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

function ExperienceCard({
  title,
  company,
  period,
  description,
}: {
  title: string
  company: string
  period: string
  description: string
}) {
  return (
    <div className="border-l-2 border-teal-500 pl-6 relative">
      <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-1"></div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-teal-400">{company}</span>
        <span className="text-gray-500 text-sm">{period}</span>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
