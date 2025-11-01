"use client";

// libs
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { useState } from "react";
// types
import type { FC, PropsWithChildren } from "react";

interface QueryProviderProps extends PropsWithChildren {
  dehydratedState?: ReturnType<typeof dehydrate>;
}

export const QueryProvider: FC<QueryProviderProps> = ({
  children,
  dehydratedState,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};
