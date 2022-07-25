import { createSlice } from "@reduxjs/toolkit";
import { ITableState } from "../../utils/types";
import { fetchPosts, setRequest } from "../actions/table";

export const initialState = {
  request: false,
  fetchSuccess: true,
  posts: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setRequest,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload.success) {
        state.posts = action.payload.data;
        state.fetchSuccess = true;
        state.request = false;
      } else {
        state.fetchSuccess = false;
        state.request = false;
      }
    });
  },
});

export default tableSlice;
