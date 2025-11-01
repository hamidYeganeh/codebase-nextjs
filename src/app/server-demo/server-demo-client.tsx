"use client";

import { useUsers } from "@/api/hooks/useServerUsers";

export function ServerDemoClient() {
  const { data: users, isLoading, error } = useUsers();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Users (React Query Hydration)</h2>

      {error ? (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
          <p className="font-medium">Error loading users:</p>
          <p>
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
        </div>
      ) : isLoading ? (
        <div className="p-4 text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800">
          Loading users...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.firstName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        This data was fetched on the server using React Query, hydrated to the
        client, and is now interactive.
      </p>
    </div>
  );
}
