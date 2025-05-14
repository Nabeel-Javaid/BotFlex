import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { SearchQuery, companySizeOptions, industryOptions, jobLevelOptions, jobTitleOptions } from "@shared/schema";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Users, LineChart, Building, Globe } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Country, State, City, ICountry, IState, ICity } from "country-state-city";

interface FormSectionProps {
  form: UseFormReturn<SearchQuery>;
}

export function PersonalDetailsSection({ form }: FormSectionProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 card-hover">
      <div>
        <h3 className="font-heading text-xl font-semibold mb-6 text-slate-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-blue-600 h-5 w-5"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Person Name */}
          <FormField
            control={form.control}
            name="personName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. John Doe"
                    className="focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. New York, USA"
                    className="focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Additional Person Filters */}
          <div className="space-y-3 md:col-span-2 p-4 bg-slate-50 rounded-lg">
            <h4 className="text-sm font-medium text-slate-600 mb-3">Additional Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="hasEmail"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="hasEmail"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer" htmlFor="hasEmail">
                      Has email address
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasPhone"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="hasPhone"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer" htmlFor="hasPhone">
                      Has phone number
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasSocialProfiles"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="hasSocialProfiles"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer" htmlFor="hasSocialProfiles">
                      Has social profiles
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfessionalDetailsSection({ form }: FormSectionProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 card-hover">
      <div>
        <h3 className="font-heading text-xl font-semibold mb-6 text-slate-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-blue-600 h-5 w-5"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
            <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
            <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          Professional Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Occupation / Job Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Software Engineer"
                    className="focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Acme Corporation"
                    className="focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Company Size */}
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Company Size
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any size</SelectItem>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1001+">1001+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Industry */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Industry
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Technology"
                    className="focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Additional Professional Filters */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="text-sm font-medium text-slate-600 mb-3">Company Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="currentRole"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="currentRole"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer" htmlFor="currentRole">
                    Current role only
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publiclyTraded"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="publiclyTraded"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer" htmlFor="publiclyTraded">
                    Only publicly traded companies
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdvancedFiltersSection({ form }: FormSectionProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 card-hover">
      <div>
        <h3 className="font-heading text-xl font-semibold mb-6 text-slate-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-blue-600 h-5 w-5"
          >
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"></path>
          </svg>
          Advanced Filters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Years of Experience */}
          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Minimum Years of Experience
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Any experience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any experience</SelectItem>
                    <SelectItem value="1">1+ years</SelectItem>
                    <SelectItem value="3">3+ years</SelectItem>
                    <SelectItem value="5">5+ years</SelectItem>
                    <SelectItem value="10">10+ years</SelectItem>
                    <SelectItem value="15">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Education Level */}
          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Education Level
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Any education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any education</SelectItem>
                    <SelectItem value="highSchool">High School</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Skills */}
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="space-y-2 md:col-span-2">
                <FormLabel className="font-medium text-sm text-slate-700">
                  Skills (separate with commas)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. JavaScript, Marketing, Leadership"
                    className="focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Additional Advanced Filters */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="text-sm font-medium text-slate-600 mb-3">Additional Criteria</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="recentlyActive"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="recentlyActive"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer" htmlFor="recentlyActive">
                    Active in last 3 months
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="verifiedProfiles"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="verifiedProfiles"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-slate-700 cursor-pointer" htmlFor="verifiedProfiles">
                    Only verified profiles
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompanyAttributesSection({ form }: FormSectionProps) {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Company Attributes</CardTitle>
        <CardDescription>Filter leads by company characteristics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companySizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <Input placeholder="Enter keywords (e.g., startup, B2B, SaaS)" {...field} />
              </FormControl>
              <FormDescription>
                Separate multiple keywords with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


      </CardContent>
    </Card>
  );
}

