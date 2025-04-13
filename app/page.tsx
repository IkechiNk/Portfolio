"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Image from "next/image";
import {
  COriginal,
  UbuntuPlainWordmark,
  JavaOriginalWordmark,
  PythonOriginalWordmark,
  OcamlOriginalWordmark,
  GitPlainWordmark,
  JavascriptOriginal,
  ReactOriginalWordmark,
} from "devicons-react";
import SocialLinks from "@/components/social-links";
import CardContainer from "@/components/card-container";
import SideNavigation from "@/components/side-navigation";
import { motion, useScroll } from "framer-motion";

// Import only the forest elements we want to keep
import ForestLeaves from "@/components/forest-leaves";
import ForestCreatures from "@/components/forest-creatures";

export default function Portfolio() {
  const [email, setEmail] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@johndoe.com");
  };

  // Track current section for navigation
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = document.querySelectorAll("section[id]");

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen  text-white" ref={containerRef}>
      {/* 3D Background Canvas - simplified with just flying elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.4}
            color="#E6D1B1"
          />

          {/* Animated leaves */}
          <ForestLeaves scrollProgress={scrollYProgress} />

          {/* Forest creatures */}
          <ForestCreatures scrollProgress={scrollYProgress} />

          <Preload all />
        </Canvas>
      </div>

      {/* Side Navigation */}
      <SideNavigation activeSection={activeSection} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center p-4 md:p-8"
        >
          <div className="max-w-7xl w-full mx-auto">
            <CardContainer className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Intro Card */}
              <motion.div
                className="md:col-span-6 lg:col-span-5 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between border border-[#3A5A47]/30"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div>
                  <h1 className="text-3xl font-bold text-[#E6D1B1] mb-4">
                    Hi, I'm Ikechi Nkemakolam —
                  </h1>
                  <p className="text-[#A7BBA8] mb-1">
                    Student developer studying computer science and artificial
                    intelligence at Cornell University. I'm from the greater
                    metropolitan area of New York City and I love programming,
                    reading, and listening to music.
                  </p>
                </div>
              </motion.div>

              {/* Project Card 1 */}
              <motion.div
                className="md:col-span-6 lg:col-span-4 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl overflow-hidden border border-[#3A5A47]/30"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className="relative h-full min-h-[250px]">
                  <Image
                    src="/placeholder.svg?height=600&width=400"
                    alt="Project 1"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Project Card 2 */}
              <motion.div
                className="md:col-span-6 lg:col-span-3 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl overflow-hidden border border-[#3A5A47]/30"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative h-full min-h-[250px]">
                  <Image
                    src="/placeholder.svg?height=600&width=300"
                    alt="Project 2"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="md:col-span-6 lg:col-span-3 grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <SocialLinks />
              </motion.div>
            </CardContainer>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center p-4 md:p-8"
        >
          <div className="max-w-7xl w-full mx-auto">
            <CardContainer className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Profile Photo */}
              <motion.div
                className="md:col-span-6 lg:col-span-3 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl overflow-hidden border border-[#3A5A47]/30"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-full min-h-[300px]">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="John Doe"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* About Text */}
              <motion.div
                className="md:col-span-6 lg:col-span-5 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between border border-[#3A5A47]/30"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <div>
                  <h2 className="text-[#A7BBA8] uppercase text-sm font-medium mb-4">
                    About
                  </h2>
                  <p className="text-[#E6D1B1] text-xl mb-4">
                    Passionate about developing with the newest technologies and
                    solving complex problems with creative solutions.
                  </p>
                  <p className="text-[#A7BBA8]">
                    I'm a passionate developer and problem-solver currently
                    studying Computer Science with a minor in AI at Cornell
                    University. I hope to specialize in building interactive and
                    memorable experiences that push the boundaries of what's
                    possible with today's technology while also providing a
                    positive impact on those around me.
                  </p>
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                className="md:col-span-12 lg:col-span-4 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl p-8 border border-[#3A5A47]/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-[#E6D1B1] text-xl font-medium mb-6">
                  Technologies
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    <JavaOriginalWordmark size={50} />,
                    <PythonOriginalWordmark size={50} />,
                    <COriginal size={50} />,
                    <JavascriptOriginal size={50} />,
                    <OcamlOriginalWordmark size={50} />,
                    <GitPlainWordmark size={50} />,
                    <UbuntuPlainWordmark size={50} />,
                    <ReactOriginalWordmark size={50} />,
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="bg-[#0D1B14]/50 rounded-xl p-4 border border-[#3A5A47]/20 flex items-center"
                    >
                      {/* <p className="text-[#C9B38C]">{skill[0]}</p> */}
                      <div className="flex justify-center items-center w-full h-full">
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </CardContainer>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center p-4 md:p-8"
        >
          <div className="max-w-7xl w-full mx-auto">
            <CardContainer className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <motion.div
                className="md:col-span-12 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl p-4 border border-[#3A5A47]/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-[#E6D1B1] text-2xl font-bold mb-2">
                  Featured Projects
                </h2>
              </motion.div>

              {/* Project Cards */}
              {[1, 2, 3].map((project, index) => (
                <motion.div
                  key={index}
                  className="md:col-span-4 bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl overflow-hidden border border-[#3A5A47]/30"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="relative h-48">
                    <Image
                      src={`/placeholder.svg?height=300&width=400`}
                      alt={`Project ${project}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[#E6D1B1] text-xl font-medium mb-2">
                      Project {project}
                    </h3>
                    <p className="text-[#A7BBA8] mb-4">
                      A brief description of this amazing project and the
                      technologies used.
                    </p>
                    <div className="flex gap-2">
                      {["React", "Three.js", "WebGL"].map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-[#0D1B14] rounded-full text-xs text-[#C9B38C]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContainer>
          </div>
        </section>
      </div>
    </main>
  );
}
