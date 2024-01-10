"use client";

import {
  useQuery,
  useMutation,
  UseMutateFunction,
} from "@tanstack/react-query";
import useAxios from "@todo-web/providers/useAxios";
import { AxiosResponse } from "axios";

interface UseHookTodos {
  dataGetTodos: TodosData[];
  updateTodos: UseMutateFunction<TodosData, unknown, TodosData, unknown>;
  deleteTodos: UseMutateFunction<any, unknown, Pick<TodosData, "_id">, unknown>;
  createTodos: UseMutateFunction<
    TodosData,
    unknown,
    Omit<TodosData, "_id">,
    unknown
  >;
  loading: boolean;
}

export const useHookTodos = (): UseHookTodos => {
  const { client: axiosInstance } = useAxios();

  const {
    error: errorCreateTodos,
    data: dataCreateTodos,
    mutate: createTodos,
  } = useMutation<TodosData, unknown, Omit<TodosData, "_id">>({
    mutationKey: ["create-todos"],
    mutationFn: (data) => axiosInstance.post(`/todos`, data),
    onSuccess: () => {
      // TODO - revalidate
      refetchGetTodos();
    },
  });

  const {
    error: errorGetTodos,
    data: dataGetTodos,
    refetch: refetchGetTodos,
    isFetching: fetchingGetTodos,
  } = useQuery<AxiosResponse["data"], unknown, TodosData[]>({
    queryKey: ["todos"],
    queryFn: () => axiosInstance.get("/todos"),
  });

  const {
    error: errorGetTodo,
    data: dataGetTodo,
    mutate: getTodo,
  } = useMutation<TodosData, unknown, Pick<TodosData, "_id">>({
    mutationKey: ["todos"],
    mutationFn: ({ _id }) => axiosInstance.get(`/todos/${_id}`),
  });

  const {
    error: errorUpdateTodos,
    mutate: updateTodos,
    isPending: pendingUpdateTodos,
  } = useMutation<TodosData, unknown, TodosData>({
    mutationKey: ["update-todos"],
    mutationFn: ({ _id, ...data }) => axiosInstance.put(`/todos/${_id}`, data),
    onSuccess: () => {
      // TODO - revalidate
      refetchGetTodos();
    },
  });

  const {
    error: errorDeleteTodos,
    mutate: deleteTodos,
    isPending: pendingDeleteTodos,
  } = useMutation<AxiosResponse["data"], unknown, Pick<TodosData, "_id">>({
    mutationKey: ["delete-todos"],
    mutationFn: ({ _id }) => axiosInstance.delete(`/todos/${_id}`),
    onSuccess: () => {
      // TODO - revalidate
      refetchGetTodos();
    },
  });

  const loading = pendingUpdateTodos || fetchingGetTodos || pendingDeleteTodos;

  return {
    dataGetTodos: dataGetTodos || [],
    updateTodos,
    deleteTodos,
    createTodos,
    loading,
  };
};
