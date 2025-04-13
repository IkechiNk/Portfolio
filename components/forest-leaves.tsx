"use client"

import type React from "react"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"

interface ForestLeavesProps {
  scrollProgress: MotionValue<number>
}

export default function ForestLeaves({ scrollProgress }: ForestLeavesProps) {
  return (
    <group>
      <FloatingLeaves count={50} scrollProgress={scrollProgress} />
      <FallingLeaves count={30} scrollProgress={scrollProgress} />
    </group>
  )
}

interface FloatingLeavesProps {
  count: number
  scrollProgress: MotionValue<number>
}

function FloatingLeaves({ count, scrollProgress }: FloatingLeavesProps) {
  const scrollValue = useRef(0)

  // Update the scroll value when it changes, but limit the effect
  scrollProgress.onChange((latest) => {
    // Limit the effect to keep background more consistent
    scrollValue.current = Math.max(0, Math.min(1, latest))
  })

  // Generate different types of leaves
  const leaves = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const leafType = Math.floor(Math.random() * 3) // 0: maple, 1: oak, 2: regular
      const position = [
        (Math.random() - 0.5) * 30, // x
        (Math.random() - 0.5) * 20, // y
        (Math.random() - 0.5) * 15 - 5, // z
      ] as [number, number, number]
      const rotation = [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2] as [
        number,
        number,
        number,
      ]
      const scale = 0.2 + Math.random() * 0.4
      const speed = 0.2 + Math.random() * 0.4

      // Different colors for different leaf types
      let color
      if (leafType === 0) {
        // Maple - reddish
        color = ["#A35D3F", "#B56E4F", "#C97F5F", "#8A4D33"][Math.floor(Math.random() * 4)]
      } else if (leafType === 100) {
        // Oak - brownish
        color = ["#8A6F4D", "#9A7F5D", "#7A5F3D", "#AA8F6D"][Math.floor(Math.random() * 4)]
      } else {
        // Regular - greenish
        color = ["#5D7A4C", "#6B8A5A", "#4A6A3C", "#7D9769"][Math.floor(Math.random() * 4)]
      }

      return { leafType, position, rotation, scale, speed, color }
    })
  }, [count])

  return (
    <>
      {leaves.map((leaf, i) => (
        <Leaf
          key={i}
          type={leaf.leafType}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
          speed={leaf.speed}
          color={leaf.color}
          scrollProgress={scrollValue}
        />
      ))}
    </>
  )
}

interface LeafProps {
  type: number
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  color: string
  scrollProgress: React.MutableRefObject<number>
}

function Leaf({ type, position, rotation, scale, speed, color, scrollProgress }: LeafProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const initialY = position[1]
  const initialX = position[0]

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()

      // Gentle floating motion
      meshRef.current.position.y = initialY + Math.sin(time * speed) * 1
      meshRef.current.position.x = initialX + Math.cos(time * speed * 0.5) * 0.5

      // Move based on scroll - reduced effect for more consistency
      meshRef.current.position.y += (scrollProgress.current - 0.5) * 5

      // Gentle rotation
      meshRef.current.rotation.x = rotation[0] + time * speed * 0.1
      meshRef.current.rotation.y = rotation[1] + time * speed * 0.15
      meshRef.current.rotation.z = rotation[2] + time * speed * 0.05
    }
  })

  let geometry

  if (type === 0) {
    // Maple leaf
    geometry = <MapleLeafGeometry />
  } else if (type === 1) {
    // Oak leaf
    geometry = <OakLeafGeometry />
  } else {
    // Regular leaf
    geometry = <RegularLeafGeometry />
  }

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {geometry}
      <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.7} metalness={0.1} />
    </mesh>
  )
}

function RegularLeafGeometry() {
  // Create a simple leaf shape
  const shape = new THREE.Shape()

  // Start at the bottom of the leaf
  shape.moveTo(0, -0.5)

  // Draw the left side of the leaf
  shape.bezierCurveTo(-0.5, -0.3, -0.5, 0.3, 0, 0.5)

  // Draw the right side of the leaf
  shape.bezierCurveTo(0.5, 0.3, 0.5, -0.3, 0, -0.5)

  // Close the shape
  shape.closePath()

  return <shapeGeometry args={[shape, 24]} />
}

function MapleLeafGeometry() {
  // Create a maple leaf shape
  const shape = new THREE.Shape()

  // Center point
  shape.moveTo(0, 0)

  // Draw the lobes of the maple leaf
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5
    const nextAngle = ((i + 1) * Math.PI * 2) / 5

    const x1 = Math.sin(angle) * 0.5
    const y1 = Math.cos(angle) * 0.5

    const midAngle = (angle + nextAngle) / 2
    const x2 = Math.sin(midAngle) * 0.3
    const y2 = Math.cos(midAngle) * 0.3

    const x3 = Math.sin(nextAngle) * 0.5
    const y3 = Math.cos(nextAngle) * 0.5

    shape.lineTo(x1, y1)
    shape.quadraticCurveTo(x2, y2, x3, y3)
  }

  shape.closePath()

  return <shapeGeometry args={[shape, 24]} />
}

