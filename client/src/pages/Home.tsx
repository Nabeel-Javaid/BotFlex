import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PeopleSearchForm from "@/components/PeopleSearchForm";
import SearchResult from "@/components/SearchResult";
import { SearchQuery } from "@shared/schema";

export default function Home() {
  const [searchResult, setSearchResult] = useState<{ success: boolean; message: string } | null>(null);
  const [submittedData, setSubmittedData] = useState<SearchQuery | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (result: { success: boolean; message: string }, data: SearchQuery) => {
    setSearchResult(result);
    setSubmittedData(data);
    setIsLoading(false);
  };

  const handleSearchStart = () => {
    setIsLoading(true);
    setSearchResult(null);
  };

  return (
    <div className="min-h-screen font-body text-foreground flex flex-col">
      <Header />
      
      <main className="max-w-6xl mx-auto w-full px-4 py-8 md:px-8 flex-grow">
        {/* Hero Section */}
        <div className="mb-12 fade-in">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 card-shadow">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary">
                Find the Right People
              </h1>
              <p className="text-lg mb-6 text-slate-700">
                Our advanced search platform helps you discover and connect with professionals 
                based on detailed criteria like job title, company, location, and more.
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Fast and accurate results</span>
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 ml-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Comprehensive filtering</span>
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 ml-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Updated data</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="slide-in">
          <PeopleSearchForm 
            onSearchSubmit={handleSearchSubmit} 
            onSearchStart={handleSearchStart}
            isLoading={isLoading}
          />
        </div>
        
        {searchResult && submittedData && (
          <div className="mt-10 fade-in">
            <SearchResult 
              result={searchResult}
              searchData={submittedData}
            />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
