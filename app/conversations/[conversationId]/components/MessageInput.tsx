"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  required: boolean;
  placeholder?: string;
  type?: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  errors,
  placeholder,
  required,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full text-white font-light px-4 py-2 bg-gray-700 rounded-full border-2 border-gray-500 focus:outline-none focus:border-blue-500"
        {...register(id, { required })}
      ></input>
    </div>
  );
};

export default MessageInput;
