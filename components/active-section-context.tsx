"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SectionType = "home" | "about" | "projects" | "skills" | "contact"

interface ActiveSectionContextType {
  activeSection: SectionType
  setActiveSection: (section: SectionType) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionType>("home")

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext)
  if (context === undefined) {
    throw new Error("useActiveSection must be used within an ActiveSectionProvider")
  }
  return context
}
