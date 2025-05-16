import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-12 pb-8 px-4 md:px-8 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
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
              <h2 className="font-heading text-xl font-bold text-slate-800">
                <span className="text-blue-600">Bot</span>flux
              </h2>
            </div>
            <p className="text-slate-600 mb-6 max-w-md">
              Powerful Botflux platform with comprehensive filtering options.
              Find the right contacts based on detailed criteria.
            </p>
            <div className="flex space-x-4">
              <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-600"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-600"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-600"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-slate-800 mb-4">Links</h3>
            <ul className="space-y-3">
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">Home</button></li>
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">About Us</button></li>
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">Features</button></li>
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-slate-800 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">Help Center</button></li>
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</button></li>
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</button></li>
              <li><button className="text-slate-600 hover:text-blue-600 transition-colors">Contact Us</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-sm text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Botflux. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
