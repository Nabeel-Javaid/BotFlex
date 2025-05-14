import { z } from "zod";

// Search query schema
export const searchQuerySchema = z.object({
  // Company attributes
  companySize: z.string().optional().default("any"),
  industry: z.string().optional().default(""),
  companyKeywords: z.string().optional().default(""),

  // Location
  country: z.string().optional().default(""),
  region: z.string().optional().default(""), // State/Province/Region
  city: z.string().optional().default(""),

  // Job Title
  jobLevels: z.array(z.string()).optional().default([]),
  jobTitles: z.array(z.string()).optional().default([]),

  // Results limit
  resultsLimit: z.number().int().positive().min(1).max(1000).optional().default(100),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;

// Company size options
export const companySizeOptions = [
  { value: "any", label: "Any Size" },
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1,000 employees" },
  { value: "1001-5000", label: "1,001-5,000 employees" },
  { value: "5001-10000", label: "5,001-10,000 employees" },
  { value: "10001+", label: "10,001+ employees" }
];

// Industry options
export const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance & Banking" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "education", label: "Education" },
  { value: "media", label: "Media & Entertainment" },
  { value: "real_estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality & Travel" },
  { value: "construction", label: "Construction" },
  { value: "automotive", label: "Automotive" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "agriculture", label: "Agriculture" },
  { value: "telecom", label: "Telecommunications" },
  { value: "nonprofit", label: "Non-profit & NGO" },
  { value: "professional_services", label: "Professional Services" },
  { value: "other", label: "Other" }
];

// Job levels
export const jobLevelOptions = [
  { value: "c_level", label: "C-Level" },
  { value: "vp", label: "VP" },
  { value: "director", label: "Director" },
  { value: "manager", label: "Manager" },
  { value: "senior", label: "Senior" },
  { value: "junior", label: "Junior" },
  { value: "entry", label: "Entry Level" }
];

// Common job titles
export const jobTitleOptions = [
  { value: "ceo", label: "CEO" },
  { value: "cfo", label: "CFO" },
  { value: "cto", label: "CTO" },
  { value: "coo", label: "COO" },
  { value: "cmo", label: "CMO" },
  { value: "cio", label: "CIO" },
  { value: "vp_sales", label: "VP of Sales" },
  { value: "vp_marketing", label: "VP of Marketing" },
  { value: "vp_engineering", label: "VP of Engineering" },
  { value: "vp_product", label: "VP of Product" },
  { value: "vp_operations", label: "VP of Operations" },
  { value: "vp_finance", label: "VP of Finance" },
  { value: "vp_hr", label: "VP of HR" },
  { value: "director_marketing", label: "Marketing Director" },
  { value: "director_sales", label: "Sales Director" },
  { value: "director_operations", label: "Operations Director" },
  { value: "director_engineering", label: "Engineering Director" },
  { value: "director_product", label: "Product Director" },
  { value: "director_finance", label: "Finance Director" },
  { value: "director_hr", label: "HR Director" },
  { value: "product_manager", label: "Product Manager" },
  { value: "project_manager", label: "Project Manager" },
  { value: "marketing_manager", label: "Marketing Manager" },
  { value: "sales_manager", label: "Sales Manager" },
  { value: "account_manager", label: "Account Manager" },
  { value: "software_engineer", label: "Software Engineer" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "designer", label: "Designer" },
  { value: "content_writer", label: "Content Writer" },
  { value: "hr_specialist", label: "HR Specialist" },
  { value: "accountant", label: "Accountant" },
  { value: "analyst", label: "Analyst" }
];
