"use client";
import { AuthPagesLayout } from "@/layouts/AuthPagesLayout";
import React, { useEffect, useState } from "react";
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
    "Recording",
    "Reading",
    "Travel",
    "Yoga",
    "Music",
    "Painting",
  ];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [responseMessage, setResponseMessage] = useState(null);

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
      await api.post("/auth/interests", {
        interests: selectedInterests,
      });
      //redirect
      router.push("/verify-email");
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

  const itemsPerRow = [12];
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
          {interestsList.map((interest) => (
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
