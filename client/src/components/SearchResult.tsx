import React, { useEffect, useState } from "react";
import { SearchQuery } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, UserRound, Building, MapPin, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Country, State } from "country-state-city";

interface SearchResultProps {
  result: { success: boolean; message: string };
  searchData: SearchQuery;
}

const MockPersonData = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Chief Marketing Officer",
    company: "TechGrowth Inc.",
    location: "San Francisco, CA",
    email: "a.morgan@techgrowth.com",
    phone: "+1 (555) 123-4567",
    photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Samantha Lee",
    title: "VP of Engineering",
    company: "InnovateSoft",
    location: "Seattle, WA",
    email: "s.lee@innovatesoft.co",
    phone: "+1 (555) 234-5678",
    photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "David Rodriguez",
    title: "Director of Sales",
    company: "Global Solutions Ltd",
    location: "Austin, TX",
    email: "d.rodriguez@globalsolutions.com",
    phone: "+1 (555) 345-6789",
    photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Jennifer Wu",
    title: "CTO",
    company: "DataSphere",
    location: "Boston, MA",
    email: "j.wu@datasphere.io",
    phone: "+1 (555) 456-7890",
    photoUrl: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Michael Chen",
    title: "Product Manager",
    company: "FutureScale",
    location: "New York, NY",
    email: "m.chen@futurescale.com",
    phone: "+1 (555) 567-8901",
    photoUrl: "https://randomuser.me/api/portraits/men/5.jpg",
  }
];

export default function SearchResult({ result, searchData }: SearchResultProps) {
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

  // Mock successful result
  const totalResults = searchData.resultsLimit || 100;
  const displayedResults = Math.min(totalResults, 5); // Only show 5 mock profiles

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
      {/* Discord notification banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-center space-x-3 py-4">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <p className="text-sm text-blue-700">
            Your lead search query (company attributes, location, job titles, and results limit) has been sent to our team's Discord channel for processing.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>Found {totalResults.toLocaleString()} matching leads</CardDescription>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Leads
            </Button>
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

          <div className="space-y-4">
            {MockPersonData.slice(0, displayedResults).map(person => (
              <div key={person.id} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="font-medium">{person.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <UserRound className="h-3 w-3 mr-1" />
                      <span>Contact details available</span>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{person.title}</span>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{person.company}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{person.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {displayedResults} of {totalResults.toLocaleString()} leads
          </div>
          <Button variant="outline">View More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
