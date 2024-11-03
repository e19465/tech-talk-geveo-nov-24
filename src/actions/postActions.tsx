"use server";
import { prisma } from "@/lib/client";

export const createPost = async (
  prevState: { success: boolean; error: string | null; post: any },
  body: { formData: FormData; userId: string | null }
) => {
  try {
    const postTitle = body.formData.get("create-post-title") as string;
    const postContent = body.formData.get("create-post-content") as string;
    const userId = body.userId;

    if (!userId) {
      return {
        success: false,
        error: "You need to be logged in to create a post",
        post: null,
      };
    }

    if (!postTitle || !postContent) {
      return { success: false, error: "Please fill all fields", post: null };
    }

    const post = await prisma.post.create({
      data: {
        title: postTitle,
        content: postContent,
        authorId: userId,
      },
    });
    return { success: true, error: null, post: post };
  } catch (err: any) {
    return {
      success: false,
      error: "Something went wrong. Please try again",
      post: null,
    };
  }
};
