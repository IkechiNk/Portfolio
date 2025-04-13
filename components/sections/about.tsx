"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useActiveSection } from "../active-section-context"

export default function About() {
  const { setActiveSection } = useActiveSection()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.5, once: false })

  useEffect(() => {
    if (isInView) {
      setActiveSection("about")
    }
  }, [isInView, setActiveSection])

  return (
    <section id="about" className="h-screen flex flex-col items-center justify-center px-4 md:px-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#8A85FF]">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-[#151030] rounded-xl p-6 backdrop-blur-sm bg-opacity-70">
            <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
            <p className="text-gray-300 mb-4">
              I'm a creative developer with a passion for building immersive web experiences that blend design and
              technology.
            </p>
            <p className="text-gray-300">
              With over 5 years of experience in front-end development, I specialize in creating interactive websites
              and applications that push the boundaries of what's possible on the web.
            </p>
          </div>
          <div className="bg-[#151030] rounded-xl p-6 backdrop-blur-sm bg-opacity-70">
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <p className="text-gray-300 mb-4">
              I started my career as a traditional web developer but quickly became fascinated with the potential of 3D
              graphics and animations on the web.
            </p>
            <p className="text-gray-300">
              Today, I combine my technical expertise with creative vision to build digital experiences that are not
              only functional but also visually stunning and memorable.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
