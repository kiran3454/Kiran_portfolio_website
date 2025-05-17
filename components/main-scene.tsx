"use client"

import type React from "react"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Environment,
  OrbitControls,
  Float,
  Text3D,
  Sphere,
  MeshDistortMaterial,
  Html,
  useFont,
} from "@react-three/drei"
import type { Group } from "three"
import { useRouter } from "next/navigation"

// Pre-load the font
const fontUrl = "/fonts/Geist_Bold.json"

export function MainScene() {
  const [hasError, setHasError] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false)

  // Preload the font
  useEffect(() => {
    const loadFont = async () => {
      try {
        const response = await fetch(fontUrl)
        if (!response.ok) {
          console.error(`Font file not found: ${response.status}`)
          setHasError(true)
          return
        }
        setFontLoaded(true)
      } catch (err) {
        console.error("Error loading font:", err)
        setHasError(true)
      }
    }

    loadFont()
  }, [])

  // Error handler for the Canvas
  const handleErrors = (error: Error) => {
    console.error("Three.js error:", error)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-center p-6">
          <h2 className="text-xl text-white mb-4">3D content could not be loaded</h2>
          <p className="text-gray-400 mb-4">Your browser might not support WebGL or 3D graphics.</p>
          <button className="px-4 py-2 bg-teal-500 text-black rounded-md" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!fontLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin"></div>
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black">
          <div className="text-center p-6">
            <h2 className="text-xl text-white mb-4">3D content could not be loaded</h2>
            <p className="text-gray-400 mb-4">Your browser might not support WebGL or 3D graphics.</p>
            <button className="px-4 py-2 bg-teal-500 text-black rounded-md" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        onError={handleErrors}
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin"></div>
          </div>
        }
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 10, 40]} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Environment preset="city" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />

          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
            <NameTitle position={[0, 4, 0]} />
          </Float>

          <GridPoints />
          <FloatingSkills />
          <ConnectingSphere />
          <ProjectsShowcase />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  )
}

// Simple error boundary component for the 3D scene
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Error in 3D scene:", event.error)
      setHasError(true)
      event.preventDefault()
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Rest of the component remains the same
function NameTitle({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  // Preload font
  useFont(fontUrl)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Text3D
        font={fontUrl}
        size={1.2}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.03}
        bevelOffset={0}
        bevelSegments={5}
        position={[-3.5, 0, 0]}
      >
        Kiran
        <meshStandardMaterial
          color="#14b8a6"
          metalness={0.8}
          roughness={0.2}
          emissive="#14b8a6"
          emissiveIntensity={0.4}
        />
      </Text3D>

      <group position={[2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.2, 0.08, 16, 100]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} transparent opacity={0.6} />
        </mesh>

        <Text3D
          font={fontUrl}
          size={1.2}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={5}
          position={[-0.35, -0.6, 0.1]}
        >
          K
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffffff"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </group>

      <mesh position={[-1, 0, -0.5]} scale={[10, 2.5, 0.1]}>
        <planeGeometry />
        <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.2} transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

// The rest of the component functions remain unchanged
function GridPoints() {
  const pointsRef = useRef<Group>(null)
  const { viewport } = useThree()
  const [points, setPoints] = useState<Array<[number, number, number]>>([])

  useEffect(() => {
    const gridSize = 10
    const spacing = 2
    const newPoints: Array<[number, number, number]> = []

    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        const distance = Math.sqrt(x * x + z * z)
        if (distance > 5) {
          newPoints.push([x, -3, z])
        }
      }
    }

    setPoints(newPoints)
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={pointsRef}>
      {points.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingSkills() {
  const skillsRef = useRef<Group>(null)
  const router = useRouter()
  const skills = [
    { name: "React", position: [-5, 0, 3], size: 0.8 },
    { name: "TypeScript", position: [5, 1, 2], size: 0.8 },
    { name: "Node.js", position: [4, -2, 4], size: 0.8 },
    { name: "Three.js", position: [-4, 2, 1], size: 0.8 },
    { name: "Next.js", position: [0, -1, 5], size: 0.8 },
    { name: "UI/UX", position: [-3, -3, 2], size: 0.8 },
  ]

  useFrame(({ clock }) => {
    if (skillsRef.current) {
      skillsRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={skillsRef}>
      {skills.map((skill, index) => (
        <group key={index} position={skill.position as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[skill.size, 16, 16]} />
            <meshStandardMaterial
              color="#14b8a6"
              emissive="#14b8a6"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
          <Html position={[0, 0, 0]} center transform occlude>
            <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">{skill.name}</div>
          </Html>
        </group>
      ))}
    </group>
  )
}

function ConnectingSphere() {
  return (
    <Sphere args={[8, 32, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#14b8a6"
        attach="material"
        distort={0.3}
        speed={2}
        wireframe
        transparent
        opacity={0.2}
      />
    </Sphere>
  )
}

function ProjectsShowcase() {
  const projectsRef = useRef<Group>(null)
  const router = useRouter()

  const projects = [
    { name: "Money Map", position: [-7, 3, -2], color: "#14b8a6" },
    { name: "College Fest website", position: [7, 2, -3], color: "#0d9488" },
    { name: "Network Intrusion Detection", position: [6, -3, -2], color: "#0f766e" },
    { name: "KSRTC bus notification", position: [-6, -2, -3], color: "#0891b2" },
  ]

  useFrame(({ clock }) => {
    if (projectsRef.current) {
      projectsRef.current.rotation.y = clock.getElapsedTime() * -0.05
    }
  })

  const handleProjectClick = (projectName: string) => {
    router.push(`/projects/${projectName.toLowerCase().replace(/\s+/g, "-")}`)
  }

  return (
    <group ref={projectsRef}>
      {projects.map((project, index) => (
        <group key={index} position={project.position as [number, number, number]}>
          <mesh>
            <boxGeometry args={[2, 1, 0.2]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.9}
            />
          </mesh>
          <Html position={[0, 0, 0.11]} center transform occlude>
            <div
              className="bg-black/70 text-white px-3 py-2 rounded text-sm cursor-pointer hover:bg-teal-900/70 transition-colors"
              onClick={() => handleProjectClick(project.name)}
            >
              {project.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}
