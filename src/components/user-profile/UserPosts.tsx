import { getLoggedInUserPosts } from "@/actions/postActions";
import SinglePost from "../post/SinglePost";
import { PostWithLikesAndComments } from "@/lib/types";

const UserPosts = async ({ userId }: { userId?: any }) => {
  const userPosts = await getLoggedInUserPosts(userId);
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-4">
        <h1>No posts found</h1>
      </div>
    );
  }

  return (
    <div className="px-8 py-20 flex flex-col items-center justify-center gap-8">
      <h1 className="text-center text-2xl">My Posts</h1>
      {userPosts.map((post: PostWithLikesAndComments) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
