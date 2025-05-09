import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SearchQuery } from "@shared/schema";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
