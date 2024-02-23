import { Spinner } from "flowbite-react";
import React from "react";
import { useFormContext } from "react-hook-form";

function ButtonForm({ message }) {
  const {
    formState: { isLoading },
  } = useFormContext();

  return (
    <button
      className="mt-6 bg-[#0c3b2e] text-white rounded-lg py-2"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" />
          <span className="pl-3">Loading...</span>
        </>
      ) : (
        message
      )}
    </button>
  );
}

export default ButtonForm;
