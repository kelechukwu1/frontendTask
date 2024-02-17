"use client";
import { ProfilePageLayout } from "@/layouts/ProfilePageLayout";
import Image from "next/image";

const ProfilePage = () => {
  // dummy data for the profile
  const profileData = {
    name: "Ayoola Adewale",
    email: "ayoola@example.com",
    phoneNumber: "+234 802 345 6789",
    profilePicture: "/odumodu4.jpg",
    coverPicture: "/odumodu4.jpg",
    interests: ["Football", "Basketball", "Cricket"],
  };

  return (
    <ProfilePageLayout>
      <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center space-y-6">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden">
          <Image
            src={profileData.profilePicture}
            alt="Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Personal Details */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{profileData.name}</h1>
          <p className="text-gray-500">{profileData.email}</p>
          <p className="text-gray-500">{profileData.phoneNumber}</p>
        </div>

        {/* Interests */}
        <div className="text-center">
          <h2 className="text-lg font-semibold">Interests</h2>
          <ul className="flex space-x-2">
            {profileData.interests.map((interest, index) => (
              <li key={index} className="bg-gray-200 px-2 py-1 rounded-full">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfilePage;
