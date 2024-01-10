import { useState } from "react";
import ModalDelete from "./modal-delete";
import ModalManageTodo from "./modal-manage";

interface ICardTodo {
  card: TodosData;
  handlerDelete: ({ _id }: { _id: string }) => void;
  handlerUpdate: (payload: TodosData) => void;
}

const CardTodo = (props: ICardTodo) => {
  const { card, handlerDelete, handlerUpdate } = props;

  const [openDeleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setUpdateModal] = useState(false);

  const handlerCloseDeleteModal = () => setDeleteModal(false);
  const handlerOpenDeleteModal = () => setDeleteModal(true);

  const handlerOKDeleteModal = (id: string) => handlerDelete({ _id: id });

  const handlerCloseUpdateModal = () => setUpdateModal(false);
  const handlerOpenUpdateModal = () => setUpdateModal(true);

  const handlerOKUpdateModal = (payload: TodosData) => handlerUpdate(payload);

  console.log("def valuie", card);
  return (
    <>
      <ModalDelete
        isOpen={openDeleteModal}
        onClose={handlerCloseDeleteModal}
        onOK={handlerOKDeleteModal}
        card={card}
      />

      <ModalManageTodo
        isOpen={openUpdateModal}
        onClose={handlerCloseUpdateModal}
        onOK={handlerOKUpdateModal}
        defaultValue={card}
      />

      <div className="max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mt-4">
        <p className="flex justify-between">
          <button onClick={handlerOpenUpdateModal} className="cursor-pointer">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.title}
            </h5>
          </button>

          <button onClick={handlerOpenDeleteModal} className="cursor-pointer">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
            </svg>
          </button>
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {card.description}
        </p>
      </div>
    </>
  );
};

export default CardTodo;
