import { Post } from "../../types/Post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  posts: Array<Post>;
  isLoading: boolean;
  error: string;
  page: number;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: "",
  page: 1,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    userFetching(state) {
      state.isLoading = true;
    },
    userFetchingSuccess(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;   
      state.isLoading = false;      
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
