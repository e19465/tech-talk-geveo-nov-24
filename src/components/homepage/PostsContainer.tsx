import { getAllPosts } from "@/actions/postActions";
import SinglePost from "../post/SinglePost";

type PostProps = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

const PostsContainer = async () => {
  const posts = await getAllPosts();

  if (!posts) {
    return (
      <div className="w-full h-auto flex flex-col items-center p-4 gap-10">
        No posts found
      </div>
    );
  }

  console.log("posts", posts);

  return (
    <div className="w-full h-auto flex flex-col items-center p-4 gap-10">
      {posts.map((post: PostProps) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;
