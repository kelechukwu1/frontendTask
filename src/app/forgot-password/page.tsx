// import { AuthLayout } from "@/layouts";
// import { type ForgotPasswordType, callApi, zodValidator } from "@/lib";
// import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";

const ForgotPasswordPage = () => {
  //   const router = useRouter();
  //   const { toast } = useToast();

  //   const onSubmit = async (data: ForgotPasswordType) => {
  //     const { data: responseData, error } = await callApi(
  //       "/auth/password/forgot",
  //       {
  //         email: data.email,
  //       }
  //     );

  //     if (error) {
  //       return toast({
  //         title: error.status.toString(),
  //         description: error.message,
  //         duration: 3000,
  //       });
  //     } else {
  //       toast({
  //         title: "Success",
  //         description: (responseData as { message: string }).message,
  //         duration: 3000,
  //       });
  //       reset();
  //       setTimeout(() => {
  //         void router.push("/signin");
  //       }, 2000);
  //     }
  //   };

  return (
    <form>
      <div className="flex justify-center min-h-screen  items-center ">
        <div className="w-full md:w-1/3 space-y-5">
          <div className="space-y-2 text-center">
            {" "}
            <h1 className="text-xl font-semibold text-abeg-neutral-10 md:text-2xl">
              Forgot Password?
            </h1>
            <p className="md:text-lg">
              Enter your registered email to receive your password reset
              instruction
            </p>
          </div>
          <div className="mt-2 space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center">
            <button
              type="submit"
              className="text-white font-semibold bg-blue-600 w-full rounded-md p-3"
            >
              Submit
            </button>
            <Link href="/login" className="text-sm text-blue-700">
              Back to sign in page
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordPage;
