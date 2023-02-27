import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReduser from "./reducers/PostSlice";

const rootReducers = combineReducers({
  postReduser,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
  });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
