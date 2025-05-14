import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PeopleSearchForm from "@/components/PeopleSearchForm";
import SearchResult from "@/components/SearchResult";
import { SearchQuery } from "@shared/schema";
import { Sliders } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 font-sans text-foreground flex flex-col">
      <Header />
      
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="pb-5 border-b border-gray-200 mb-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lead Finder</h1>
                <p className="mt-1 text-sm text-gray-500">Find the right leads using advanced filters</p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Sliders className="h-4 w-4 mr-1" />
                  <span>Configure your search filters below</span>
              </div>
            </div>
          </div>
        </div>
        
          {/* Search Filters */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
          <PeopleSearchForm 
            onSearchSubmit={handleSearchSubmit} 
            onSearchStart={handleSearchStart}
            isLoading={isLoading}
          />
            </div>
        </div>
        
          {/* Search Results */}
        {searchResult && submittedData && (
            <div className="mt-8">
            <SearchResult 
              result={searchResult}
              searchData={submittedData}
            />
          </div>
        )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
