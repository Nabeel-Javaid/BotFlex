import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Icons } from './icons';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Skeleton } from './ui/skeleton';
import { AlertCircle, CheckCircle2, RefreshCw, Trash2, ArrowUpDown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';

// Type for the results
interface ResultData {
    [key: string]: any;
    _entryId?: string;
    _receivedAt?: string;
    timestamp?: string;
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
    const [deleting, setDeleting] = useState(false);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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
                // Sort results by timestamp or _receivedAt (newest first by default)
                const sortedResults = [...data.results].sort((a, b) => {
                    const timeA = a._receivedAt || a.timestamp || '';
                    const timeB = b._receivedAt || b.timestamp || '';
                    return sortDirection === 'desc'
                        ? timeB.localeCompare(timeA)
                        : timeA.localeCompare(timeB);
                });

                setResults(sortedResults);
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

    // Toggle sort direction and resort results
    const toggleSortDirection = () => {
        const newDirection = sortDirection === 'desc' ? 'asc' : 'desc';
        setSortDirection(newDirection);

        // Re-sort the existing results
        setResults(prev => [...prev].sort((a, b) => {
            const timeA = a._receivedAt || a.timestamp || '';
            const timeB = b._receivedAt || b.timestamp || '';
            return newDirection === 'desc'
                ? timeB.localeCompare(timeA)
                : timeA.localeCompare(timeB);
        }));
    };

    // Function to delete all results
    const deleteAllResults = async () => {
        if (!confirm('Are you sure you want to delete all results? This cannot be undone.')) {
            return;
        }

        try {
            setDeleting(true);
            const response = await fetch('/api/clay-webhook', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setResults([]);
                setLastUpdated(null);
                toast({
                    title: "Results cleared",
                    description: "All results have been cleared successfully",
                    duration: 3000,
                });
            } else {
                throw new Error(data.message || 'Failed to clear results');
            }
        } catch (err) {
            toast({
                title: "Error clearing results",
                description: err instanceof Error ? err.message : 'An error occurred',
                variant: "destructive",
                duration: 3000,
            });
            console.error('Error clearing results:', err);
        } finally {
            setDeleting(false);
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
    }, [polling, sortDirection]);

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

    // Group results by entry ID if available
    const groupedResults = results.reduce((acc, result) => {
        const entryId = result._entryId || 'unknown';
        if (!acc[entryId]) {
            acc[entryId] = [];
        }
        acc[entryId].push(result);
        return acc;
    }, {} as Record<string, ResultData[]>);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Clay API Results</h2>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleSortDirection}
                        title={`Sort by time: ${sortDirection === 'desc' ? 'Newest first' : 'Oldest first'}`}
                    >
                        <ArrowUpDown className="h-4 w-4 mr-1" />
                        {sortDirection === 'desc' ? 'Newest' : 'Oldest'} first
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={togglePolling}
                        className={`${polling ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}`}
                    >
                        {polling ? 'Polling Active' : 'Polling Paused'}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={deleteAllResults}
                        disabled={deleting || results.length === 0}
                        title="Delete all results"
                    >
                        <Trash2 className={`h-4 w-4 ${deleting ? 'opacity-50' : ''}`} />
                    </Button>
                </div>
            </div>

            {lastUpdated && (
                <div className="text-sm text-gray-500">
                    Last updated: {formatDate(lastUpdated)}
                    {results.length > 0 && <span> • {results.length} total entries</span>}
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
                            <Card key={result._entryId || index} className="overflow-hidden">
                                <CardHeader className="bg-muted pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg">
                                            Entry #{results.length - index}
                                            {result.company && ` - ${result.company}`}
                                        </CardTitle>
                                        <Badge variant="outline">
                                            {formatDate(result._receivedAt || result.timestamp || null)}
                                        </Badge>
                                    </div>
                                    {result._entryId && (
                                        <CardDescription>
                                            ID: {result._entryId}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(result)
                                            .filter(([key]) => !key.startsWith('_')) // Hide internal fields
                                            .map(([key, value]) => (
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
                                    Complete data as received from Clay API ({results.length} entries)
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