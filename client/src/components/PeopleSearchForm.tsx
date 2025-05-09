import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { searchQuerySchema, type SearchQuery } from "@shared/schema";
import { Form } from "@/components/ui/form";
import { 
  PersonalDetailsSection, 
  ProfessionalDetailsSection, 
  AdvancedFiltersSection 
} from "@/components/FormSections";
import { Button } from "@/components/ui/button";

interface PeopleSearchFormProps {
  onSearchSubmit: (result: { success: boolean; message: string }, data: SearchQuery) => void;
  onSearchStart: () => void;
  isLoading: boolean;
}

export default function PeopleSearchForm({ 
  onSearchSubmit, 
  onSearchStart,
  isLoading 
}: PeopleSearchFormProps) {
  const form = useForm<SearchQuery>({
    resolver: zodResolver(searchQuerySchema),
    defaultValues: {
      // Personal details
      personName: "",
      location: "",
      hasEmail: false,
      hasPhone: false,
      hasSocialProfiles: false,
      
      // Professional details
      jobTitle: "",
      companyName: "",
      companySize: "any",
      industry: "",
      currentRole: false,
      publiclyTraded: false,
      
      // Advanced filters
      yearsOfExperience: "any",
      educationLevel: "any",
      skills: "",
      recentlyActive: false,
      verifiedProfiles: false,
    }
  });

  const onSubmit = async (data: SearchQuery) => {
    try {
      onSearchStart();
      
      const response = await apiRequest("POST", "/api/search", data);
      const result = await response.json();
      
      onSearchSubmit(result, data);
    } catch (error) {
      console.error("Error submitting search:", error);
      onSearchSubmit(
        { 
          success: false, 
          message: error instanceof Error ? error.message : "An error occurred while submitting your search" 
        }, 
        data
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Details Section */}
        <PersonalDetailsSection form={form} />
        
        {/* Professional Details Section */}
        <ProfessionalDetailsSection form={form} />
        
        {/* Advanced Filters Section */}
        <AdvancedFiltersSection form={form} />
        
        {/* Submit Button Section */}
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="px-8 py-6 text-base font-medium rounded-lg shadow-md transition-all hover:shadow-lg hover:translate-y-[-2px]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search People
              </>
            )}
          </Button>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center mt-6">
            <p className="font-body text-slate-600 text-center">Searching for matching profiles...</p>
          </div>
        )}
      </form>
    </Form>
  );
}
