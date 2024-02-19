import React, { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Button from "@/shared/Button/Button";

const SettingsAndPrivacy = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const router = useRouter();
  // Make API request to change password
  const handleChangePassword = async () => {
    try {
      await api.post("/settings/change-password", {
        password: newPassword,
      });
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  // Make API request to update email
  const handleUpdateEmail = async () => {
    try {
      await api.post("/settings/update-email", {
        email: newEmail,
      });
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  // Make API request to update username
  const handleUpdateUsername = async () => {
    try {
      await api.post("/settings/update-username", {
        username: newUsername,
      });
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  // Make API request for logout
  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout");
      //redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  return (
    <>
      {responseMessage && (
        <div className="flex justify-center text-red-500 text-sm mt-2">
          {responseMessage}
        </div>
      )}

      <div className="w-full py-10 md:py-0 h-[calc(100vh-120px)] flex flex-col items-center justify-center space-y-6 !mt-5 !mb-28 md:mb-0">
        <div className="space-y-8">
          <h1 className="text-3xl font-semibold flex justify-center">
            Settings & Privacy
          </h1>
          {/* Change Password */}
          <div className="md:flex items-center gap-5 space-y-5 md:space-y-0">
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
              placeholder="New Password"
            />
            <button
              onClick={handleChangePassword}
              className="bg-blue-500 text-white py-3 rounded-md w-full"
            >
              Change Password
            </button>
          </div>

          {/* Update Email */}
          <div className="md:flex items-center gap-5 space-y-5 md:space-y-0">
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
            />
            <button
              onClick={handleUpdateEmail}
              className="bg-blue-500 text-white py-3 rounded-md w-full"
            >
              Update Email
            </button>
          </div>

          {/* Update Username */}
          <div className="md:flex items-center gap-5 space-y-5 md:space-y-0">
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border border-gray-400 focus:ring-1 focus:border-blue-500 outline-none rounded-md p-3 w-full"
            />
            <Button
              onClick={handleUpdateUsername}
              extraClass="bg-blue-500 text-white py-3 rounded-md w-full"
              text="Update Username"
            />
          </div>

          {/* Logout */}
          <div>
            <Button
              onClick={handleLogout}
              extraClass="bg-red-500 text-white p-3 rounded-md w-full"
              text="Logout"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsAndPrivacy;
