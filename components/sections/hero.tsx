"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import { useActiveSection } from "../active-section-context"
import type * as THREE from "three"

export default function Hero() {
  const { setActiveSection } = useActiveSection()
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} id="home">
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          font="/fonts/Geist_Bold.json"
          position={[0, 1, 0]}
          fontSize={1.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          JOHN DOE
        </Text>
        <Text
          font="/fonts/Geist_Regular.json"
          position={[0, 0, 0]}
          fontSize={0.5}
          color="#8A85FF"
          anchorX="center"
          anchorY="middle"
        >
          CREATIVE DEVELOPER
        </Text>
        <Text
          font="/fonts/Geist_Regular.json"
          position={[0, -1, 0]}
          fontSize={0.3}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
        >
          Crafting immersive digital experiences with React and Three.js
        </Text>
      </Float>
    </group>
  )
}
