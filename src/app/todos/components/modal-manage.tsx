"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { FormEvent, useState } from "react";

interface IModalManageTodo {
  isOpen: boolean;
  onClose: () => void;
  onOK: (id: TodosData) => void;
  defaultValue?: TodosData;
}

const ModalManageTodo = (props: IModalManageTodo) => {
  const { isOpen, onClose, onOK, defaultValue } = props;

  const isEdit = !!defaultValue?._id;

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const inputTitle = formData.get("title") as string;
    const inputDescription = formData.get("description") as string;
    onClose();

    onOK({
      _id: defaultValue?._id || "",
      title: inputTitle,
      description: inputDescription,
    });
  };

  return (
    <>
      <Modal show={isOpen} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handlerSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {isEdit ? `Update ${defaultValue.title}` : "Create Todo"}
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  minLength={3}
                  maxLength={50}
                  defaultValue={defaultValue?.title}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <TextInput
                  placeholder="Description"
                  id="description"
                  name="description"
                  type="text"
                  required
                  minLength={3}
                  maxLength={50}
                  defaultValue={defaultValue?.description}
                />
              </div>
              <div className="flex w-full justify-evenly px-6">
                <Button color="failure" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="blue" type="submit">
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalManageTodo;
