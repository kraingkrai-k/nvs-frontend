"use client";

import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface UseAxios {
  client: AxiosInstance;
}

const useAxios = (): UseAxios => {
  const isServer = typeof window !== "undefined";
  const router = useRouter();
  const queryClient = useQueryClient();

  let token = queryClient.getQueryData(["login-mutate"]);

  if (isServer) {
    token = window.sessionStorage.getItem("token");
  }

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "",
    headers: {
      ...(!!token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  client?.interceptors?.response.use(
    async (resolve) => {
      const response = resolve?.data;
      if (response?.token) {
        const jwt = response.token;
        queryClient.setQueryData(["login-mutate"], jwt);

        if (isServer) {
          sessionStorage.setItem("token", jwt);
        }
      }

      return response;
    },
    (reject) => {
      if (reject?.response?.status === 401) {
        if (isServer) {
          sessionStorage.removeItem("token");
        }
        router.push("/login");
      }

      return Promise.reject(reject);
    }
  );

  client.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return { client };
};

export default useAxios;
