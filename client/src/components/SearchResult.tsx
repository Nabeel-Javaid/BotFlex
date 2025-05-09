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
      className="mt-10 paper-card bg-white p-6 rounded-md shadow-md fold-animation relative overflow-hidden"
    >
      <div className="relative z-10">
        <h3 className="font-playfair text-xl mb-4 text-[#8B4513] border-b border-[#D2B48C] pb-2">
          Search Results
        </h3>
        <div className="prose">
          <div className="bg-[#F5F5DC]/30 p-4 rounded">
            <p className="font-special-elite">
              {result.success ? "Your search query has been processed successfully." : "There was an issue processing your query."}
            </p>
            <p className="mt-2">
              {result.success ? "The filter data has been sent to the Discord webhook." : result.message}
            </p>
            
            {result.success && (
              <div className="mt-4 bg-[#3E2723]/10 p-3 rounded font-mono text-sm overflow-x-auto">
                <h4 className="text-[#8B4513] font-playfair mb-2">Search Criteria:</h4>
                <table className="min-w-full">
                  <tbody>
                    {Object.entries(searchData).map(([key, value]) => {
                      // Skip empty string values
                      if (value === "") return null;
                      // Skip false boolean values
                      if (value === false) return null;
                      
                      return (
                        <tr key={key} className="border-b border-[#D2B48C]/30">
                          <td className="py-2 px-4 font-semibold">{formatFilterName(key)}</td>
                          <td className="py-2 px-4">
                            {typeof value === "boolean" ? "Yes" : value}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Background paper texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0"></div>
    </div>
  );
}
