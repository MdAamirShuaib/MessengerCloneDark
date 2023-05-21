"use client";

import clsx from "clsx";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-200 leading-6"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={id}
          placeholder={label}
          {...register(id, { required })}
          className={clsx(
            `
          form-input 
          block 
          w-full 
          rounded-md 
          border-gray-700 
          shadow-sm 
          ring-1 
          ring-inset 
          ring-slate-900 
          placeholder:text-slate-500 
          sm:text-sm 
          sm:leading-6 
          bg-gray-200
          focus:ring-2
          focus:ring-inset
          focus:ring-indigo-700`,
            errors[id] && "border-red-500",
            disabled && "bg-gray-700"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
