"use client";

import { User, login } from "@/helpers/auth/login";
import { useVerifyToken } from "@/helpers/auth/verifyJwt";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Login = () => {
  const router = useRouter();

  const { isLoading } = useVerifyToken();
  const handleLogin = async () => {
    await login("Rinor", "rkas").then((user) => {
      localStorage.setItem("token", user.tokens.accessToken);
    });
  };
  const user = useContext(User);

  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <div
      onClick={async () => {
        await handleLogin();
        router.push("/");
      }}
    >
      clickme
    </div>
  );
};

export default Login;
