import React, { useEffect, useRef } from "react";
import { SearchQuery } from "@shared/schema";
import { formatFilterName } from "@/lib/utils";

interface SearchResultProps {
  result: { success: boolean; message: string };
  searchData: SearchQuery;
}

export default function SearchResult({ result, searchData }: SearchResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  return (
    <div 
      ref={resultRef}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 card-hover fade-in"
    >
      <div>
        <div className="flex items-center mb-4">
          {result.success ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
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
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-800">
                Search Successful
              </h3>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
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
                  className="text-red-600"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-slate-800">
                Search Error
              </h3>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-slate-50 p-4 mb-6">
          <p className="text-slate-700 font-medium">
            {result.success 
              ? "Your search query has been processed successfully." 
              : "There was an issue processing your query."
            }
          </p>
          <p className="mt-2 text-slate-600 text-sm">
            {result.success 
              ? "The filter data has been sent to the Discord webhook." 
              : result.message
            }
          </p>
        </div>
            
        {result.success && (
          <div className="mt-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Search Criteria</h4>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Filter</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {Object.entries(searchData).map(([key, value]) => {
                    // Skip empty string values
                    if (value === "") return null;
                    // Skip false boolean values
                    if (value === false) return null;
                    // Skip "any" values from our select dropdowns
                    if (value === "any") return null;
                    
                    return (
                      <tr key={key} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                          {formatFilterName(key)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                          {typeof value === "boolean" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Yes
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
