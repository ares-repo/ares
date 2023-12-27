"use client";
import { Spin } from "antd";
import { useVerifyToken } from "@/helpers/auth/verifyJwt";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useVerifyToken();

  return isLoading ? <Spin fullscreen /> : children;
};
