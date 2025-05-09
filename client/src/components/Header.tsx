import React, { useState } from "react";
import { Link } from "wouter";
import { UserMenu } from "@/components/auth";
import { AuthModal } from "@/components/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };
  
  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <header className="relative py-4 px-4 md:px-8 bg-white shadow-sm z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center">
            <svg 
              className="w-8 h-8 mr-3 text-blue-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <Link href="/">
              <div className="cursor-pointer">
                <h1 className="font-heading text-2xl font-bold text-slate-800">
                  <span className="text-blue-600">People</span>Search
                </h1>
                <div className="h-1 w-12 bg-gradient-primary rounded-full"></div>
              </div>
            </Link>
          </div>
          
          {/* Desktop user menu */}
          <div className="hidden md:flex items-center">
            <UserMenu onOpenAuthModal={handleOpenAuthModal} />
          </div>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between">
              <div className="py-6">
                <h2 className="text-lg font-medium mb-5">Menu</h2>
                <div className="flex flex-col space-y-3">
                  <Link href="/">
                    <span className="text-slate-600 hover:text-blue-600 transition-colors font-medium cursor-pointer">Home</span>
                  </Link>
                  <div className="md:hidden w-full pt-4">
                    <UserMenu onOpenAuthModal={handleOpenAuthModal} />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </header>
  );
}
