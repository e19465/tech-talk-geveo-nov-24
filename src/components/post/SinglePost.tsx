import PostActions from "./PostActions";

type PostProps = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

const SinglePost = ({ post }: { post: PostProps }) => {
  return (
    <div className="w-[70%] bg-white flex flex-col gap-2 rounded-md shadow-md p-8">
      <h1 className="text-2xl text-blue-500">{post?.title}</h1>
      <div>{post?.content}</div>
      <PostActions />
    </div>
  );
};

export default SinglePost;
