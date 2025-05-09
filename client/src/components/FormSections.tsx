import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SearchQuery } from "@shared/schema";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { VintageInput } from "@/components/ui/vintage-input";
import { VintageSelect } from "@/components/ui/vintage-select";
import { VintageCheckbox } from "@/components/ui/vintage-checkbox";

interface FormSectionProps {
  form: UseFormReturn<SearchQuery>;
}

export function PersonalDetailsSection({ form }: FormSectionProps) {
  return (
    <div className="paper-card bg-white p-6 rounded-md shadow-md relative overflow-hidden">
      <div className="relative z-10">
        <div className="stamp">
          <h3 className="font-playfair text-xl mb-6 text-[#8B4513] border-b border-[#D2B48C] pb-2">
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
              className="mr-2 inline-block h-5 w-5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Personal Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Person Name */}
          <FormField
            control={form.control}
            name="personName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Full Name
                </FormLabel>
                <FormControl>
                  <VintageInput
                    placeholder="e.g. John Doe"
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
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Location
                </FormLabel>
                <FormControl>
                  <VintageInput
                    placeholder="e.g. New York, USA"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Additional Person Filters */}
          <div className="space-y-3 md:col-span-2">
            <FormField
              control={form.control}
              name="hasEmail"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <VintageCheckbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="hasEmail"
                    />
                  </FormControl>
                  <FormLabel className="ml-2 text-sm text-[#3E2723]" htmlFor="hasEmail">
                    Must have email address
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hasPhone"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <VintageCheckbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="hasPhone"
                    />
                  </FormControl>
                  <FormLabel className="ml-2 text-sm text-[#3E2723]" htmlFor="hasPhone">
                    Must have phone number
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hasSocialProfiles"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <VintageCheckbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="hasSocialProfiles"
                    />
                  </FormControl>
                  <FormLabel className="ml-2 text-sm text-[#3E2723]" htmlFor="hasSocialProfiles">
                    Must have social media profiles
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      
      {/* Background paper texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0"></div>
    </div>
  );
}

export function ProfessionalDetailsSection({ form }: FormSectionProps) {
  return (
    <div className="paper-card bg-white p-6 rounded-md shadow-md relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-playfair text-xl mb-6 text-[#8B4513] border-b border-[#D2B48C] pb-2">
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
            className="mr-2 inline-block h-5 w-5"
          >
            <path d="M20 7h-4a2 2 0 0 0-2 2v1H2v11h16v-7h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            <path d="M2 15h16"></path>
            <path d="M6 7V2"></path>
            <path d="M10 7V2"></path>
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
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Occupation / Job Title
                </FormLabel>
                <FormControl>
                  <VintageInput
                    placeholder="e.g. Software Engineer"
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
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Company Name
                </FormLabel>
                <FormControl>
                  <VintageInput
                    placeholder="e.g. Acme Corporation"
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
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Company Size
                </FormLabel>
                <FormControl>
                  <VintageSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <option value="">Any size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1001+">1001+ employees</option>
                  </VintageSelect>
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Industry */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Industry
                </FormLabel>
                <FormControl>
                  <VintageInput
                    placeholder="e.g. Technology"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Additional Professional Filters */}
        <div className="mt-6 space-y-3">
          <FormField
            control={form.control}
            name="currentRole"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <VintageCheckbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="currentRole"
                  />
                </FormControl>
                <FormLabel className="ml-2 text-sm text-[#3E2723]" htmlFor="currentRole">
                  Current role only
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="publiclyTraded"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <VintageCheckbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="publiclyTraded"
                  />
                </FormControl>
                <FormLabel className="ml-2 text-sm text-[#3E2723]" htmlFor="publiclyTraded">
                  Only publicly traded companies
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
      
      {/* Background paper texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0"></div>
    </div>
  );
}

export function AdvancedFiltersSection({ form }: FormSectionProps) {
  return (
    <div className="paper-card bg-white p-6 rounded-md shadow-md relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-playfair text-xl mb-6 text-[#8B4513] border-b border-[#D2B48C] pb-2">
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
            className="mr-2 inline-block h-5 w-5"
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
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Minimum Years of Experience
                </FormLabel>
                <FormControl>
                  <VintageSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <option value="">Any experience</option>
                    <option value="1">1+ years</option>
                    <option value="3">3+ years</option>
                    <option value="5">5+ years</option>
                    <option value="10">10+ years</option>
                    <option value="15">15+ years</option>
                  </VintageSelect>
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Education Level */}
          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Education Level
                </FormLabel>
                <FormControl>
                  <VintageSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <option value="">Any education</option>
                    <option value="highSchool">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </VintageSelect>
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Skills */}
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="space-y-2 md:col-span-2">
                <FormLabel className="block text-sm font-medium text-[#3E2723]">
                  Skills (separate with commas)
                </FormLabel>
                <FormControl>
                  <VintageInput
                    placeholder="e.g. JavaScript, Marketing, Leadership"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Additional Advanced Filters */}
        <div className="mt-6 space-y-3">
          <FormField
            control={form.control}
            name="recentlyActive"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <VintageCheckbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="recentlyActive"
                  />
                </FormControl>
                <FormLabel className="ml-2 text-sm text-[#3E2723]" htmlFor="recentlyActive">
                  Active in last 3 months
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="verifiedProfiles"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <VintageCheckbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="verifiedProfiles"
                  />
                </FormControl>
                <FormLabel className="ml-2 text-sm text-[#3E2723]" htmlFor="verifiedProfiles">
                  Only verified profiles
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
      
      {/* Background paper texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-10 z-0"></div>
    </div>
  );
}
