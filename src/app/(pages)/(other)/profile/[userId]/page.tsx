import { isUserExists } from "@/actions/authActions";
import PageNotFound from "@/app/not-found";
import CreatePost from "@/components/user-profile/CreatePost";
import UserPosts from "@/components/user-profile/UserPosts";
import React from "react";

const UserProfilePage = async ({ params }: { params: any }) => {
  const userExists = await isUserExists(params.userId);
  if (!userExists) {
    return <PageNotFound />;
  }

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <CreatePost />
      <UserPosts userId={params.userId} />
    </div>
  );
};

export default UserProfilePage;
