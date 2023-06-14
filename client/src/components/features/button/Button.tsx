import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
