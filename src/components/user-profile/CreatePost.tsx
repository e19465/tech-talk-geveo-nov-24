const CreatePost = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 w-full">
      <form className="bg-white p-6 rounded-lg shadow-lg w-[70%]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create a New Post
        </h2>

        <div className="mb-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={5}
            placeholder="Write your post here..."
          />
        </div>

        <div className="flex items-center justify-end w-full">
          <button
            type="submit"
            className="w-[300px] bg-blue-900 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
