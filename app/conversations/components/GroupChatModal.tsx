"use client";

import Modal from "@/app/components/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Buttons from "@/app/components/Button";

interface GoupChatModalProps {
  users: User[];
  isOpen?: boolean;
  onClose: () => void;
}

const GroupChatModal: React.FC<GoupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-600/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-slate-300">
              Create a Group Chat
            </h2>
            <p className="mt-1 leading-6 text-slate-300 text-sm">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                disabled={isLoading}
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Buttons
            disabled={isLoading}
            secondary
            onClick={onClose}
            type="button"
          >
            Cancel
          </Buttons>
          <Buttons disabled={isLoading} type="submit">
            Create
          </Buttons>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
