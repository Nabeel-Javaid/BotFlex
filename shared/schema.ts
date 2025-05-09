import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Search query schema
export const searchQuerySchema = z.object({
  // Personal details
  personName: z.string().optional(),
  location: z.string().optional(),
  hasEmail: z.boolean().optional(),
  hasPhone: z.boolean().optional(),
  hasSocialProfiles: z.boolean().optional(),
  
  // Professional details
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  currentRole: z.boolean().optional(),
  publiclyTraded: z.boolean().optional(),
  
  // Advanced filters
  yearsOfExperience: z.string().optional(),
  educationLevel: z.string().optional(),
  skills: z.string().optional(),
  recentlyActive: z.boolean().optional(),
  verifiedProfiles: z.boolean().optional(),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;
