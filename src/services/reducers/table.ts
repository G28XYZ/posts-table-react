import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../actions/table";

export const initialState = {
  request: false,
  fetchSuccess: true,
  fetchFailure: false,
  posts: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      console.log(action);
    });
  },
});

export default tableSlice;
