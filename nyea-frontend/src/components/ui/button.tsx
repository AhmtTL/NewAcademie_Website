import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
        apple: "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
        primary: "bg-gradient-to-r from-[#9f162e] to-[#1f2444] text-white hover:from-[#1f2444] hover:to-[#9f162e] shadow-lg hover:shadow-xl",
        secondary_brand: "bg-[#1f2444] text-white hover:bg-[#9f162e] shadow-lg hover:shadow-xl transition-all duration-300",
        learn_more: "bg-[#1f2444] text-white hover:bg-[#9f162e] shadow-lg hover:shadow-xl transition-all duration-300",
        view_all: "bg-[#9f162e] text-white hover:bg-[#1f2444] shadow-lg hover:shadow-xl transition-all duration-300",
        transparent: "bg-transparent border border-white text-white hover:bg-white hover:text-[#1f2444] transition-all duration-300",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-10 md:h-12 lg:h-14 rounded-xl px-8 text-xs md:text-sm lg:text-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 