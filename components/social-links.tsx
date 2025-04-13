import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Mail, Github, Instagram } from "lucide-react"

export default function SocialLinks() {
  const socialLinks = [
    { icon: <Twitter className="h-5 w-5 text-[#C9B38C]" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5 text-[#C9B38C]" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5 text-[#C9B38C]" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5 text-[#C9B38C]" />, href: "mailto:hello@example.com", label: "Email" },
    { icon: <Github className="h-5 w-5 text-[#C9B38C]" />, href: "https://github.com", label: "GitHub" },
  ]

  return (
    <>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1A2E23]/80 backdrop-blur-md rounded-3xl flex items-center justify-center"
          aria-label={link.label}
        >
          <Button variant="ghost" size="icon" className="h-full w-full rounded-3xl">
            {link.icon}
          </Button>
        </a>
      ))}
    </>
  )
}
