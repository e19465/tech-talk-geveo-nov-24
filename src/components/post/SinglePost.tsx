import PostActions from "./PostActions";

const SinglePost = () => {
  return (
    <div className="w-[70%] bg-white flex flex-col gap-2 rounded-md shadow-md p-8">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id praesentium
        nesciunt magnam reiciendis iusto illo voluptatibus, dolorum impedit quia
        quas alias sequi magni, reprehenderit, voluptas dolores accusantium
        facilis totam. Blanditiis perspiciatis totam in alias consectetur
        voluptatem explicabo. Consectetur, harum fugit.
      </div>
      <PostActions />
    </div>
  );
};

export default SinglePost;
