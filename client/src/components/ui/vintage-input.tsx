import * as React from "react";
import { cn } from "@/lib/utils";

export interface VintageInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const VintageInput = React.forwardRef<HTMLInputElement, VintageInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full px-3 py-2 transition-all duration-300",
          "bg-[rgba(245,245,220,0.8)] border-b-2 border-[#8B4513]",
          "focus:outline-none focus:shadow-[0_4px_8px_rgba(139,69,19,0.2)]",
          "focus:animate-[inkSpread_0.5s_ease_forwards]",
          "placeholder:text-[#3E2723]/50 placeholder:font-special-elite placeholder:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

VintageInput.displayName = "VintageInput";

export { VintageInput };
