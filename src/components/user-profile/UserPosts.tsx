import SinglePost from "../post/SinglePost";

const UserPosts = () => {
  return (
    <div className="px-8 py-20 flex flex-col items-center justify-center gap-8">
      <SinglePost />
      <SinglePost />
    </div>
  );
};

export default UserPosts;
