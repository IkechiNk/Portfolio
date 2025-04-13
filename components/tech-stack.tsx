import Image from "next/image"

export default function TechStack() {
  const technologies = [
    { name: "React", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Three.js", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Figma", icon: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="flex gap-4">
      {technologies.map((tech, index) => (
        <div
          key={index}
          className="bg-[#0D1B14] rounded-full w-12 h-12 flex items-center justify-center"
          title={tech.name}
        >
          <div className="relative w-6 h-6">
            <Image src={tech.icon || "/placeholder.svg"} alt={tech.name} fill className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  )
}
