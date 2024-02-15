// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

const VerificationPage = () => {
  //   const router = useRouter();
  //   const [token, setToken] = useState("");

  //   useEffect(() => {
  //     const {token} = router
  //     setToken(token as string);
  //   }, [router]);

  const verifyEmailPage = async () => {
    window.alert("vrify email button clicked");
  };

  return (
    <div className="flex justify-center min-h-screen  items-center ">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-medium">Verify your email</h1>
        <div className="">
          <p className="">
            Please click on the button below to verify your email.
          </p>
          <button className="!mt-6 bg-blue-700 w-full rounded-md text-white py-3">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};
export default VerificationPage;
