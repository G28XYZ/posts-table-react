import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, setRequest, setTableState } from "../actions/table";

export const initialState = {
  request: true,
  fetchSuccess: true,
  posts: [],
  page: 1,
  searchText: "",
  maxCountOnPage: 10,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setRequest,
    setTableState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.posts = action.payload.data;
        state.fetchSuccess = true;
        state.request = false;
      } else {
        state.fetchSuccess = false;
        state.request = false;
      }
      localStorage.setItem("tableState", JSON.stringify(state));
    });
  },
});

export default tableSlice;
