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
  );
};

export default PostActions;
