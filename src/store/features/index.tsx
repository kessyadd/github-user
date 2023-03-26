import { combineReducers } from "@reduxjs/toolkit";
import userSearchSlice from "./userSearchSlice";

const rootReducer = combineReducers({
  userSearchSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
