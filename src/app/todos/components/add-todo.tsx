import { Button } from "flowbite-react";
import ModalManageTodo from "./modal-manage";
import { useState } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

interface IAddTodo {
  handlerCreate: UseMutateFunction<
    TodosData,
    unknown,
    Omit<TodosData, "_id">,
    unknown
  >;
}

const AddTodo = (props: IAddTodo) => {
  const { handlerCreate } = props;
  const [openManageModal, setManageModal] = useState(false);

  const handlerCloseManageModal = () => setManageModal(false);
  const handlerOpenManageModal = () => setManageModal(true);

  const handlerOKManageModal = (payload: Omit<TodosData, "_id">) =>
    handlerCreate(payload);

  return (
    <>
      <ModalManageTodo
        isOpen={openManageModal}
        onClose={handlerCloseManageModal}
        onOK={handlerOKManageModal}
      />
      <div className="mx-auto py-6">
        <Button onClick={handlerOpenManageModal}>Create</Button>

        {/* <div className="absolute bottom-10">
          <Button onClick={handlerOpenManageModal}>Create</Button>
        </div> */}
      </div>
    </>
  );
};

export default AddTodo;
