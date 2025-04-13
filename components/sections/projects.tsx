"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useActiveSection } from "../active-section-context"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Immersive E-Commerce",
    description: "A 3D product visualization platform that allows users to interact with products in a virtual space.",
    technologies: ["React", "Three.js", "WebGL", "Node.js"],
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Interactive Data Visualization",
    description: "A dashboard that transforms complex data into interactive 3D visualizations for better insights.",
    technologies: ["React", "D3.js", "Three.js", "TypeScript"],
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Virtual Art Gallery",
    description: "A virtual space where artists can showcase their work in an immersive 3D environment.",
    technologies: ["React", "Three.js", "Firebase", "GLSL"],
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    demo: "https://example.com",
  },
]

export default function Projects() {
  const { setActiveSection } = useActiveSection()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: false })

  useEffect(() => {
    if (isInView) {
      setActiveSection("projects")
    }
  }, [isInView, setActiveSection])

  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#8A85FF]">Featured Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#151030] rounded-xl overflow-hidden backdrop-blur-sm bg-opacity-70 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-[#2A2162] rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:text-[#8A85FF] transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:text-[#8A85FF] transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
