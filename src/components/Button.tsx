import React, { FC } from "react";

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`py-2 px-6 bg-primary text-white w-fit rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
