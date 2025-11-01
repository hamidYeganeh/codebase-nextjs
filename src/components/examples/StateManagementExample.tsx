"use client";

import { useUsers } from "@/api/hooks/useUsers";
import { useCounterStore } from "@/store/useCounterStore";
import { useUserStore } from "@/store/useUserStore";
import { FC } from "react";

export const StateManagementExample: FC = () => {
  // Zustand state
  const { count, increment, decrement } = useCounterStore();
  const { user, setUser, clearUser } = useUserStore();

  // React Query
  const { data: users, isLoading, error } = useUsers();

  // Example login function
  const handleLogin = () => {
    // setUser({
    //   id: "1",
    //   name: "John Doe",
    //   email: "john@example.com",
    // });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="border p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2">Zustand Counter Example</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            -
          </button>
          <span className="text-xl">{count}</span>
          <button
            onClick={increment}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="border p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2">Zustand User Store Example</h2>
        {/* {user ? (
          <div>
            <p>Logged in as: {user.}</p>
            <p>Email: {user.email}</p>
            <button
              onClick={clearUser}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Login as John
          </button>
        )} */}
      </div>

      <div className="border p-4 rounded-md">
        <h2 className="text-xl font-bold mb-2">React Query Example</h2>
        {isLoading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">Error loading users</p>
        ) : (
          <div>
            <p>Users will appear here when API is available</p>
            When API is available:
            <ul className="list-disc pl-5">
              {users?.users?.map((user) => (
                <li key={user.id}>
                  {user.firstName} ({user.email})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
