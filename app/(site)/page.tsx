import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="
      flex
      flex-col
      justify-center
      min-h-full
      py-10
      sm:px-6
      lg:px-8
      bg-gray-800
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-200">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
