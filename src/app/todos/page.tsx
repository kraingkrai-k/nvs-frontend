"use client";

import { useHookTodos } from "@todo-web/hooks/useTodos";
import ListTodo from "./components/list-todo";
import Loading from "./loading";

export default function Todos() {
  const {
    dataGetTodos,
    updateTodos,
    deleteTodos,
    createTodos,
    loading,
    // errors
  } = useHookTodos();

  return (
    <>
      {/* <ToastSuccess /> */}
      <Loading isLoading={loading} />
      <main className="flex flex-col items-center justify-between p-4 min-w-full">
        <div className="font-mono min-w-full">
          {/* TODO - errors */}
          {/* {false && (
            <Alert color="failure">
              <span className="font-medium">Something Wrong!</span>
            </Alert>
          )} */}
          <ListTodo
            cards={dataGetTodos}
            updateTodos={updateTodos}
            deleteTodos={deleteTodos}
            createTodos={createTodos}
          />
        </div>
      </main>
    </>
  );
}
