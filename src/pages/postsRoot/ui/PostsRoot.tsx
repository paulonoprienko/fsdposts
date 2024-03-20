import { Outlet } from "react-router-dom";
import { useGetPostsQuery } from "@/entities/post";
import { useAppSelector } from "@/shared/model/hooks";

export const PostsRoot = () => {
  const params = useAppSelector((state) => state.posts.params);
  const { data: postsData = [], isError } = useGetPostsQuery(params, {
    refetchOnReconnect: true,
  });
  return (
    <Outlet
      context={{
        postsData,
        isError,
      }}
    />
  );
};
