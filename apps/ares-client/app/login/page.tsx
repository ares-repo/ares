"use client";

import { User, login } from "@/helpers/auth/login";
import { useVerifyToken } from "@/helpers/auth/verifyJwt";
import { Status } from "@/types/response/status";
import { Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Login = () => {
  const router = useRouter();

  const { status } = useVerifyToken();
  const pathname = usePathname();
  console.log("pathname", pathname);
  const handleLogin = async () => {
    await login("Rinor", "rkas").then((user) => {
      localStorage.setItem("token", user.tokens.accessToken);
    });
  };
  const user = useContext(User);

  console.log("status", status);
  return status === Status.success ? (
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
