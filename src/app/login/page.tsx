// @ts-nocheck
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import validationSchema from "@/schema/validationSchema";
import { useRouter } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import api from "@/utils/api";

interface FormData {
  email: string;
  phone: string;
  password: string;
}
const LoginPage = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(validationSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      setResponseMessage(response.message);
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage(null);
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
          <h1 className="text-2xl text-blue-700 flex justify-center">Login</h1>
          <p className="text-gray-500 px-5 text-center">
            Welcome back! we are glad to have you back, please login to your
            account.
          </p>
          <button
            type="button"
            className="text-blue-700"
            onClick={() => setIsPhone(!isPhone)}
          >
            Login with {isPhone ? "email" : "phone"} instead
          </button>
          {!isPhone ? (
            <div>
              <h3>
                Email <span className="font-semibold text-red-500">*</span>
              </h3>
              <input
                {...register("email")}
                type="email"
                className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
                placeholder="Your email address"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3>
                Phone <span className="font-semibold text-red-500">*</span>
              </h3>
              <PhoneInput
                defaultCountry="NG"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="w-full pl-4 text-sm border rounded-lg border-[#E5E5E5] h-14 md:text-lg placeholder:text-base outline-none"
                error={
                  phoneNumber
                    ? isValidPhoneNumber(phoneNumber)
                      ? undefined
                      : "Invalid phone number"
                    : "Phone number required"
                }
              />
              {errors.phone && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </div>
              )}
            </div>
          )}

          <div className="pb-2">
            <h3>
              Password <span className="font-semibold text-red-500">*</span>
            </h3>
            <input
              {...register("password")}
              type="password"
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="Minimum 8 chracters"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </div>
            )}
          </div>
          <Link href={"/forgot-password"} className="text-blue-700">
            Forgot password?
          </Link>
          <button
            type="submit"
            className="text-white font-semibold bg-blue-600 w-full rounded-md p-3 outline-none"
          >
            Login
          </button>
          <p className="text-center text-sm">
            Don&apos;t have an account?&nbsp;
            <Link href="/register" className="font-medium text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthPagesLayout>
  );
};
export default LoginPage;
