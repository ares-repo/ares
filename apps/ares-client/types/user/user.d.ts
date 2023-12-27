export type User = "client" | "admin";

export type UserContext = {
  user: any;
  updateUser: (user: any) => void;
};
