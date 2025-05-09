import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const vintageButtonVariants = cva(
  "relative font-special-elite text-[#F5F5DC] shadow-md transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-[#8B4513] hover:bg-[#A52A2A]",
        accent: "bg-[#A52A2A] hover:bg-[#8B4513]",
        outline: "bg-transparent border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10",
      },
      size: {
        default: "px-5 py-2 rounded-sm",
        sm: "px-3 py-1 rounded-sm text-sm",
        lg: "px-8 py-3 rounded-sm text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface VintageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof vintageButtonVariants> {
  asChild?: boolean;
}

const VintageButton = React.forwardRef<HTMLButtonElement, VintageButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(
          vintageButtonVariants({ variant, size, className }),
          "typewriter-button active:transform active:translate-y-[3px]"
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        <span className="absolute inset-0 bg-paper-texture-dark opacity-50"></span>
      </Comp>
    );
  }
);

VintageButton.displayName = "VintageButton";

export { VintageButton, vintageButtonVariants };
