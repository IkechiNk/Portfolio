"use client"

import { useMemo } from "react"
import CustomLeaf from "./custom-leaf"
import type { MotionValue } from "framer-motion"

interface LeafFieldProps {
  count?: number
  scrollProgress: MotionValue<number>
}

export default function LeafField({ count = 30, scrollProgress }: LeafFieldProps) {
  // Generate random leaves
  const leaves = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20, // x
        (Math.random() - 0.5) * 20, // y
        (Math.random() - 0.5) * 10, // z
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      color: ["#8DA77B", "#6B8A5A", "#A3BD91", "#5D7A4C", "#7D9769"][Math.floor(Math.random() * 5)],
    }))
  }, [count])

  return (
    <group>
      {leaves.map((leaf, i) => (
        <CustomLeaf
          key={i}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
          scrollProgress={scrollProgress}
          color={leaf.color}
        />
      ))}
    </group>
  )
}
