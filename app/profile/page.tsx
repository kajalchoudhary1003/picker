"use client";
import { useEffect, useState } from "react";
import Header from "@/components/mainheader";
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!userData) return <p className="text-center">Loading...</p>;

  return (
    <div className="bg-gradient-to-r from-purple-800 via-purple-500 to-pink-400">
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen  p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Profile
          </h1>
          <div className="mb-4">
            <label className="block text-purple-900 font-semibold mb-1">
              Email:
            </label>
            <p className="text-lg text-gray-700">
              {(userData as { email: string }).email}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-purple-900 font-semibold mb-1">
              Role:
            </label>
            <p className="text-lg text-gray-700">
              {(userData as { role: string }).role}
            </p>
          </div>
          {/* Add more profile fields as needed */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => alert("Edit Profile coming soon!")}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
