import type { SearchQuery } from '@shared/schema';
import { Country, State } from 'country-state-city';

// Webhook URLs
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1372140140348051467/sUKMcvwabCzx8DG_0E5EdZf_xPSTg5neIvfzmDXYFoyyDVmmrHVjoZ1RRDPsHt5fPV_G';
const CLAY_WEBHOOK_URL = 'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-9b7961bf-0334-478c-b9ee-8bb3b8062135';

// API proxy endpoints
const CLAY_API_PROXY = '/api/mcp-clay-proxy';

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

// Function to send data to Clay API via our MCP proxy endpoint
async function sendToClayApi(data: any): Promise<{ success: boolean; message: string; data?: string }> {
    const clayData = formatClayData(data);

    try {
        console.log('Sending data to Clay API via MCP proxy endpoint');

        const response = await fetch(CLAY_API_PROXY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clayData),
            // Increase timeout to give the proxy more time
            signal: AbortSignal.timeout(15000) // 15 second timeout
        });

        if (response.ok) {
            const responseText = await response.text();
            console.log('Clay API response:', responseText);
            return {
                success: true,
                message: "Successfully sent data to Clay API via MCP proxy",
                data: responseText
            };
        } else {
            const errorText = await response.text();
            console.error(`MCP proxy error: ${response.status} - ${errorText}`);
            return {
                success: false,
                message: `Error from Clay API: ${response.status} - ${errorText}`
            };
        }
    } catch (error) {
        console.error('Error sending to Clay API MCP proxy:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}

// Simulated Clay API call (fallback in case proxy fails)
async function simulateClayWebhook(data: any) {
    console.log('Simulating Clay API webhook call (not actually sending)');
    console.log('Data that would be sent:', formatClayData(data));

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success
    return { success: true, message: "Simulated Clay API call" };
}

// Search functionality - now using our MCP proxy endpoint
export async function searchPeople(query: SearchQuery) {
    try {
        // Send to Discord (this usually works from localhost)
        await sendToDiscordWebhook(query);

        // Try to send to Clay API via our MCP proxy endpoint
        console.log("Attempting to send data to Clay API via MCP proxy endpoint...");
        const clayResult = await sendToClayApi(query);

        if (!clayResult.success) {
            console.warn('Clay API MCP proxy failed, falling back to simulation', clayResult.message);
            // Fall back to simulation if proxy call fails
            await simulateClayWebhook(query);
        }

        // Return success response
        return {
            success: true,
            message: clayResult.success
                ? `Your search query has been sent to Clay API via MCP proxy.`
                : `Your search query has been processed, but we couldn't send it to Clay API. Please use the CURL command.`,
            clayApiSuccess: clayResult.success,
            results: []
        };
    } catch (error) {
        console.error('Search error:', error);
        return {
            success: false,
            message: "An error occurred while searching. Please try again later."
        };
    }
}

// Direct test function for Clay API with MCP proxy
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
        // Try to send directly to Clay API via MCP proxy
        console.log('Attempting to send test data to Clay API via MCP proxy endpoint...');

        const result = await sendToClayApi(testData);

        if (!result.success) {
            console.warn('MCP proxy failed for test, using simulation instead');
            // Return the error with instructions to use CURL instead
            return {
                success: false,
                message: `Could not send data to Clay API: ${result.message}. Please use the CURL command.`,
            };
        }

        return {
            success: true,
            message: "Successfully sent test data to Clay API via MCP proxy!",
            data: result.data
        };
    } catch (error) {
        console.error('Error testing Clay API:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while testing Clay API"
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