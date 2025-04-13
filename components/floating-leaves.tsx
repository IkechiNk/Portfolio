"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Instances, Instance } from "@react-three/drei"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"

interface LeafProps {
  position: [number, number, number]
  rotation: [number, number, number]
  speed: number
  scale: number
  scrollProgress: MotionValue<number>
}

// Update the Leaf component to make leaves more visible
function Leaf({ position, rotation, speed, scale, scrollProgress }: LeafProps) {
  const ref = useRef<THREE.Mesh>(null!)
  const initialY = position[1]
  const initialX = position[0]

  // Store the current scroll value
  const scrollValue = useRef(0)

  // Update the scroll value when it changes
  scrollProgress.onChange((latest) => {
    scrollValue.current = latest
  })

  useFrame((state) => {
    if (ref.current) {
      // Gentle floating motion
      ref.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.8

      // Move leaves based on scroll
      ref.current.position.x = initialX + (scrollValue.current * 3 - 1.5) * speed

      // Subtle rotation
      ref.current.rotation.x += 0.003 * speed
      ref.current.rotation.y += 0.002 * speed
      ref.current.rotation.z += 0.001 * speed
    }
  })

  return <Instance ref={ref} position={position} rotation={rotation} scale={[scale, scale, scale]} />
}

interface FloatingLeavesProps {
  scrollProgress: MotionValue<number>
}

// Update the FloatingLeaves component to create more visible leaves
export default function FloatingLeaves({ scrollProgress }: FloatingLeavesProps) {
  const count = 30 // Increase the number of leaves

  const leaves = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20, // x
        (Math.random() - 0.5) * 20, // y
        (Math.random() - 0.5) * 10, // z
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      speed: 0.3 + Math.random() * 0.5,
      scale: 0.2 + Math.random() * 0.3, // Make leaves larger
    }))
  }, [count])

  return (
    <Instances limit={count}>
      {/* Use a leaf-shaped geometry instead of a plane */}
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#8DA77B"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
        emissive="#4A5D3F"
        emissiveIntensity={0.2}
      />
      {leaves.map((leaf, i) => (
        <Leaf key={i} {...leaf} scrollProgress={scrollProgress} />
      ))}
    </Instances>
  )
}
