import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-gold-500/20 text-gold-400 border border-gold-500/30",
        secondary: "bg-white/10 text-slate-300 border border-white/10",
        destructive: "bg-red-500/20 text-red-400 border border-red-500/30",
        outline: "border border-white/20 text-slate-300",
        success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        purple: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Badge = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
