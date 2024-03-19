import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { PostsRoot } from "@/pages/postsRoot";
import { store } from "./store/appStore";

const router = createHashRouter([
  {
    element: <PostsRoot />,
    path: "/",
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
