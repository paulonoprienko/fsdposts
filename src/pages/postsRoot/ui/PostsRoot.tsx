import { Outlet } from "react-router-dom";
// import { useAppSelector } from "@/shared/model/hooks";

export const PostsRoot = () => {
  // const params = useAppSelector((state) => state);
  return <Outlet context={{}} />;
};
