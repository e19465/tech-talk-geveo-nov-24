"use client";

import Image from "next/image";
import LIKED_IMAGE from "../../../public/liked.png";
import LIKE_IMAGE from "../../../public/like.png";
import { startTransition, useOptimistic, useState } from "react";
import { PostWithLikesAndComments } from "@/lib/types";
import { toggleLike } from "@/actions/postActions";

const PostActions = ({ post }: { post: PostWithLikesAndComments }) => {
  const isLiked = post.likes.find((like) => like.authorId === post.authorId);
  const likeCount = post.likes.length;
  const [imgSrc, setImageSrc] = useState(isLiked ? LIKED_IMAGE : LIKE_IMAGE);

  // react state to keep track of likes
  const [likeAndLikeCount, setLikeAndLikeCount] = useState<any>({
    isLiked: isLiked,
    likeCount: likeCount,
  });

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

  const toggleLikeImage = () => {
    if (imgSrc === LIKE_IMAGE) {
      setImageSrc(LIKED_IMAGE);
    } else {
      setImageSrc(LIKE_IMAGE);
    }
  };

  const handleLikeClick = async () => {
    try {
      startTransition(() => {
        setOptimisticLikesState("");
      });
      const res = await toggleLike(post.id, post.authorId);
      if (res) {
        toggleLikeImage();
        if (res === "liked") {
          setLikeAndLikeCount((prev: any) => ({
            isLiked: true,
            likeCount: prev.likeCount + 1, // increment like count
          }));
        } else {
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
        <div className="w-full flex gap-2">
          <textarea
            name=""
            id=""
            placeholder="Type your comment here..."
            rows={2}
            className="flex-1 border border-blue-400 rounded-md p-2"
          />
          <button
            className="flex items-center justify-center p-2"
            title="post comment"
          >
            <Image src={"/share.png"} alt="Comment" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="bg-blue-100 flex flex-col gap-4 p-8 h-[150px] overflow-auto scrollbar-hide rounded-md">
        <div className="bg-white shadow-md p-4 rounded-md text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          exercitationem quaerat modi porro iure a aperiam facilis harum
          asperiores corrupti!
        </div>
      </div>
    </>
  );
};

export default PostActions;
