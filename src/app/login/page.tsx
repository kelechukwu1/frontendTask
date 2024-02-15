"use client";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [isPhone, setIsPhone] = useState(false);
  return (
    <form action="" className="w-full">
      <div className="flex justify-center min-h-screen  items-center w-full">
        <div className="w-full md:w-1/3 space-y-5">
          <h1 className="text-2xl text-blue-700 flex justify-center">Login</h1>
          <button
            className="text-blue-700"
            onClick={() => setIsPhone(!isPhone)}
          >
            Login with {isPhone ? "email" : "phone"} instead
          </button>
          <div className={`${isPhone ? "hidden" : "block"}`}>
            <h3>
              Email <span className="font-semibold text-red-500">*</span>
            </h3>
            <input
              type="email"
              required
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="Your email address"
            />
          </div>

          <div className={`${isPhone ? "block" : "hidden"}`}>
            <h3>
              Phone <span className="font-semibold text-red-500">*</span>
            </h3>
            <input
              type="phone"
              required
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="Your mobile number"
            />
          </div>
          <div className="pb-2">
            <h3>
              Password <span className="font-semibold text-red-500">*</span>
            </h3>
            <input
              type="password"
              required
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="Minimum 8 chracters"
            />
          </div>
          <Link href={"/forgot-password"} className="text-blue-700">
            Forgot password?
          </Link>
          <button
            type="submit"
            className="text-white font-semibold bg-blue-600 w-full rounded-md p-3"
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
      </div>
    </form>
  );
};
export default LoginPage;
