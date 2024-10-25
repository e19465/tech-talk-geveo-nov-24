import SinglePost from "../post/SinglePost";

const PostsContainer = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center p-4 gap-10">
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </div>
  );
};

export default PostsContainer;
