import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchPosts } from "./store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { AppContextProvider } from "./context/AppContext";
import axios from "axios";
import { Post } from "./types/Post";
import { postSlice } from "./store/reducers/PostSlice";
import PostsList from "./components/PostsList";
import ModalDetails from "./components/ModalDetails";
import Header from "./components/Header";

function App() {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.postReduser);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (fetching) {
      dispatch(postSlice.actions.userFetching());
      axios
        .get<Post[]>(
          `${process.env.REACT_APP_URL}/comments?_limit=20&_page=${currentPage}`
        )
        .then((responce) => {
          dispatch(
            postSlice.actions.userFetchingSuccess([...posts, ...responce.data])
          );
          setCurrentPage((prev) => prev + 1);
        })
        .catch((e) => {
          dispatch(postSlice.actions.userFetchingError(e.message));
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const scrollHandler = () => {
    const body = document.body;
    let documentElement = document.documentElement;
    documentElement = documentElement.clientHeight ? documentElement : body;
    const scrollTop = documentElement.scrollTop;
    const element = document.getElementById("root");

    if (
      element &&
      element.scrollHeight - (scrollTop + window.innerHeight) < 1
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <AppContextProvider>
      <Header />
      <PostsList />
      <ModalDetails />
    </AppContextProvider>
  );
}

export default App;
