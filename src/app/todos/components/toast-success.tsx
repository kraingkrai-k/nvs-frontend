"use client";

import { Toast } from "flowbite-react";

const ToastSuccess = () => {
  return (
    <div className="absolute right-0">
      <div className="flex flex-col gap-4">
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">Successfully.</div>
          <Toast.Toggle />
        </Toast>
      </div>
    </div>
  );
};

export default ToastSuccess;
