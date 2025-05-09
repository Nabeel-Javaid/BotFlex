import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchQuerySchema, type SearchQuery } from "@shared/schema";
import { z } from "zod";

// Configure Discord webhook URL from environment
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to serve Supabase credentials to the client
  app.get("/api/config", (req, res) => {
    // Only expose necessary environment variables to the client
    res.json({
      supabase: {
        url: process.env.SUPABASE_URL || "",
        key: process.env.SUPABASE_KEY || ""
      }
    });
  });

  // API route to send search data to Discord webhook
  app.post("/api/search", async (req, res) => {
    try {
      // Validate request body against schema
      const searchData = searchQuerySchema.parse(req.body);
      
      // Create embeds for Discord webhook
      const fields = Object.entries(searchData).map(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        
        return {
          name: formattedKey,
          value: value === true ? "Yes" : value === false ? "No" : value || "Not specified",
          inline: true,
        };
      });
      
      // Prepare webhook payload
      const webhookPayload = {
        content: "New search query from ArchiVintage:",
        embeds: [
          {
            title: "People Search Query",
            color: 8531219, // Brown color in decimal
            fields,
            footer: {
              text: "ArchiVintage People Search",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      };
      
      if (!DISCORD_WEBHOOK_URL) {
        return res.status(500).json({ 
          success: false, 
          message: "Discord webhook URL not configured" 
        });
      }
      
      // Send to Discord webhook
      const webhookResponse = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      });
      
      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text();
        throw new Error(`Discord webhook error: ${webhookResponse.status} - ${errorText}`);
      }
      
      return res.json({ 
        success: true, 
        message: "Search data sent successfully to Discord" 
      });
    } catch (error) {
      console.error("Search API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid search data", 
          errors: error.errors 
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "An unknown error occurred" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
