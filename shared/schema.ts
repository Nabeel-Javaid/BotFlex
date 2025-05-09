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
  personName: z.string().optional().default(""),
  location: z.string().optional().default(""),
  hasEmail: z.boolean().optional().default(false),
  hasPhone: z.boolean().optional().default(false),
  hasSocialProfiles: z.boolean().optional().default(false),
  
  // Professional details
  jobTitle: z.string().optional().default(""),
  companyName: z.string().optional().default(""),
  companySize: z.string().optional().default("any"),
  industry: z.string().optional().default(""),
  currentRole: z.boolean().optional().default(false),
  publiclyTraded: z.boolean().optional().default(false),
  
  // Advanced filters
  yearsOfExperience: z.string().optional().default("any"),
  educationLevel: z.string().optional().default("any"),
  skills: z.string().optional().default(""),
  recentlyActive: z.boolean().optional().default(false),
  verifiedProfiles: z.boolean().optional().default(false),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;
