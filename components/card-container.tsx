import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CardContainerProps {
  children: ReactNode
  className?: string
}

export default function CardContainer({ children, className }: CardContainerProps) {
  return <div className={cn("grid auto-rows-[minmax(180px,auto)]", className)}>{children}</div>
}
