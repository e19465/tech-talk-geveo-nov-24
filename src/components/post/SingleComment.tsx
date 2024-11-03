import { Comment } from "@prisma/client";

const SingleComment = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="bg-white shadow-md p-4 rounded-md text-sm w-full">
        {comment?.content}
      </div>
    </div>
  );
};

export default SingleComment;
