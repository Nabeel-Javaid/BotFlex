import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PeopleSearchForm from "@/components/PeopleSearchForm";
import SearchResult from "@/components/SearchResult";
import LeadResults from "@/components/LeadResults";
import { SearchQuery } from "@shared/schema";
import { Sliders, Send, Info, AlertTriangle, ExternalLink, Globe, Database } from "lucide-react";
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
  const [showResults, setShowResults] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string>("");

  // Get the current URL when component mounts
  useEffect(() => {
    const url = window.location.origin;
    setDeployedUrl(url);
  }, []);

  const handleSearchSubmit = (result: { success: boolean; message: string; clayApiSuccess?: boolean }, data: SearchQuery) => {
    setSearchResult(result);
    setSubmittedData(data);
    setIsLoading(false);
    setShowCorsFallback(!result.clayApiSuccess);
    setShowResults(true); // Show results section
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

  const handleTestWebhook = async () => {
    try {
      toast({
        title: "Simulating webhook callback",
        description: "Loading sample lead data...",
        duration: 3000,
      });

      const response = await fetch('/api/simulate-callback');
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Test data loaded",
          description: data.message,
          duration: 5000,
        });
        setShowResults(true);
      } else {
        toast({
          title: "Error simulating webhook",
          description: data.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error testing webhook:', error);
      toast({
        title: "Error testing webhook",
        description: "Could not load sample data",
        variant: "destructive",
        duration: 5000,
      });
    }
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestWebhook}
                  className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                >
                  <Database className="h-3 w-3" />
                  Test Webhook
                </Button>
              </div>
            </div>
          </div>

          {/* Webhook URL Information */}
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Globe className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800">Webhook URL for Clay Callback</AlertTitle>
            <AlertDescription className="text-blue-700">
              <p>Your friend should send the processed data to this webhook URL:</p>
              <code className="block mt-2 p-2 bg-blue-100 rounded font-mono text-sm overflow-auto">
                {deployedUrl}/api/clay-webhook
              </code>
              <p className="mt-2 text-sm">
                After your friend sends data to this URL, the results will automatically appear below.
              </p>
            </AlertDescription>
          </Alert>

          {/* Success Alert */}
          {searchResult?.clayApiSuccess && (
            <Alert className="mb-6 border-green-300 bg-green-50">
              <Info className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your data was successfully sent to Clay API. Check below for results once your friend processes the data.
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

          {/* Lead Results - Display when results should be shown */}
          {showResults && <LeadResults />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
