import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchPeople } from "@/lib/api";
import { searchQuerySchema, type SearchQuery } from "@shared/schema";
import { Form } from "@/components/ui/form";
import {
  CompanyAttributesSection,
  LocationSection,
  JobTitleSection,
  ResultsLimitSection
} from "@/components/FormSections";
import { Button } from "@/components/ui/button";
import { Search, Sliders, Info, Users, ArrowRight, LineChart, Building, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PeopleSearchFormProps {
  onSearchSubmit: (result: { success: boolean; message: string }, data: SearchQuery) => void;
  onSearchStart: () => void;
  isLoading: boolean;
}

// Information and tips for the sidebar
const InfoSection = () => {
  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-500" />
            How It Works
          </CardTitle>
          <CardDescription>Understanding our lead finding process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="mt-1 bg-blue-100 p-1 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Define your target audience</p>
              <p className="text-xs text-muted-foreground">Use the filters on the left to specify the exact characteristics of your ideal leads.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 bg-purple-100 p-1 rounded-full">
              <ArrowRight className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Submit your search</p>
              <p className="text-xs text-muted-foreground">Click the "Find Leads" button to query our database of over 500 million professionals.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 bg-green-100 p-1 rounded-full">
              <LineChart className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Get accurate results</p>
              <p className="text-xs text-muted-foreground">Receive targeted leads matching your criteria with contact information and insights.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Sliders className="h-5 w-5 mr-2 text-amber-500" />
            Search Tips
          </CardTitle>
          <CardDescription>Get the most relevant results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="mt-1 bg-amber-100 p-1 rounded-full">
              <Building className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Company Attributes</p>
              <p className="text-xs text-muted-foreground">Be specific with company size and industry to target the right organizations.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 bg-green-100 p-1 rounded-full">
              <Globe className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Location Targeting</p>
              <p className="text-xs text-muted-foreground">Narrow down to specific regions for more targeted outreach campaigns.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-1 bg-purple-100 p-1 rounded-full">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Job Title Selection</p>
              <p className="text-xs text-muted-foreground">Select multiple related job titles to expand your reach to relevant decision-makers.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">Need Help?</h3>
            <p className="text-xs text-blue-600 mt-1">
              Our team is available 24/7 to help you find the perfect leads for your business.
              <a href="#" className="font-medium text-blue-700 hover:underline ml-1">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PeopleSearchForm({
  onSearchSubmit,
  onSearchStart,
  isLoading
}: PeopleSearchFormProps) {
  const { toast } = useToast();
  const form = useForm<SearchQuery>({
    resolver: zodResolver(searchQuerySchema),
    defaultValues: {
      // Company attributes
      companySize: "any",
      industry: "",
      companyKeywords: "",

      // Location
      country: "",
      region: "",
      city: "",

      // Job Title
      jobLevels: [],
      jobTitles: [],

      // Results limit
      resultsLimit: 100,
    }
  });

  const onSubmit = async (data: SearchQuery) => {
    try {
      onSearchStart();

      // Display toast about sending data
      toast({
        title: "Submitting search",
        description: "Sending your search query...",
        duration: 3000,
      });

      const result = await searchPeople(data);

      // If successful, show success toast
      if (result.success) {
        toast({
          title: "Search submitted",
          description: "Your search query has been processed successfully.",
          variant: "default",
        });
      }

      onSearchSubmit(result, data);
    } catch (error) {
      console.error("Error submitting search:", error);

      // Show error toast
      toast({
        title: "Submission error",
        description: error instanceof Error ? error.message : "An error occurred while submitting your search",
        variant: "destructive",
      });

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Company Attributes and Location */}
          <div className="space-y-6">
            <CompanyAttributesSection form={form} />
            <LocationSection form={form} />
          </div>

          {/* Middle Column: Job Title, Results Limit, and Search Button */}
          <div className="space-y-6 flex flex-col">
            <JobTitleSection form={form} />

            {/* Results Limit Section - Moved from right column to middle column */}
            <ResultsLimitSection form={form} />

            {/* Submit Button Section */}
            <div className="mt-auto pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full py-6 text-lg font-medium rounded-lg shadow-md transition-all hover:shadow-lg bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Finding leads...
                  </>
                ) : (
                  <>
                    <Search className="h-6 w-6 mr-2" />
                    Find Leads
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-3">
                Configure your search filters to find the right leads
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center mt-4 p-4 border rounded-lg bg-muted/20">
                <div className="text-sm text-center space-y-2">
                  <p className="font-medium">Searching for leads...</p>
                  <p className="text-muted-foreground">We're searching our database for the best matches</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Information Section Only */}
          <div className="space-y-6">
            <InfoSection />
          </div>
        </div>
      </form>
    </Form>
  );
}
