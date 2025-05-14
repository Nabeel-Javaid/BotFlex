import React, { useEffect, useState } from "react";
import { SearchQuery } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Country, State } from "country-state-city";

interface SearchResultProps {
  result: { success: boolean; message: string };
  searchData: SearchQuery;
  directApiSuccess?: boolean;
}

export default function SearchResult({ result, searchData, directApiSuccess = false }: SearchResultProps) {
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");

  // Get country and state names from the codes
  useEffect(() => {
    if (searchData.country) {
      const country = Country.getCountryByCode(searchData.country);
      if (country) {
        setCountryName(country.name);
      }
    }

    if (searchData.country && searchData.region) {
      const state = State.getStateByCodeAndCountry(searchData.region, searchData.country);
      if (state) {
        setStateName(state.name);
      }
    }
  }, [searchData.country, searchData.region]);

  if (!result.success) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-lg text-orange-800">Search Results</CardTitle>
          <CardDescription className="text-orange-700">{result.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Create a summary of the applied filters
  const activeFilters = [];

  if (searchData.companySize && searchData.companySize !== 'any') {
    activeFilters.push(`Company size: ${searchData.companySize}`);
  }

  if (searchData.industry) {
    activeFilters.push(`Industry: ${searchData.industry}`);
  }

  if (countryName) {
    activeFilters.push(`Country: ${countryName}`);
  }

  if (stateName) {
    activeFilters.push(`Region: ${stateName}`);
  }

  if (searchData.city) {
    activeFilters.push(`City: ${searchData.city}`);
  }

  if (searchData.jobLevels && searchData.jobLevels.length > 0) {
    activeFilters.push(`Job levels: ${searchData.jobLevels.length} selected`);
  }

  if (searchData.jobTitles && searchData.jobTitles.length > 0) {
    activeFilters.push(`Job titles: ${searchData.jobTitles.length} selected`);
  }

  return (
    <div className="space-y-6">
      {/* Status notification */}
      {directApiSuccess ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center space-x-3 py-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-700">
              Your search query has been sent directly to Clay API successfully.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center space-x-3 py-4">
            <p className="text-sm text-blue-700">
              Your search query has been processed and sent to Clay API.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Discord notification */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="flex items-center space-x-3 py-4">
          <MessageSquare className="h-5 w-5 text-purple-600" />
          <p className="text-sm text-purple-700">
            Your lead search query has been sent to our team's Discord channel for monitoring.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Search Summary</CardTitle>
              <CardDescription>Your filters have been processed</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-muted-foreground mr-2">Filters:</span>
              {activeFilters.map((filter, idx) => (
                <Badge key={idx} variant="secondary">{filter}</Badge>
              ))}
            </div>
          )}

          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Data sent to Clay API successfully!</span>
            </h3>
            <p className="text-sm text-green-700 mb-2">
              Your search data has been sent to Clay API. Check your Clay dashboard for the processed leads.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
