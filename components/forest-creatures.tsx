"use client"

import type React from "react"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"

interface ForestCreaturesProps {
  scrollProgress: MotionValue<number>
}

export default function ForestCreatures({ scrollProgress }: ForestCreaturesProps) {
  return (
    <group>
      <Fireflies count={8} scrollProgress={scrollProgress} />
      <Birds count={10} scrollProgress={scrollProgress} />
    </group>
  )
}


function Fireflies({ count = 5, scrollProgress }: { count: number; scrollProgress: MotionValue<number> }) {
  const fireflies = []
  const scrollValue = useRef(0)

  // Update the scroll value when it changes, but limit the effect
  scrollProgress.onChange((latest) => {
    // Limit the effect to keep background more consistent
    scrollValue.current = Math.max(0, Math.min(1, latest))
  })

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 20
    const y = (Math.random() - 0.5) * 15
    const z = (Math.random() - 0.5) * 10 - 5
    const speed = 0.5 + Math.random() * 0.5
    const size = 0.3 + Math.random() * 0.2
    const color = ["#A3BD91", "#8DA77B", "#C9B38C", "#E6D1B1"][Math.floor(Math.random() * 4)]

    fireflies.push(
      <Firefly key={i} position={[x, y, z]} speed={speed} size={size} color={color} scrollProgress={scrollValue} />,
    )
  }

  return <>{fireflies}</>
}

function Firefly({
  position,
  speed,
  size,
  color,
  scrollProgress,
}: {
  position: [number, number, number]
  speed: number
  size: number
  color: string
  scrollProgress: React.MutableRefObject<number>
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const wingRef = useRef<THREE.Mesh>(null!)
  const wingRef2 = useRef<THREE.Mesh>(null!)

  // Create a path for the firefly to follow
  const path = useRef({
    x: position[0],
    y: position[1],
    z: position[2],
    time: Math.random() * 100,
    radius: 2 + Math.random() * 2,
  })

  useFrame(({ clock }) => {
    if (groupRef.current && wingRef.current && wingRef2.current) {
      const time = clock.getElapsedTime() * speed
      path.current.time += 0.01 * speed

      // Flutter wings
      wingRef.current.rotation.y = Math.sin(time * 10) * 0.8
      wingRef2.current.rotation.y = -Math.sin(time * 10) * 0.8

      // Move in a figure-8 pattern
      const t = path.current.time
      const r = path.current.radius

      groupRef.current.position.x = path.current.x + Math.sin(t) * r
      groupRef.current.position.y = path.current.y + Math.sin(t * 0.5) * r * 0.5
      groupRef.current.position.z = path.current.z

      // Adjust position based on scroll - reduced effect for more consistency
      groupRef.current.position.y += (scrollProgress.current - 0.5) * 3

      // Rotate to face direction of movement
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.2
      groupRef.current.rotation.x = Math.cos(t) * 0.2
    }
  })

  // Create firefly shape
  const wingShape = new THREE.Shape()
  wingShape.moveTo(0, 0)
  wingShape.bezierCurveTo(0.5, 0.5, 1, 0.5, 1, 0)
  wingShape.bezierCurveTo(1, -0.5, 0.5, -0.5, 0, 0)

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0, 0]} scale={[0.2 * size, 0.2 * size, 0.2 * size]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="yellow" emissive="yellow" emissiveIntensity={1.5} />
      </mesh>

      {/* Wings */}
      <mesh ref={wingRef} position={[0, 0, 0]} rotation={[0, 0.4, 0]} scale={[.8*size, .8*size, .8*size]}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>

      <mesh ref={wingRef2} position={[0, 0, 0]} rotation={[0, -0.4, 0]} scale={[.8*size, .8*size, .8*size]}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

function Birds({ count = 3, scrollProgress }: { count: number; scrollProgress: MotionValue<number> }) {
  const birds = []
  const scrollValue = useRef(0)

  // Update the scroll value when it changes, but limit the effect
  scrollProgress.onChange((latest) => {
    // Limit the effect to keep background more consistent
    scrollValue.current = Math.max(0, Math.min(1, latest))
  })

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 30
    const y = 5 + Math.random() * 10
    const z = -15 - Math.random() * 10
    const speed = 0.2 + Math.random() * 0.3
    const size = 1 + Math.random() * 0.3

    birds.push(<Bird key={i} position={[x, y, z]} speed={speed} size={size} scrollProgress={scrollValue} />)
  }

  return <>{birds}</>
}

function Bird({
  position,
  speed,
  size,
  scrollProgress,
}: {
  position: [number, number, number]
  speed: number
  size: number
  scrollProgress: React.MutableRefObject<number>
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const wingLeftRef = useRef<THREE.Mesh>(null!)
  const wingRightRef = useRef<THREE.Mesh>(null!)

  // Create a path for the bird to follow
  const path = useRef({
    x: position[0],
    y: position[1],
    z: position[2],
    time: Math.random() * 100,
    radius: 5 + Math.random() * 5,
  })

  useFrame(({ clock }) => {
    if (groupRef.current && wingLeftRef.current && wingRightRef.current) {
      const time = clock.getElapsedTime() * speed
      path.current.time += 0.005 * speed

      // Flap wings
      const wingFlap = Math.sin(time * 5)
      wingLeftRef.current.rotation.z = wingFlap * 0.5 - 0.2
      wingRightRef.current.rotation.z = -wingFlap * 0.5 + 0.2

      // Move in a large circular pattern
      const t = path.current.time
      const r = path.current.radius

      groupRef.current.position.x = path.current.x + Math.sin(t) * r
      groupRef.current.position.z = path.current.z + Math.cos(t) * r * 0.5

      // Adjust position based on scroll - reduced effect for more consistency
      groupRef.current.position.y = path.current.y + (scrollProgress.current - 0.5) * 5

      // Rotate to face direction of movement
      groupRef.current.rotation.y = Math.atan2(
        Math.cos(t + 0.01) * r * 0.5 - Math.cos(t) * r * 0.5,
        Math.sin(t + 0.01) * r - Math.sin(t) * r,
      )
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[size, size, size]}>
      {/* Body */}
      <mesh position={[0, 0, 0]} scale={[0.2, 0.1, 0.5]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.05, 0.4]} scale={[0.15, 0.15, 0.15]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Wings */}
      <mesh ref={wingLeftRef} position={[0.2, 0, 0]} rotation={[0, 0, -0.2]} scale={[0.4, 0.05, 0.3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh ref={wingRightRef} position={[-0.2, 0, 0]} rotation={[0, 0, 0.2]} scale={[0.4, 0.05, 0.3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  )
}
