import { baseApi } from "@/shared/api/baseApi";
import type { Params, Post } from "../model/types";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], Params>({
      query: ({ limit = 20, start = 0 }) => ({
        url: "posts",
        params: {
          _start: start,
          _limit: limit,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
        if (!newItems.length) {
          currentCache[currentCache.length - 1].eol = true;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        console.log(currentArg, previousArg);
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getSinglePost: build.query<Post, { postId: number | string | undefined }>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery, useGetSinglePostQuery } = postsApi;
