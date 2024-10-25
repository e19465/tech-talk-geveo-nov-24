import PostsContainer from "@/components/homepage/PostsContainer";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="my-4 text-center text-2xl">Welcome</h1>
      <PostsContainer />
    </div>
  );
};

export default Homepage;
