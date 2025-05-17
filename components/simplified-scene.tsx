"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text, Sphere } from "@react-three/drei"
import type { Group } from "three"

export function SimplifiedScene() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <Environment preset="city" />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <SimpleTitle position={[0, 4, 0]} />
      </Float>

      <Sphere args={[8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#14b8a6" wireframe transparent opacity={0.2} />
      </Sphere>
    </Canvas>
  )
}

function SimpleTitle({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={2}
        color="#14b8a6"
        position={[-3.5, 0, 0]}
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="middle"
      >
        Kiran
      </Text>

      <mesh position={[2, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 100]} />
        <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      <Text
        fontSize={2}
        color="#ffffff"
        position={[2, 0, 0]}
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="middle"
      >
        K
      </Text>
    </group>
  )
}