export function LocationSection({ form }: FormSectionProps) {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>(form.getValues().country || "");
  const [selectedState, setSelectedState] = useState<string>(form.getValues().region || "");

  // Load countries on component mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);

      // Reset state and city if country changes
      if (form.getValues().country !== selectedCountry) {
        form.setValue('region', '');
        form.setValue('city', '');
        setSelectedState('');
        setCities([]);
      }
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry, form]);

  // Load cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const stateCities = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(stateCities);

      // Reset city if state changes
      if (form.getValues().region !== selectedState) {
        form.setValue('city', '');
      }
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState, form]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    form.setValue('country', value);
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    form.setValue('region', value);
  };

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Location</CardTitle>
        <CardDescription>Filter leads by geographic location</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={handleCountryChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Region</FormLabel>
              <Select
                onValueChange={handleStateChange}
                value={field.value}
                disabled={!selectedCountry || states.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={states.length === 0 ? "Select country first" : "Select state/region"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                First select a country to see available regions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedState || cities.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={cities.length === 0 ? "Select state/region first" : "Select city"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {cities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <FormDescription>
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />


      </CardContent>
    </Card>
  );
}

export function JobTitleSection({ form }: FormSectionProps) {
  const [selectedJobLevels, setSelectedJobLevels] = useState<string[]>(form.getValues().jobLevels || []);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>(form.getValues().jobTitles || []);

  const handleJobLevelChange = (value: string) => {
    const updatedValues = selectedJobLevels.includes(value)
      ? selectedJobLevels.filter(item => item !== value)
      : [...selectedJobLevels, value];

    setSelectedJobLevels(updatedValues);
    form.setValue('jobLevels', updatedValues);
  };

  const handleJobTitleChange = (value: string) => {
    const updatedValues = selectedJobTitles.includes(value)
      ? selectedJobTitles.filter(item => item !== value)
      : [...selectedJobTitles, value];

    setSelectedJobTitles(updatedValues);
    form.setValue('jobTitles', updatedValues);
  };

  return (
    <Card className="border-l-4 border-l-purple-500 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Job Title</CardTitle>
        <CardDescription>Filter leads by job level and title</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-4">
          <FormLabel>Job Levels</FormLabel>
          <div className="flex flex-wrap gap-2">
            {jobLevelOptions.map((option) => (
              <Badge
                key={option.value}
                variant={selectedJobLevels.includes(option.value) ? "default" : "outline"}
                className="cursor-pointer hover:bg-muted-foreground/10"
                onClick={() => handleJobLevelChange(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <FormLabel>Job Titles</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <div className="relative flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                  {selectedJobTitles.length > 0 ? (
                    <div className="flex gap-1 flex-wrap">
                      {selectedJobTitles.map(value => {
                        const label = jobTitleOptions.find(option => option.value === value)?.label;
                        return (
                          <Badge variant="secondary" key={value} className="mr-1 mb-1">
                            {label}
                          </Badge>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Select job titles...</span>
                  )}
                  <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search job title..." />
                <CommandEmpty>No job title found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-auto">
                  {jobTitleOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleJobTitleChange(option.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedJobTitles.includes(option.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            Select multiple job titles to include in your search
          </FormDescription>
        </div>

        
      </CardContent>
    </Card>
  );
}

export function ResultsLimitSection({ form }: FormSectionProps) {
  const [sliderValue, setSliderValue] = useState<number[]>([form.getValues().resultsLimit || 100]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    form.setValue('resultsLimit', value[0]);
  };

  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Results</CardTitle>
        <CardDescription>Configure how many leads you want</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <FormField
          control={form.control}
          name="resultsLimit"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Limit Results</FormLabel>
                <span className="text-sm font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {sliderValue[0]} leads
                </span>
              </div>
              <div className="space-y-4">
                <Slider
                  defaultValue={[field.value || 100]}
                  max={1000}
                  min={1}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="py-2"
                />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resultsLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Or enter exact number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100"
                  min={1}
                  max={1000}
                  {...field}
                  onChange={e => {
                    const value = parseInt(e.target.value);
                    field.onChange(value);
                    setSliderValue([value]);
                  }}
                />
              </FormControl>
              <FormDescription className="flex items-center justify-between">
                <span>Maximum 1,000 leads</span>
                <span className="text-xs text-muted-foreground">Enter a specific number</span>
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 mt-3">
          <div className="flex items-start space-x-3">
            <div className="mt-1 bg-amber-100 p-1 rounded-full">
              <LineChart className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">Quality over quantity</p>
              <p className="text-xs text-amber-600 mt-1">
                For better quality leads, use more specific filters and a lower quantity.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
