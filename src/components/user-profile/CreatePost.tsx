"use client";

import { createPost } from "@/actions/postActions";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "react-toastify";

const CreatePost = () => {
  const router = useRouter();
  const [formState, formAction, isLoading] = useActionState(createPost, {
    success: false,
    error: null,
    post: {
      id: "",
      title: "",
      content: "",
      authorId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const handleAction = async (formdata: FormData) => {
    formAction({
      formData: formdata,
      userId: localStorage.getItem("user_id"),
    });
  };

  if (formState?.error) {
    toast.error(formState.error);
    console.error(formState.error);
  }

  if (formState?.success && formState.post) {
    toast.success("Post created successfully");
    router.refresh();
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 w-full">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-[70%]"
        action={handleAction}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create a New Post
        </h2>

        <div className="mb-4 w-full flex flex-col gap-4">
          <input
            type="text"
            name="create-post-title"
            id="create-post-title"
            placeholder="Your post title"
            className="w-full border p-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={5}
            placeholder="Write your post here..."
            name="create-post-content"
            id="create-post-content"
          />
        </div>

        <div className="flex items-center justify-end w-full">
          <button className="w-[300px] bg-blue-900 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
            {isLoading ? "Loading..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
