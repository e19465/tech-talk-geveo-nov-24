import CreatePost from "@/components/user-profile/CreatePost";
import UserPosts from "@/components/user-profile/UserPosts";
import React from "react";

const UserProfilePage = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col">
      <CreatePost />
      <UserPosts />
    </div>
  );
};

export default UserProfilePage;
