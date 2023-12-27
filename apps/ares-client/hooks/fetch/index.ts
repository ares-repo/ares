"use client";
import React, { useState, useEffect } from "react";

interface FetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T>(url: string): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.ARES_ENDPOINT}${url}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")!}`,
          },
        });

        if (response.ok) {
          const res = await response.json();
          setData(res as T);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
