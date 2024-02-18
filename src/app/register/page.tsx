// @ts-nocheck
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { regiterSchema } from "@/schema/validationSchema";
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
const RegisterPage = () => {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(regiterSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      await api.post("/auth/create", {
        email: data.email,
        phoneNumber: phoneNumber,
        password: data.password,
      });
      //set email to local storage to verify email
      JSON.stringify(localStorage.setItem("userEmail", data.email));
      // Set registration success message to true
      setRegistrationSuccess(true);
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/interests");
      }, 1000);
    } catch (error: any) {
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

      {registrationSuccess && (
        <div className="flex justify-center text-green-500 text-sm mt-2">
          Registration successful! You will be redirected shortly.
        </div>
      )}
      <form
        action=""
        className="flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
      >
        <div className="w-full md:w-2/3 lg:w-1/3 space-y-5">
          <h1 className="text-2xl text-blue-500 flex justify-center">
            Register
          </h1>
          <p className="text-gray-500 px-5 md:px-10 lg:px-0 text-center">
            Create an account with us and enjoy all our mind-blowing services
            for free!
          </p>
          <div>
            <h3>
              Email <span className="font-semibold text-red-500">*</span>
            </h3>
            <input
              {...register("email")}
              type="email"
              required
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="Your email address"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </div>
            )}
          </div>
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
          <div>
            <h3>
              Password <span className="font-semibold text-red-500">*</span>
            </h3>
            <input
              {...register("password")}
              type="password"
              required
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="Minimum 8 chracters"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="text-white font-semibold bg-blue-600 w-full rounded-md p-3"
          >
            Register
          </button>
          <p className="text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login" className="font-medium text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthPagesLayout>
  );
};
export default RegisterPage;
