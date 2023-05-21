"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  danger?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  disabled,
  secondary,
  danger,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "px-4 py-2 font-semibold rounded-md",
        fullWidth && "w-full",
        secondary && "bg-gray-700 hover:bg-gray-800 text-slate-300",
        danger && "bg-red-500 hover:bg-red-600 text-white",
        !secondary && !danger && "bg-sky-500 hover:bg-sky-600 text-white",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
};

export default Buttons;