function OakLeafGeometry() {
  // Create an oak leaf shape
  const shape = new THREE.Shape()

  // Start at the bottom
  shape.moveTo(0, -0.5)

  // Create wavy edges characteristic of oak leaves
  const segments = 8
  for (let i = 0; i < segments; i++) {
    const t = i / segments
    const angle = t * Math.PI

    const x = Math.sin(angle) * 0.5
    const y = Math.cos(angle) * 0.5

    // Add a small wave
    const waveX = x + Math.sin(t * Math.PI * 6) * 0.1
    const waveY = y + Math.cos(t * Math.PI * 6) * 0.05

    shape.lineTo(waveX, waveY)
  }

  shape.closePath()

  return <shapeGeometry args={[shape, 24]} />
}

interface FallingLeavesProps {
  count: number
  scrollProgress: MotionValue<number>
}

function FallingLeaves({ count, scrollProgress }: FallingLeavesProps) {
  const scrollValue = useRef(0)

  // Update the scroll value when it changes, but limit the effect
  scrollProgress.onChange((latest) => {
    // Limit the effect to keep background more consistent
    scrollValue.current = Math.max(0, Math.min(1, latest))
  })

  // Generate falling leaves
  const leaves = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const leafType = Math.floor(Math.random() * 3) // 0: maple, 1: oak, 2: regular
      const position = [
        (Math.random() - 0.5) * 30, // x
        10 + Math.random() * 10, // y - start above the viewport
        (Math.random() - 0.5) * 15 - 5, // z
      ] as [number, number, number]
      const rotation = [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2] as [
        number,
        number,
        number,
      ]
      const scale = 0.2 + Math.random() * 0.3
      const speed = 0.5 + Math.random() * 1
      const spinSpeed = 0.5 + Math.random() * 1
      const swayAmount = 0.5 + Math.random() * 1.5

      // Different colors for different leaf types
      let color
      if (leafType === 0) {
        // Maple - reddish
        color = ["#A35D3F", "#B56E4F", "#C97F5F", "#8A4D33"][Math.floor(Math.random() * 4)]
      } else if (leafType === 1) {
        // Oak - brownish
        color = ["#8A6F4D", "#9A7F5D", "#7A5F3D", "#AA8F6D"][Math.floor(Math.random() * 4)]
      } else {
        // Regular - greenish
        color = ["#5D7A4C", "#6B8A5A", "#4A6A3C", "#7D9769"][Math.floor(Math.random() * 4)]
      }

      return { leafType, position, rotation, scale, speed, spinSpeed, swayAmount, color }
    })
  }, [count])

  return (
    <>
      {leaves.map((leaf, i) => (
        <FallingLeaf
          key={i}
          type={leaf.leafType}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
          speed={leaf.speed}
          spinSpeed={leaf.spinSpeed}
          swayAmount={leaf.swayAmount}
          color={leaf.color}
          scrollProgress={scrollValue}
        />
      ))}
    </>
  )
}

interface FallingLeafProps {
  type: number
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  spinSpeed: number
  swayAmount: number
  color: string
  scrollProgress: React.MutableRefObject<number>
}

function FallingLeaf({
  type,
  position,
  rotation,
  scale,
  speed,
  spinSpeed,
  swayAmount,
  color,
  scrollProgress,
}: FallingLeafProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const initialX = position[0]

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()

      // Falling motion
      const fallSpeed = speed * 0.5
      const yPos = position[1] - ((time * fallSpeed) % 30) // Loop back to top when it falls too far

      // Swaying motion
      const xPos = initialX + Math.sin(time * 0.5) * swayAmount

      // Update position
      meshRef.current.position.set(xPos, yPos, position[2])

      // Spinning rotation
      meshRef.current.rotation.x = rotation[0] + time * spinSpeed * 0.2
      meshRef.current.rotation.y = rotation[1] + time * spinSpeed * 0.3
      meshRef.current.rotation.z = rotation[2] + time * spinSpeed * 0.1

      // Adjust based on scroll - reduced effect for more consistency
      meshRef.current.position.y += (scrollProgress.current - 0.5) * 10
    }
  })

  let geometry

  if (type === 0) {
    // Maple leaf
    geometry = <MapleLeafGeometry />
  } else if (type === 1) {
    // Oak leaf
    geometry = <OakLeafGeometry />
  } else {
    // Regular leaf
    geometry = <RegularLeafGeometry />
  }

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {geometry}
      <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.7} metalness={0.1} />
    </mesh>
  )
}
