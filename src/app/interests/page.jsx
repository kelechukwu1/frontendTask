"use client";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import React, { useState } from "react";
import api from "@/utils/api";

const InterestPage = () => {
  const interestsList = [
    "Football",
    "Basketball",
    "Hockey",
    "Cricket",
    "Cycling",
    "Swimming",
    "Golf",
    "Climbing",
    "Baseball",
    "Volleyball",
    "Soccer",
    "Tennis",
    "Gymnastics",
    "Dance",
    "Rugby",
    "Boxing",
    "Wrestling",
    "Cooking",
    "Gardening",
    "Painting",
    "Photography",
    "Reading",
    "Travel",
    "Yoga",
    "Meditation",
    "Music",
    "Photography",
    "Cooking",
    "Gardening",
    "Painting",
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [responseMessage, setResponseMessage] =
    (useState < string) | (null > null);

  // Toggle the selection of interests
  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = () => async () => {
    try {
      const response = await api.post("/auth/interests", {
        selectedInterests,
      });
      //redirect
      router.push("/verify-email");
      setResponseMessage(response.message);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  const itemsPerRow = [3, 4, 7];
  return (
    <AuthPagesLayout>
      {responseMessage && (
        <div className="flex justify-center text-red-500 text-sm mt-2">
          {responseMessage}
        </div>
      )}
      <div className="flex flex-col items-center h-[calc(100vh-120px)] space-y-6 justify-center md:px-40">
        <h2 className="flex justify-center text-2xl ">Select Your Interests</h2>
        <div className="flex flex-wrap">
          {interestsList.map((interest, index) => (
            <button
              key={interest}
              onClick={() => handleInterestClick(interest)}
              style={{
                backgroundColor: selectedInterests.includes(interest)
                  ? "lightgreen"
                  : "lightgray",
                padding: "8px",
                margin: "4px",
                borderRadius: "4px",
                flex: `1 0 calc(${100 / Math.max(...itemsPerRow)}% - 8px)`,
              }}
            >
              {interest}
            </button>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-10 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </AuthPagesLayout>
  );
};

export default InterestPage;
