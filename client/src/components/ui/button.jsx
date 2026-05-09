import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from 'class-variance-authority'
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-800",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white shadow-sm",
        secondary: "bg-white/5 text-white hover:bg-white/10",
        ghost: "hover:bg-white/10 text-white",
        link: "text-gold-400 underline-offset-4 hover:underline",
        gold: "bg-gold-gradient text-black font-bold shadow-lg shadow-gold-950/40 border-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-full px-8",
        xl: "h-14 rounded-full px-10 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
