import { useState } from "react";
import { SearchQuery } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface UseSearchFormReturn {
  isLoading: boolean;
  searchResult: { success: boolean; message: string } | null;
  submittedData: SearchQuery | null;
  handleSubmit: (data: SearchQuery) => Promise<void>;
  resetForm: () => void;
}

export function useSearchForm(): UseSearchFormReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{ success: boolean; message: string } | null>(null);
  const [submittedData, setSubmittedData] = useState<SearchQuery | null>(null);

  const handleSubmit = async (data: SearchQuery) => {
    try {
      setIsLoading(true);
      setSearchResult(null);
      
      const response = await apiRequest("POST", "/api/search", data);
      const result = await response.json();
      
      setSearchResult(result);
      setSubmittedData(data);
    } catch (error) {
      console.error("Error submitting search:", error);
      setSearchResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred while submitting your search"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSearchResult(null);
    setSubmittedData(null);
  };

  return {
    isLoading,
    searchResult,
    submittedData,
    handleSubmit,
    resetForm
  };
}
