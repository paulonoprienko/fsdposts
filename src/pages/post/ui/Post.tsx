import { LinkButtonToPostList } from "@/features/posts";
import { PostCard } from "@/entities/post";

export const Post = () => {
  return <PostCard actionSlot={<LinkButtonToPostList to={"/"} />} />;
};
