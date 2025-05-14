import { supabase } from './supabase';
import type { SearchQuery } from '@shared/schema';
import { Country, State } from 'country-state-city';

// Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1372140140348051467/sUKMcvwabCzx8DG_0E5EdZf_xPSTg5neIvfzmDXYFoyyDVmmrHVjoZ1RRDPsHt5fPV_G';

// User authentication
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

// Helper function to send data to Discord webhook
async function sendToDiscordWebhook(data: any) {
    try {
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

        // Filter only required fields for Discord
        const filteredData = {
            // Company Attributes
            companySize: data.companySize || 'Any',
            industry: data.industry || 'Not specified',
            companyKeywords: data.companyKeywords || 'Not specified',

            // Location
            country: countryName,
            region: stateName,
            city: data.city || 'Not specified',

            // Job Title
            jobLevels: data.jobLevels?.length > 0 ? JSON.stringify(data.jobLevels) : 'None selected',
            jobTitles: data.jobTitles?.length > 0 ? JSON.stringify(data.jobTitles) : 'None selected',

            // Results limit
            resultsLimit: data.resultsLimit || 100
        };

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
                    fields: Object.entries(filteredData).map(([key, value]) => ({
                        name: key,
                        value: String(value),
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

// Search functionality
export async function searchPeople(query: SearchQuery) {
    try {
        // Send data to Discord webhook
        await sendToDiscordWebhook(query);

        // This is a mock implementation since we don't have actual data
        // In a real app, you'd query your Supabase database here

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock search results based on provided criteria
        const hasSearchTerms =
            query.personName ||
            query.location ||
            query.jobTitle ||
            query.companyName ||
            query.industry ||
            query.skills;

        if (!hasSearchTerms) {
            return {
                success: false,
                message: "Please provide at least one search term."
            };
        }

        // Return mock success response
        return {
            success: true,
            message: `Found people matching your criteria. Here are your results.`,
            results: [
                // Mock data would be returned here
            ]
        };
    } catch (error) {
        console.error('Search error:', error);
        return {
            success: false,
            message: "An error occurred while searching. Please try again later."
        };
    }
} 