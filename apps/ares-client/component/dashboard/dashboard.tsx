"use client";

import { useFetch } from "@/hooks/fetch";
import { I_User } from "@/types/user/user.interface";

export const Dashboard = () => {
  const { data } = useFetch<I_User[]>("/api/users");
  return (
    <div>
      {data?.map((user) => (
        // eslint-disable-next-line react/jsx-key
        <div>{user.name}</div>
      ))}
    </div>
  );
};
