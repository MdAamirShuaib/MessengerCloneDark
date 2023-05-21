"use client";

import useConversation from "@/app/hooks/useConversation";
import MessageInput from "./MessageInput";
import axios from "axios";
import { set } from "date-fns";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-gray-800 border-t border-gray-600 flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="n2dgyzpt"
      >
        <HiPhoto
          className=" text-sky-500 cursor-pointer hover:text-sky-400 transition"
          size={32}
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center lg:gap-4 gap-2 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />
        <button
          className="bg-sky-500 text-white p-2 rounded-full cursor-pointer hover:bg-sky-400 transition"
          type="submit"
        >
          <HiPaperAirplane size={24} />
        </button>
      </form>
    </div>
  );
};

export default Form;
