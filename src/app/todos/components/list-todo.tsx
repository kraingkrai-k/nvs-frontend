import { UseMutateFunction } from "@tanstack/react-query";
import AddTodo from "./add-todo";
import CardTodo from "./card-todo";

interface IListTodo {
  cards: TodosData[];
  updateTodos: UseMutateFunction<TodosData, unknown, TodosData, unknown>;
  deleteTodos: UseMutateFunction<any, unknown, Pick<TodosData, "_id">, unknown>;
  createTodos: UseMutateFunction<
    TodosData,
    unknown,
    Omit<TodosData, "_id">,
    unknown
  >;
}

const ListTodo = (props: IListTodo) => {
  const { cards, updateTodos, deleteTodos, createTodos } = props;

  const renderCard = (cards: TodosData[] = []) => {
    if (cards.length) {
      return cards.map((card) => (
        <CardTodo
          key={card._id}
          card={card}
          handlerDelete={deleteTodos}
          handlerUpdate={updateTodos}
        />
      ));
    }

    return <p>Empty Press `Create` for add new todo</p>;
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1">{renderCard(cards)}</div>
      <div className="flex-1">
        <AddTodo handlerCreate={createTodos} />
      </div>
    </div>
  );
};

export default ListTodo;
