import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PeopleSearchForm from "@/components/PeopleSearchForm";
import SearchResult from "@/components/SearchResult";
import { SearchQuery } from "@shared/schema";
import { Sliders, Send, Info, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { testClayAPI } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Clay API webhook URL
const CLAY_WEBHOOK_URL = 'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-9b7961bf-0334-478c-b9ee-8bb3b8062135';

export default function Home() {
  const [searchResult, setSearchResult] = useState<{ success: boolean; message: string; clayApiSuccess?: boolean } | null>(null);
  const [submittedData, setSubmittedData] = useState<SearchQuery | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestSending, setIsTestSending] = useState(false);
  const [showCorsFallback, setShowCorsFallback] = useState(false);

  const handleSearchSubmit = (result: { success: boolean; message: string; clayApiSuccess?: boolean }, data: SearchQuery) => {
    setSearchResult(result);
    setSubmittedData(data);
    setIsLoading(false);
    setShowCorsFallback(!result.clayApiSuccess);
  };

  const handleSearchStart = () => {
    setIsLoading(true);
    setSearchResult(null);
  };

  const handleTestSend = async () => {
    setIsTestSending(true);

    toast({
      title: "Sending test data to Clay API",
      description: "Trying multiple CORS proxies to send data directly...",
      duration: 5000,
    });

    const result = await testClayAPI();
    setShowCorsFallback(!result.success);

    setIsTestSending(false);

    toast({
      title: result.success ? "Success!" : "Direct API call failed",
      description: result.message,
      variant: result.success ? "default" : "destructive",
      duration: 5000,
    });
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
              <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Sliders className="h-4 w-4 mr-1" />
                  <span>Configure your search filters below</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestSend}
                  disabled={isTestSending}
                  className="flex items-center gap-1 text-xs"
                >
                  <Send className="h-3 w-3" />
                  {isTestSending ? "Sending..." : "Test API Connection"}
                </Button>
              </div>
            </div>
          </div>

          {/* CORS Explanation */}
          {/* <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800">About API Connectivity</AlertTitle>
            <AlertDescription className="text-blue-700">
              <p>We're using multiple CORS proxies to try connecting directly to Clay API for your search queries.</p>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline mt-1 text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                Learn more about CORS
              </a>
            </AlertDescription>
          </Alert> */}

          {/* Success Alert */}
          {searchResult?.clayApiSuccess && (
            <Alert className="mb-6 border-green-300 bg-green-50">
              <Info className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your data was successfully sent directly to Clay API via a CORS proxy.
              </AlertDescription>
            </Alert>
          )}

          {/* Conditional CORS Error Alert */}
          {showCorsFallback && (
            <Alert className="mb-6 border-amber-300 bg-amber-50">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800">Direct API Call Failed</AlertTitle>
              <AlertDescription className="text-amber-700">
                We tried multiple CORS proxies but couldn't connect directly to Clay API.
                Your search has been sent through an alternative method.
              </AlertDescription>
            </Alert>
          )}

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
                directApiSuccess={searchResult.clayApiSuccess}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
