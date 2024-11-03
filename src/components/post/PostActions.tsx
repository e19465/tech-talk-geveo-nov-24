"use client";

import Image from "next/image";
import LIKED_IMAGE from "../../../public/liked.png";
import LIKE_IMAGE from "../../../public/like.png";
import { useState } from "react";

const PostActions = () => {
  const [imgSrc, setImageSrc] = useState(LIKE_IMAGE);
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    if (imgSrc === LIKE_IMAGE) {
      setLikes((prevLikes) => prevLikes + 1);
      setImageSrc(LIKED_IMAGE);
    } else {
      setLikes((prevLikes) => prevLikes - 1);
      setImageSrc(LIKE_IMAGE);
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
            <span>{likes}</span>
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
