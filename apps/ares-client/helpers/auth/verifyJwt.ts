"use clent";
import { Status } from "@/types/response/status";
import { jwtVerify } from "jose";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useVerifyToken = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>(Status.fail);
  const secretToken = process.env.ACCESS_SECRET_TOKEN || "default_secret";
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await jwtVerify(token, new TextEncoder().encode(secretToken));
          if (pathname.includes("/login")) router.push("/");
          setStatus(Status.success);
        } catch (error) {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { status };
};
