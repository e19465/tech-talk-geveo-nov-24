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

export const getAllPosts = async () => {
  try {
    // throw new Error("Not implemented");
    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        comments: true,
      },
    });
    return posts;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getLoggedInUserPosts = async (userId: string | null) => {
  if (!userId) {
    return null;
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        likes: true,
        comments: true,
      },
    });
    return posts;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const toggleLike = async (
  postId: string | null,
  userId: string | null
) => {
  if (!userId || !postId) {
    throw new Error("You need to be logged in to like a post");
  }

  try {
    // if like already found, then delete it
    const foundLike = await prisma.like.findFirst({
      where: {
        authorId: userId,
        postId: postId,
      },
    });

    if (foundLike) {
      await prisma.like.delete({
        where: {
          id: foundLike.id,
        },
      });
      return "unliked";
    } else {
      // else create a new like
      await prisma.like.create({
        data: {
          authorId: userId,
          postId: postId,
        },
      });
      return "liked";
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

export const addComment = async (
  postId: string | null,
  userId: string | null,
  comment: string
) => {
  if (!userId || !postId) {
    throw new Error("You need to be logged in to comment on a post");
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        authorId: userId,
        postId: postId,
      },
    });
    return newComment;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteComment = async (
  commentId: string | null,
  userId: string | null
) => {
  if (!userId || !commentId) {
    throw new Error("You need to be logged in to delete a comment");
  }

  try {
    // check if comment exists
    const foundComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
    if (!foundComment) {
      throw new Error("Comment not found");
    }

    // check if user is allowed to delete the comment
    const isAllowedToDelete = foundComment.authorId === userId;
    if (!isAllowedToDelete) {
      throw new Error("You are not allowed to delete this comment");
    }

    // delete the comment
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return true;
  } catch (err: any) {
    throw new Error(err);
  }
};
