import { createSlice } from "@reduxjs/toolkit";
import { filterPosts } from "../../utils/filterPosts";
import { IFetchPostData, ITableState } from "../../utils/types";
import {
  fetchPosts,
  setRequest,
  setTableState,
  setPage,
  setSearchText,
  setFetchSuccess,
} from "../actions/table";

export const initialState = {
  request: true,
  fetchSuccess: true,
  posts: [],
  filteredPosts: [],
  page: 1,
  searchText: "",
  maxCountOnPage: 10,
  tableHead: ["id", "title", "body"],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setRequest,
    setTableState,
    setPage,
    setSearchText,
    setFetchSuccess,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state: ITableState, action) => {
      if (action.payload.success) {
        state.posts = action.payload.data;
        state.filteredPosts = state.posts.filter((post: IFetchPostData) =>
          filterPosts(post, state.searchText)
        );
        state.fetchSuccess = true;
        state.request = false;
      } else {
        state.posts = [];
        state.fetchSuccess = false;
        state.request = false;
      }
      localStorage.setItem("tableState", JSON.stringify(state));
    });
  },
});

export default tableSlice;
