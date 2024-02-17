// @ts-nocheck
import React, { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const SettingsAndPrivacy = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const router = useRouter();
  // Make API request to change password
  const handleChangePassword = async () => {
    try {
      const response = await api.post("/update-password", {
        newPassword,
      });
      setResponseMessage(response.message);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  // Make API request to update email
  const handleUpdateEmail = async () => {
    try {
      const response = await api.post("/update-email", {
        newEmail,
      });
      setResponseMessage(response.message);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  // Make API request to update username
  const handleUpdateUsername = async () => {
    try {
      const response = await api.post("/update-username", {
        newUsername,
      });
      setResponseMessage(response.message);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  // Make API request for logout
  const handleLogout = async () => {
    try {
      const response = await api.post("/logout");
      setResponseMessage(response.message);
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

      <div className="w-full py-10 md:py-0 h-[calc(100vh-120px)] flex flex-col items-center justify-center space-y-6">
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
            <button
              onClick={handleUpdateUsername}
              className="bg-blue-500 text-white py-3 rounded-md w-full"
            >
              Update Username
            </button>
          </div>

          {/* Logout */}
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-3 rounded-md w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsAndPrivacy;
