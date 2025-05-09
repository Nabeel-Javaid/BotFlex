import * as React from "react";
import { cn } from "@/lib/utils";

export interface VintageCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const VintageCheckbox = React.forwardRef<HTMLInputElement, VintageCheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div 
        className={cn(
          "relative inline-flex items-center justify-center",
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 border-2 border-[#8B4513] bg-[#F5F5DC] cursor-pointer relative transition-all duration-200",
            checked && "bg-[#D2B48C]"
          )}
          onClick={() => onCheckedChange?.(!checked)}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-[#8B4513]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    );
  }
);

VintageCheckbox.displayName = "VintageCheckbox";

export { VintageCheckbox };
