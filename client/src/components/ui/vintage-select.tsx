import * as React from "react";
import { cn } from "@/lib/utils";

export interface VintageSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

const VintageSelect = React.forwardRef<HTMLSelectElement, VintageSelectProps>(
  ({ className, onValueChange, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "w-full px-3 py-2 transition-all duration-300 appearance-none",
            "bg-[rgba(245,245,220,0.8)] border-b-2 border-[#8B4513]",
            "focus:outline-none focus:shadow-[0_4px_8px_rgba(139,69,19,0.2)]",
            "bg-paper-texture-light bg-blend-overlay",
            className
          )}
          onChange={(e) => onValueChange?.(e.target.value)}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#8B4513]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }
);

VintageSelect.displayName = "VintageSelect";

export { VintageSelect };
