import type { SearchQuery } from '@shared/schema';
import { Country, State } from 'country-state-city';

// Webhook URLs
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1372140140348051467/sUKMcvwabCzx8DG_0E5EdZf_xPSTg5neIvfzmDXYFoyyDVmmrHVjoZ1RRDPsHt5fPV_G';
const CLAY_WEBHOOK_URL = 'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-9b7961bf-0334-478c-b9ee-8bb3b8062135';

// List of CORS proxies to try (in order of preference)
// You may need to visit some of these sites to request temporary access
const CORS_PROXIES = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(CLAY_WEBHOOK_URL)}`,
    `https://thingproxy.freeboard.io/fetch/${CLAY_WEBHOOK_URL}`,
    `https://api.codetabs.com/v1/proxy?quest=${CLAY_WEBHOOK_URL}`,
    `https://crossorigin.me/${CLAY_WEBHOOK_URL}`
];

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

// Try to send data via multiple CORS proxies
// This function will try each proxy in order until one works or they all fail
async function tryProxies(data: any): Promise<{ success: boolean; message: string; data?: string }> {
    const clayData = formatClayData(data);
    const jsonBody = JSON.stringify(clayData);

    // Try each proxy in order
    for (const proxyUrl of CORS_PROXIES) {
        try {
            console.log(`Trying to send data via proxy: ${proxyUrl}`);

            const response = await fetch(proxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonBody,
                // Increase timeout to give the proxy more time
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            if (response.ok) {
                const responseText = await response.text();
                console.log('Clay API response:', responseText);
                return {
                    success: true,
                    message: "Successfully sent data to Clay API",
                    data: responseText
                };
            } else {
                console.warn(`Proxy ${proxyUrl} failed with status: ${response.status}`);
            }
        } catch (error) {
            console.warn(`Proxy ${proxyUrl} error:`, error);
            // Continue to next proxy
        }
    }

    // If we reach here, all proxies failed
    return {
        success: false,
        message: "All CORS proxies failed. Please use the CURL command instead."
    };
}

// Simulated Clay API call (fallback in case CORS proxy fails)
async function simulateClayWebhook(data: any) {
    console.log('Simulating Clay API webhook call (not actually sending due to CORS)');
    console.log('Data that would be sent:', formatClayData(data));

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success
    return { success: true, message: "Simulated Clay API call" };
}

// Search functionality - now with direct Clay API call attempt
export async function searchPeople(query: SearchQuery) {
    try {
        // Send to Discord (this usually works from localhost)
        await sendToDiscordWebhook(query);

        // Try to send to Clay API via CORS proxies
        console.log("Attempting to send data to Clay API via CORS proxies...");
        const clayResult = await tryProxies(query);

        if (!clayResult.success) {
            console.warn('All CORS proxies failed, falling back to simulation', clayResult.message);
            // Fall back to simulation if all proxy calls fail
            await simulateClayWebhook(query);
        }

        // Return success response
        return {
            success: true,
            message: clayResult.success
                ? `Your search query has been sent to Clay API directly.`
                : `Your search query has been processed, but we couldn't send it directly to Clay API. Please use the CURL command.`,
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

// Direct test function for Clay API with proxy
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
        // Try to send directly to Clay API via CORS proxies
        console.log('Attempting to send test data to Clay API via CORS proxies...');

        const result = await tryProxies(testData);

        if (!result.success) {
            console.warn('All CORS proxies failed for test, using simulation instead');
            // Return the error with instructions to use CURL instead
            return {
                success: false,
                message: `Could not send data directly to Clay API: ${result.message}. Please use the CURL command.`,
            };
        }

        return {
            success: true,
            message: "Successfully sent test data directly to Clay API!",
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