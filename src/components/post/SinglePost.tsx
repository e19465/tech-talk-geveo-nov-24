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
      <div className="bg-blue-100 flex flex-col gap-4 p-8 h-[150px] overflow-auto scrollbar-hide rounded-md">
        <div className="bg-white shadow-md p-4 rounded-md text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          exercitationem quaerat modi porro iure a aperiam facilis harum
          asperiores corrupti!
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
