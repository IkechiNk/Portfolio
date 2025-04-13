"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useActiveSection } from "../active-section-context"

const skills = [
  { name: "React", level: 90 },
  { name: "Three.js", level: 85 },
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 80 },
  { name: "WebGL", level: 75 },
  { name: "GLSL Shaders", level: 70 },
  { name: "CSS/SCSS", level: 85 },
  { name: "Node.js", level: 75 },
  { name: "Next.js", level: 80 },
  { name: "Framer Motion", level: 85 },
  { name: "Blender", level: 65 },
  { name: "UI/UX Design", level: 75 },
]

export default function Skills() {
  const { setActiveSection } = useActiveSection()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: false })

  useEffect(() => {
    if (isInView) {
      setActiveSection("skills")
    }
  }, [isInView, setActiveSection])

  return (
    <section id="skills" className="min-h-screen py-20 px-4 md:px-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#8A85FF]">Skills & Expertise</h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#151030] rounded-xl p-4 backdrop-blur-sm bg-opacity-70"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-[#8A85FF]">{skill.level}%</span>
              </div>
              <div className="w-full bg-[#0A0822] rounded-full h-2.5">
                <motion.div
                  className="bg-gradient-to-r from-[#6C63FF] to-[#8A85FF] h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-[#151030] rounded-xl p-6 backdrop-blur-sm bg-opacity-70">
            <h3 className="text-xl font-bold mb-4 text-[#8A85FF]">Frontend Development</h3>
            <p className="text-gray-300">
              Building responsive, accessible, and performant user interfaces with modern frameworks and tools.
            </p>
          </div>
          <div className="bg-[#151030] rounded-xl p-6 backdrop-blur-sm bg-opacity-70">
            <h3 className="text-xl font-bold mb-4 text-[#8A85FF]">3D Web Graphics</h3>
            <p className="text-gray-300">
              Creating immersive 3D experiences using WebGL, Three.js, and custom GLSL shaders.
            </p>
          </div>
          <div className="bg-[#151030] rounded-xl p-6 backdrop-blur-sm bg-opacity-70">
            <h3 className="text-xl font-bold mb-4 text-[#8A85FF]">Creative Coding</h3>
            <p className="text-gray-300">
              Combining technical skills with artistic vision to create unique digital experiences.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
