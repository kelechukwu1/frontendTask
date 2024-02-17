// @ts-nocheck
"use client";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const VerificationPage = () => {
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;
  const storedEmail = JSON.stringify(localStorage.getItem("userEmail"));

  //make api call to verify email endpoint to verify the email finally
  const verifyEmail = async (token: string) => {
    try {
      const response = await api.post(`/auth/verify-email?token=${token}`);
      setResponseMessage(response.message);
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  //opens the email app
  const handleContinueToEmail = () => {
    //this email should come from the local storage
    window.location.href = storedEmail;
  };

  //resend the verification email
  const handleResendEmail = async () => {
    try {
      const response = await api.post("/auth/resend-email", {
        //this email should come from local storage
        email: storedEmail,
      });
      setResponseMessage(response.message);
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

      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-medium">Verify your email</h1>
          <div className="">
            {token ? (
              //if token is available
              <button
                onClick={() => verifyEmail(token)}
                className="!mt-6 bg-blue-700 w-full rounded-md text-white py-3"
              >
                Verify Email
              </button>
            ) : (
              // Token is not available, rendering buttons
              <>
                <p className="text-md text-gray-500">
                  Please choose an option below to continue.
                </p>
                <button
                  onClick={handleContinueToEmail}
                  className="!mt-6 bg-blue-700 w-full rounded-md text-white py-3"
                >
                  Check your Email
                </button>
                <button
                  onClick={handleResendEmail}
                  className="mt-2 bg-red-500 w-full rounded-md text-white py-3"
                >
                  Resend Email
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </AuthPagesLayout>
  );
};
export default VerificationPage;
