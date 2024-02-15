import Link from "next/link";

const RegisterPage = () => {
  return (
    <form action="">
      <div className="flex justify-center min-h-screen  items-center ">
        <div className="w-full md:w-1/3 space-y-5">
          <h1 className="text-2xl text-blue-500 flex justify-center">
            Register
          </h1>
          <div>
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
          <div>
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
          <div>
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
      </div>
    </form>
  );
};
export default RegisterPage;
