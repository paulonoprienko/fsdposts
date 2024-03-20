import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "@/shared/base.css";
import { Post } from "@/pages/post";
import { PostsList } from "@/pages/postsList";
import { PostsRoot } from "@/pages/postsRoot";
import { BaseLayout } from "./layouts/BaseLayout";
import { store } from "./store/appStore";

const router = createHashRouter([
  {
    element: <PostsRoot />,
    path: "/",
    children: [
      { index: true, element: <PostsList /> },
      {
        element: <BaseLayout />,
        children: [{ path: "/post/:postId", element: <Post /> }],
      },
    ],
  },
]);

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
