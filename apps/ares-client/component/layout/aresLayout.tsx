"use client";
import { Spin } from "antd";
import { useVerifyToken } from "@/helpers/auth/verifyJwt";
import { Status } from "@/types/response/status";
import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useVerifyToken();

  return status === Status.fail ? <Spin fullscreen /> : children;
};
