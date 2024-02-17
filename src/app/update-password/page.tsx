// @ts-nocheck
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordSchema } from "@/schema/validationSchema";
import { useRouter } from "next/navigation";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import api from "@/utils/api";
import { useSearchParams } from "next/navigation";

interface FormData {
  email: string;
}

const UpdatePasswordPage = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await api.post("/auth/update-password", {
        email,
        password: data.password,
      });
      setResponseMessage(response.message);
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  return (
    <AuthPagesLayout>
      {responseMessage && (
        <div className="flex justify-center text-red-500 text-sm mt-2">
          {responseMessage}
        </div>
      )}

      <form
        className="flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
      >
        <div className="w-full md:w-2/3 lg:w-1/3 space-y-5">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-abeg-neutral-10 md:text-2xl">
              Reset Password
            </h1>
            <p className="md:text-lg text-gray-500 px-5 lg:px-0">
              Enter a new password to sign in
            </p>
          </div>
          <div className="mt-2 space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your new password"
                className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center">
            <button
              type="submit"
              className="text-white font-semibold bg-blue-600 w-full rounded-md p-3"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </AuthPagesLayout>
  );
};

export default UpdatePasswordPage;
