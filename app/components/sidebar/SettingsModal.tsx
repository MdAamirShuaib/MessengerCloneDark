import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Buttons from "../Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 px-4">
            <h2 className="text-base leading-7 font-semibold text-slate-300">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Edit your public profile
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                register={register}
                errors={errors}
                disabled={isLoading}
                required
              />
              <div>
                <label className="block text-sm leading-6 text-slate-300 font-medium">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="55"
                    height="55"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    className="rounded-full"
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="n2dgyzpt"
                  >
                    <Buttons type="button" disabled={isLoading} secondary>
                      Change
                    </Buttons>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-4 justify-end">
            <Buttons
              type="button"
              disabled={isLoading}
              onClick={onClose}
              secondary
            >
              Cancel
            </Buttons>
            <Buttons type="submit" disabled={isLoading}>
              Save
            </Buttons>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
