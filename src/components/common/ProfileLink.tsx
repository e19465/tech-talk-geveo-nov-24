"use client";
import { useEffect, useState } from "react";
import { ProgressLink } from "../nprogress/NProgressHandler";
import TailwindSpinner from "./TailwindSpinner";

const ProfileLink = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // Get user_id from localStorage, make sure to run this only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      setUserId(storedUserId);
    }
  }, []);

  if (!userId) {
    return <TailwindSpinner />;
  }

  return (
    <ProgressLink
      href={`/profile/${userId}`}
      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 bg-blue-100 border border-blue-900"
    >
      Profile
    </ProgressLink>
  );
};

export default ProfileLink;
