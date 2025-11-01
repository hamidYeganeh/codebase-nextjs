"use client";

import { useUsers } from "@/api/useUsers";

export const UsersList = () => {
  const { data } = useUsers();
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {data?.users?.map((user) => (
          <div key={user.id}>
            <p className="text-white">{user.firstName}</p>
          </div>
        ))}
      </div>
    </>
  );
};
