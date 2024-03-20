import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Params } from "@/entities/post";

interface PostListPageState {
  scrollTop: number;
  params: Params;
}

const initialItemCount = 20;

const initialState: PostListPageState = {
  scrollTop: 0,
  params: { limit: initialItemCount },
};

export const postListPageSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload;
    },
    setParams: (state, action: PayloadAction<Params>) => {
      state.params = action.payload;
    },
  },
});

export const selectScrollTop = (state: RootState) => state.posts.scrollTop;
export const selectParams = (state: RootState) => state.posts.params;

export const { setScrollTop, setParams } = postListPageSlice.actions;
