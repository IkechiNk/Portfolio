"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useActiveSection } from "./active-section-context"

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export default function Navigation() {
  const { activeSection, setActiveSection } = useActiveSection()
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const handleClick = (sectionId: string) => {
    setActiveSection(sectionId as any)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id as any)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setActiveSection])

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center gap-8">
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
          onClick={() => handleClick(section.id)}
        >
          <motion.div
            className="h-3 rounded-full bg-purple-500"
            initial={{ width: "12px" }}
            animate={{
              width: activeSection === section.id || hoveredSection === section.id ? "auto" : "12px",
              backgroundColor: activeSection === section.id ? "#8A85FF" : "#6C63FF",
            }}
            transition={{ duration: 0.3 }}
          >
            {(activeSection === section.id || hoveredSection === section.id) && (
              <motion.span
                className="whitespace-nowrap px-4 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {section.label}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      ))}
    </nav>
  )
}
