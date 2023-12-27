import { UserContext } from "@/types/user/user";
import { createContext, useContext } from "react";

export const User = createContext<UserContext>({
  user: undefined,
  updateUser: () => {},
});

export const login = async (name: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.ARES_ENDPOINT}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to log in");
    }
  } catch (error) {
    throw error;
  }
};

// export const userStore = useContext(User);
