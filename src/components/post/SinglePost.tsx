import PostActions from "./PostActions";
import { PostWithLikesAndComments } from "@/lib/types";

const SinglePost = ({ post }: { post: PostWithLikesAndComments }) => {
  return (
    <div className="w-[70%] bg-white flex flex-col gap-2 rounded-md shadow-md p-8">
      <h1 className="text-2xl text-blue-500">{post?.title}</h1>
      <div>{post?.content}</div>
      <PostActions post={post} />
    </div>
  );
};

export default SinglePost;
