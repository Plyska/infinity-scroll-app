import { AppDispatch } from "../store";
import axios from "axios";
import { Post } from "../../types/Post";
import { postSlice } from "./PostSlice";

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(postSlice.actions.userFetching());
    const responce = await axios.get<Post[]>(
      `${process.env.REACT_APP_URL}/comments?_limit=20&_page=1`
    );
    dispatch(postSlice.actions.userFetchingSuccess(responce.data));
  } catch (e: any) {
    dispatch(postSlice.actions.userFetchingError(e.message));
  }
};
