import SinglePost from "../post/SinglePost";

const UserPosts = () => {
  return (
    <div className="px-8 py-20 flex flex-col items-center justify-center gap-8">
      <h1 className="text-center text-2xl">My Posts</h1>
      <SinglePost />
      <SinglePost />
    </div>
  );
};

export default UserPosts;
