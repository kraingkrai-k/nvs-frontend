"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { FormEvent } from "react";
import useAxios from "@todo-web/providers/useAxios";
import { useRouter } from "next/navigation";

export default function Login() {
  const { client: axiosInstance } = useAxios();
  const router = useRouter();

  const { mutate } = useMutation<
    AxiosResponse["data"],
    unknown,
    {
      username: string;
      password: string;
    }
  >({
    mutationKey: ["login"],
    mutationFn: (body) => axiosInstance.post("/users/auth", body),
    onSuccess: () => {
      router.push("/todos");
    },
    onError(error) {
      // TODO - handler error
    },
  });

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const inputUsername = formData.get("username") as string;
    const inputPassword = formData.get("password") as string;

    mutate({
      username: inputUsername,
      password: inputPassword,
    });
  };

  return (
    <div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handlerSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
