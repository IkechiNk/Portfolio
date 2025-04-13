"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function BackgroundBlobs() {
  const blobsRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (blobsRef.current) {
      blobsRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
      blobsRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <group ref={blobsRef}>
      {/* Create multiple blobs with different positions, sizes, and colors */}
      <Blob position={[-5, -2, -10]} scale={[4, 4, 4]} color="#2D4C3B" />
      <Blob position={[5, 3, -15]} scale={[5, 5, 5]} color="#1A2E23" />
      <Blob position={[0, -5, -12]} scale={[3, 3, 3]} color="#3A5A47" />
      <Blob position={[-8, 4, -8]} scale={[2, 2, 2]} color="#243B2F" />
      <Blob position={[8, -4, -20]} scale={[6, 6, 6]} color="#1F3528" />
    </group>
  )
}

interface BlobProps {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
}

function Blob({ position, scale, color }: BlobProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle pulsing effect
      const t = clock.getElapsedTime() * 0.2
      meshRef.current.scale.x = scale[0] * (1 + Math.sin(t) * 0.05)
      meshRef.current.scale.y = scale[1] * (1 + Math.sin(t + 1) * 0.05)
      meshRef.current.scale.z = scale[2] * (1 + Math.sin(t + 2) * 0.05)
    }
  })

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        roughness={0.4}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}
