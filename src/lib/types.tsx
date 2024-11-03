import { Comment, Like } from "@prisma/client";

export type PostWithLikesAndComments = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  comments: Comment[];
};
