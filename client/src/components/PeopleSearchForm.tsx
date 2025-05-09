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
import { VintageButton } from "@/components/ui/vintage-button";

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
      companySize: "",
      industry: "",
      currentRole: false,
      publiclyTraded: false,
      
      // Advanced filters
      yearsOfExperience: "",
      educationLevel: "",
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
          <VintageButton
            type="submit"
            disabled={isLoading}
            className="px-8 py-3"
          >
            <span className="relative z-10">Retrieve Records</span>
          </VintageButton>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="loading-spinner mb-4"></div>
            <p className="font-special-elite text-[#8B4513] text-center">Searching through archives...</p>
          </div>
        )}
      </form>
    </Form>
  );
}
