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
    <div className="min-h-screen font-roboto-slab text-[#3E2723] flex flex-col">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 md:px-8 flex-grow">
        {/* Intro Card */}
        <div className="paper-card bg-white mb-10 p-6 rounded-md shadow-md fold-animation relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-playfair text-2xl mb-4 text-[#8B4513] border-b-2 border-[#D2B48C] pb-2">
              Welcome to the Research Archives
            </h2>
            <p className="mb-4">
              Use our vintage-inspired search system to find detailed information about people and companies. 
              Apply filters below and click the "Retrieve Records" button to submit your query.
            </p>
            
            {/* Vintage image - Old filing cabinet */}
            <img 
              src="https://pixabay.com/get/g98f7362eb9967abc446922b4052f728c12ca97e6bb442fdfe537e6f6092d7dbf486c86ccfd4e8e8aa7e269e5a64bd7f5e6fca146683cd7679ee1ddb112916c46_1280.jpg" 
              alt="Vintage filing cabinet with index cards" 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            
            <p className="text-sm text-[#3E2723]/70 font-special-elite">
              <i className="fas fa-info-circle mr-2"></i>
              All searches are meticulously cataloged and processed through our archival system.
            </p>
          </div>
          
          {/* Background paper texture */}
          <div className="absolute inset-0 bg-paper-texture opacity-10 z-0"></div>
        </div>
        
        <PeopleSearchForm 
          onSearchSubmit={handleSearchSubmit} 
          onSearchStart={handleSearchStart}
          isLoading={isLoading}
        />
        
        {searchResult && submittedData && (
          <SearchResult 
            result={searchResult}
            searchData={submittedData}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
