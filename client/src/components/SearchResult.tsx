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
      {/* <Card className="border-purple-200 bg-purple-50">
        <CardContent className="flex items-center space-x-3 py-4">
          <MessageSquare className="h-5 w-5 text-purple-600" />
          <p className="text-sm text-purple-700">
            Your lead search query has been sent to our team's Discord channel for monitoring.
          </p>
        </CardContent>
      </Card> */}

      
    </div>
  );
}
