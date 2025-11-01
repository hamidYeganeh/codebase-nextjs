import { QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryProvider } from "@/providers/query.provider";
import { userKeys } from "@/api/hooks/useServerUsers";
import { ServerDemoClient } from "./server-demo-client";
import { User } from "@/store";

// Server component - no "use client" directive
export default async function ServerDemo() {
  // Initialize a new QueryClient for server-side
  const queryClient = new QueryClient();

  // Prefetch data on the server
  let error: string | null = null;

  try {
    // Prefetch and cache the data in the query client
    await queryClient.prefetchQuery({
      queryKey: userKeys.lists(),
      queryFn: fetchUsers,
    });
  } catch (err) {
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  // Dehydrate the query cache to pass to the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Server-Side API Demo with React Query
      </h1>

      {/* Wrap the client component with QueryProvider and pass the dehydrated state */}
      <QueryProvider dehydratedState={dehydratedState}>
        <ServerDemoClient />
      </QueryProvider>

      {/* Show error if prefetching failed */}
      {error && (
        <div className="mt-6 p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
          <p className="font-medium">Server-side prefetching error:</p>
          <p>{error}</p>
        </div>
      )}

      <div className="mt-6">
        <a
          href="/"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

// Server-side data fetching function
async function fetchUsers(): Promise<User[]> {
  // In a real app, you would use environment variables for the URL
  const response = await fetch("http://localhost:3000/api/users", {
    cache: "no-store", // Don't cache this request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
