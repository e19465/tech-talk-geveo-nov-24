import { getAllPosts } from "@/actions/postActions";
import SinglePost from "../post/SinglePost";
import { PostWithLikesAndComments } from "@/lib/types";

const PostsContainer = async () => {
  const posts = await getAllPosts();

  if (!posts) {
    return (
      <div className="w-full h-auto flex flex-col items-center p-4 gap-10">
        No posts found
      </div>
    );
  }

  return (
    <div className="w-full h-auto flex flex-col items-center p-4 gap-10">
      {posts.map((post: PostWithLikesAndComments) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;
