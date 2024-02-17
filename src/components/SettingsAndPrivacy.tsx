// @ts-nocheck
import React, { useState } from "react";
import api from "@/utils/api";

const SettingsAndPrivacy = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Make API request to change password
  const handleChangePassword = async () => {
    try {
      await api.post("/update-password", {
        newPassword,
      });
      console.log("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(error.message);
    }
  };

  // Make API request to update email
  const handleUpdateEmail = async () => {
    try {
      await api.post("/update-email", {
        newEmail,
      });
      console.log("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
      setErrorMessage(error.message);
    }
  };

  // Make API request to update username
  const handleUpdateUsername = async () => {
    try {
      await api.post("/update-username", {
        newUsername,
      });
      console.log("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      setErrorMessage(error.message);
    }
  };

  // Make API request for logout
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      console.log("Logged out successfully!", response.data);
    } catch (error) {
      console.error("Error logging out:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="flex justify-center text-red-500 text-sm mt-2">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col items-center h-[calc(100vh-120px)] space-y-6 justify-center">
        <div>
          <h1 className="text-3xl font-semibold">Settings & Privacy</h1>
          {/* Change Password */}
          <div className="flex items-center space-x-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-400 rounded-md p-2"
            />
            <button
              onClick={handleChangePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Change Password
            </button>
          </div>
        </div>

        <div>
          {/* Update Email */}
          <div className="flex items-center space-x-4">
            <input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-400 rounded-md p-2"
            />
            <button
              onClick={handleUpdateEmail}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update Email
            </button>
          </div>
        </div>

        <div>
          {/* Update Username */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border border-gray-400 rounded-md p-2"
            />
            <button
              onClick={handleUpdateUsername}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update Username
            </button>
          </div>
        </div>

        <div>
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsAndPrivacy;
