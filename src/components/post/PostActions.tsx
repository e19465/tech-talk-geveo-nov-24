"use client";

import Image from "next/image";
import LIKED_IMAGE from "../../../public/liked.png";
import LIKE_IMAGE from "../../../public/like.png";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { PostWithLikesAndComments } from "@/lib/types";
import { addComment, toggleLike } from "@/actions/postActions";
import SingleComment from "./SingleComment";
import { Comment } from "@prisma/client";
import { toast } from "react-toastify";

const PostActions = ({ post }: { post: PostWithLikesAndComments }) => {
  const [userId, setUserId] = useState<string>("");
  const isLiked = post.likes.find((like) => like.authorId === userId);
  const likeCount = post.likes.length;
  const [imgSrc, setImageSrc] = useState(isLiked ? LIKED_IMAGE : LIKE_IMAGE);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user_id = localStorage.getItem("user_id");
      if (user_id) {
        setUserId(user_id);
      }
    }
  }, [post]);

  // react state to keep track of likes
  const [likeAndLikeCount, setLikeAndLikeCount] = useState<any>({
    isLiked: isLiked,
    likeCount: likeCount,
  });

  // react state to keep track of comments
  const [comments, setComments] = useState<Comment[]>(post.comments);

  // opsitimistic UI update for likes
  const [opstimisticLikesState, setOptimisticLikesState] = useOptimistic(
    likeAndLikeCount,
    (prev: any) => {
      return {
        ...prev,
        isLiked: !prev.isLiked,
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      };
    }
  );

  // opsitimistic UI update for comments
  const [opstimisticCommentsState, setOptimisticCommentsState] = useOptimistic(
    comments,
    (prev: any, new_comment: Comment) => {
      return [...prev, new_comment];
    }
  );

  const handleLikeClick = async () => {
    try {
      startTransition(() => {
        setOptimisticLikesState("");
      });
      const res = await toggleLike(post.id, post.authorId);
      if (res) {
        if (res === "liked") {
          setImageSrc(LIKED_IMAGE);
          setLikeAndLikeCount((prev: any) => ({
            isLiked: true,
            likeCount: prev.likeCount + 1, // increment like count
          }));
        } else {
          setImageSrc(LIKE_IMAGE);
          setLikeAndLikeCount((prev: any) => ({
            isLiked: false,
            likeCount: prev.likeCount - 1, // decrement like count
          }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dummyComment = {
      id: Math.floor(Math.random() * 10000).toString(),
      content: newComment,
      authorId: post.authorId,
      postId: post.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    startTransition(() => {
      setOptimisticCommentsState(dummyComment);
    });

    try {
      const res = await addComment(post.id, post.authorId, newComment);
      if (res) {
        setComments((prev) => [...prev, res]);
      }
      setNewComment("");
    } catch (err) {
      toast.error("Failed to post comment");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full mt-4 px-8 flex items-center justify-end gap-4">
          <div className="cursor-pointer">
            <Image
              src={imgSrc}
              alt="Like"
              width={24}
              height={24}
              onClick={handleLikeClick}
            />
          </div>
          <div className="">
            <span>{opstimisticLikesState.likeCount}</span>
          </div>
        </div>
        <form className="w-full flex gap-2" onSubmit={handlePostComment}>
          <textarea
            name="add-comment-input"
            id="add-comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
            rows={2}
            className="flex-1 border border-blue-400 rounded-md p-2"
          />
          <button
            className="flex items-center justify-center p-2"
            title="post comment"
            id="post-comment-btn"
            type="submit"
          >
            <Image src={"/share.png"} alt="Comment" width={24} height={24} />
          </button>
        </form>
      </div>
      <div className="bg-blue-100 flex flex-col gap-4 p-8 min-h-[150px] max-h-[250px] overflow-auto rounded-md">
        {opstimisticCommentsState?.map((comment) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default PostActions;
