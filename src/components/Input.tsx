import React, { FC } from "react";

const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      className="border p-2 block rounded-lg border-black bg-secondary shadow focus:shadow-md focus:outline-none"
      {...props}
    />
  );
};

export default Input;
