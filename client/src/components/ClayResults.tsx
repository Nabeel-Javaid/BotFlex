import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Icons } from './icons';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Skeleton } from './ui/skeleton';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

// Type for the results
interface ResultData {
    [key: string]: any;
}

interface WebhookResponse {
    success: boolean;
    results: ResultData[];
    lastUpdated: string | null;
}

export default function ClayResults() {
    const [results, setResults] = useState<ResultData[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [polling, setPolling] = useState(true);

    // Function to fetch results from the webhook endpoint
    const fetchResults = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/clay-webhook');

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data: WebhookResponse = await response.json();

            if (data.success && data.results) {
                setResults(data.results);
                setLastUpdated(data.lastUpdated);
                setError(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching results');
            console.error('Error fetching results:', err);
        } finally {
            setLoading(false);
        }
    };

    // Set up polling
    useEffect(() => {
        // Initial fetch
        fetchResults();

        // Set up polling interval
        const intervalId = setInterval(() => {
            if (polling) {
                fetchResults();
            }
        }, 5000); // Poll every 5 seconds

        // Clean up on unmount
        return () => clearInterval(intervalId);
    }, [polling]);

    // Function to toggle polling
    const togglePolling = () => {
        setPolling(!polling);
    };

    // Function to manually refresh
    const handleRefresh = () => {
        fetchResults();
    };

    // Function to format date
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Clay API Results</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={togglePolling}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${polling
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        {polling ? 'Polling Active' : 'Polling Paused'}
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="p-1 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {lastUpdated && (
                <div className="text-sm text-gray-500">
                    Last updated: {formatDate(lastUpdated)}
                </div>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading && results.length === 0 ? (
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            ) : results.length > 0 ? (
                <Tabs defaultValue="table" className="w-full">
                    <TabsList>
                        <TabsTrigger value="table">Table View</TabsTrigger>
                        <TabsTrigger value="json">JSON View</TabsTrigger>
                    </TabsList>

                    <TabsContent value="table" className="space-y-4">
                        {results.map((result, index) => (
                            <Card key={index} className="overflow-hidden">
                                <CardHeader className="bg-muted pb-2">
                                    <CardTitle className="text-lg">Result #{index + 1}</CardTitle>
                                    {result.timestamp && (
                                        <CardDescription>
                                            Received: {new Date(result.timestamp).toLocaleString()}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(result).map(([key, value]) => (
                                            <div key={key} className="space-y-1">
                                                <div className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                                <div className="text-sm">
                                                    {Array.isArray(value) ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {value.map((item, i) => (
                                                                <Badge key={i} variant="outline">{item}</Badge>
                                                            ))}
                                                            {value.length === 0 && <span className="text-muted-foreground">None</span>}
                                                        </div>
                                                    ) : typeof value === 'object' && value !== null ? (
                                                        <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                                                            {JSON.stringify(value, null, 2)}
                                                        </pre>
                                                    ) : (
                                                        String(value)
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="json">
                        <Card>
                            <CardHeader>
                                <CardTitle>Raw JSON Data</CardTitle>
                                <CardDescription>
                                    Complete data as received from Clay API
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                                    {JSON.stringify(results, null, 2)}
                                </pre>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            ) : (
                <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>No Data Yet</AlertTitle>
                    <AlertDescription>
                        Waiting for data from Clay API. When someone sends data to your webhook,
                        it will automatically appear here.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
} 