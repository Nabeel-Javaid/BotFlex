import React from "react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="relative py-6 px-4 md:px-8 bg-[#8B4513] bg-paper-texture-dark bg-blend-multiply">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center mb-4 md:mb-0">
            <svg 
              className="w-8 h-8 mr-3 text-[#F5F5DC]" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 21H14M10 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H14M10 21V17M14 21V17M8 6H16M8 10H16M8 14H11" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <Link href="/">
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#F5F5DC] italic cursor-pointer">
                ArchiVintage
              </h1>
            </Link>
          </div>
          
          {/* Subtitle */}
          <p className="font-special-elite text-[#F5F5DC] text-sm md:text-base">
            Your Vintage People Research Archive
          </p>
        </div>
      </div>
      
      {/* Decorative header border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#A52A2A] via-[#D2B48C] to-[#A52A2A]"></div>
    </header>
  );
}
