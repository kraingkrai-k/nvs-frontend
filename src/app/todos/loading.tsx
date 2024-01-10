"use client";

import { Spinner } from "flowbite-react";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return <></>;
  }

  return (
    <div className="absolute mx-auto">
      <div className="text-center">
        <Spinner aria-label="aligned spinner" />
      </div>
    </div>
  );
};

export default Loading;
