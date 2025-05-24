"use client"

import { Code, Palette, Zap } from "lucide-react"

export function ProfileFlip() {
  return (
    <div className="profile-flip w-full h-full">
      <div className="profile-flip-inner">
        <div className="profile-flip-front">
          <img src="/images/profile.png" alt="Kiran Kulal" className="w-full h-full object-cover" />
        </div>
        <div className="profile-flip-back">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Creative Developer</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Full-Stack Development</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>UI/UX Design</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>3D Animations</span>
              </div>
            </div>
            <p className="text-sm mt-4 opacity-90">Passionate about creating immersive digital experiences</p>
          </div>
        </div>
      </div>
    </div>
  )
}
