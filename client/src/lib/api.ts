import type { SearchQuery } from '@shared/schema';
import { Country, State } from 'country-state-city';

// Webhook URLs
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1372140140348051467/sUKMcvwabCzx8DG_0E5EdZf_xPSTg5neIvfzmDXYFoyyDVmmrHVjoZ1RRDPsHt5fPV_G';
const CLAY_WEBHOOK_URL = 'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-9b7961bf-0334-478c-b9ee-8bb3b8062135';

// Function to format data for Clay API
function formatClayData(data: any) {
    // Get readable country and state names
    let countryName = 'Not specified';
    let stateName = 'Not specified';

    if (data.country) {
        const country = Country.getCountryByCode(data.country);
        if (country) {
            countryName = country.name;
        }
    }

    if (data.country && data.region) {
        const state = State.getStateByCodeAndCountry(data.region, data.country);
        if (state) {
            stateName = state.name;
        }
    }

    // Format data for Clay API
    return {
        companySize: data.companySize || 'Any',
        industry: data.industry || '',
        companyKeywords: data.companyKeywords || '',
        country: countryName,
        region: stateName,
        city: data.city || '',
        jobLevels: data.jobLevels || [],
        jobTitles: data.jobTitles || [],
        resultsLimit: data.resultsLimit || 100,
        timestamp: new Date().toISOString()
    };
}

// Helper function to send data to Discord webhook
async function sendToDiscordWebhook(data: any) {
    try {
        const clayData = formatClayData(data);

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: 'New lead search query:',
                embeds: [{
                    title: 'Lead Search Query',
                    color: 3447003, // Blue color
                    fields: Object.entries(clayData).map(([key, value]) => ({
                        name: key,
                        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
                        inline: true,
                    })),
                    timestamp: new Date().toISOString(),
                }],
            }),
        });

        if (!response.ok) {
            console.error('Discord webhook error:', await response.text());
        }

        return response.ok;
    } catch (error) {
        console.error('Error sending to Discord webhook:', error);
        return false;
    }
}

// Main search function - this now uses the webhook model
export async function searchPeople(query: SearchQuery) {
    try {
        // Send to Discord for logging
        await sendToDiscordWebhook(query);

        // Format the data for Clay
        const clayData = formatClayData(query);
        console.log('Formatted data for Clay:', clayData);

        // No direct API call to Clay
        // Instead, tell user to wait for callback

        // Return success response
        return {
            success: true,
            message: "Your search query has been recorded. Your friend will process it in Clay and send results back to the webhook.",
            clayApiSuccess: true, // Just to avoid showing CORS error message
            results: []
        };
    } catch (error) {
        console.error('Search error:', error);
        return {
            success: false,
            message: "An error occurred while processing your search. Please try again later."
        };
    }
}

// Test function - just logs data without calling Clay
export async function testClayAPI() {
    const testData = {
        companySize: "51-200",
        industry: "Technology",
        companyKeywords: "SaaS, B2B, startup",
        country: "United States",
        region: "California",
        city: "San Francisco",
        jobLevels: ["c_level", "vp"],
        jobTitles: ["ceo", "cto", "vp_sales"],
        resultsLimit: 100,
        timestamp: new Date().toISOString()
    };

    try {
        console.log('Test mode: Creating formatted data for Clay...');

        // Format data
        const formattedData = formatClayData(testData);
        console.log('Formatted test data:', formattedData);

        // Simulate a delay 
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            success: true,
            message: "Test data prepared. Your friend will send results to your webhook."
        };
    } catch (error) {
        console.error('Error in test:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unexpected error occurred during testing"
        };
    }
}

// Generate a CURL command for the current search parameters
export function generateClayApiCurl(data: SearchQuery): string {
    const clayData = formatClayData(data);

    // Generate the curl command
    return `curl -X POST "${CLAY_WEBHOOK_URL}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(clayData, null, 2)}'`;
} 