"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface SideNavigationProps {
  activeSection: string
}

export default function SideNavigation({ activeSection }: SideNavigationProps) {
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-end gap-6">
      {sections.map((section) => (
        <div
          key={section.id}
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredDot(section.id)}
          onMouseLeave={() => setHoveredDot(null)}
          onClick={() => handleClick(section.id)}
        >
          <motion.div
            className="h-3 w-3 rounded-full flex items-center justify-center"
            animate={{
              width: activeSection === section.id || hoveredDot === section.id ? "auto" : "0.75rem",
              height: activeSection === section.id || hoveredDot === section.id ? "1.5rem" : "0.75rem",
              backgroundColor:
                activeSection === section.id ? "#E6D1B1" : hoveredDot === section.id ? "#C9B38C" : "#A7BBA8",
            }}
            transition={{ duration: 0.3 }}
          >
            {(activeSection === section.id || hoveredDot === section.id) && (
              <motion.span
                className="text-[#0A1510] font-medium px-2 whitespace-nowrap"
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                {section.label}
              </motion.span>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  )
}