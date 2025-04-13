"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"

interface CustomLeafProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  scrollProgress: MotionValue<number>
  color?: string
}

export default function CustomLeaf({ position, rotation, scale, scrollProgress, color = "#8DA77B" }: CustomLeafProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const initialY = position[1]
  const initialX = position[0]

  // Store the current scroll value
  const scrollValue = useRef(0)

  // Update the scroll value when it changes
  scrollProgress.onChange((latest) => {
    scrollValue.current = latest
  })

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5) * 0.8

      // Move based on scroll
      meshRef.current.position.x = initialX + (scrollValue.current * 3 - 1.5) * 0.5

      // Subtle rotation
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.z += 0.001
    }
  })

  // Create a custom leaf shape
  const shape = new THREE.Shape()

  // Start at the bottom of the leaf
  shape.moveTo(0, -0.5)

  // Draw the left side of the leaf
  shape.bezierCurveTo(-0.5, -0.3, -0.5, 0.3, 0, 0.5)

  // Draw the right side of the leaf
  shape.bezierCurveTo(0.5, 0.3, 0.5, -0.3, 0, -0.5)

  // Close the shape
  shape.closePath()

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <shapeGeometry args={[shape, 24]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}
