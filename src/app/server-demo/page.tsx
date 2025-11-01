import { QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryProvider } from "@/providers/query.provider";
import { fetchUsers, userKeys } from "@/api/hooks/useServerUsers";
import { ServerDemoClient } from "./server-demo-client";
import { getTranslations } from "next-intl/server";

export default async function ServerDemo() {
  const t = await getTranslations();
  const queryClient = new QueryClient();

  let error: string | null = null;

  try {
    await queryClient.prefetchQuery({
      queryKey: userKeys.lists(),
      queryFn: fetchUsers,
    });
  } catch (err) {
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Server-Side API Demo with React Query
        {t("HomePage.title")}
      </h1>

      <QueryProvider dehydratedState={dehydratedState}>
        <ServerDemoClient />
      </QueryProvider>

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
