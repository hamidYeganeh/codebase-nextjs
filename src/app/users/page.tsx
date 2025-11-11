import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getUsers, userKeys } from '@/api/useUsers';
import { QueryProvider } from '@/providers/query.provider';
import { UsersList } from './UsersList';

export default async function UsersRootPage() {
  const queryClient = new QueryClient();

  let error: string | null = null;

  try {
    await queryClient.prefetchQuery({
      queryKey: userKeys.lists(),
      queryFn: getUsers,
    });
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <h1>Users Page</h1>

      {error && (
        <p role="alert" aria-live="polite" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <QueryProvider dehydratedState={dehydratedState}>
        <UsersList />
      </QueryProvider>
    </>
  );
}
