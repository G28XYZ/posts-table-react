import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { filterPosts } from "../../utils/filterPosts";
import { IFetchPostData, ITableState } from "../../utils/types";
import {
  fetchPosts,
  setRequest,
  setPage,
  setSearchText,
  setFetchSuccess,
  setSortParameter,
  changePostsOrdering,
  setPageFromProtectedRoute,
} from "../actions/table";

export const initialState: ITableState = {
  request: true,
  fetchSuccess: true,
  posts: [],
  filteredPosts: [],
  page: 1,
  searchText: "",
  maxCountOnPage: 10,
  paginationCount: 0,
  tableHead: ["id", "title", "body"],
  sortParameter: "id",
  sortOrdering: false, // значение для порядка сортировки элементов: по убыванию - false по возрастанию - true
};

export const tableSlice = createSlice<ITableState, SliceCaseReducers<ITableState>>({
  name: "table",
  initialState,
  reducers: {
    setRequest,
    setPage,
    setSearchText,
    setFetchSuccess,
    setSortParameter,
    changePostsOrdering,
    setPageFromProtectedRoute,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.fetchSuccess = true;
        state.request = false;
        state.posts = action.payload.data;
        state.filteredPosts = state.posts.filter((post: IFetchPostData) =>
          filterPosts(post, state.searchText)
        );
        state.paginationCount = Math.ceil(state.filteredPosts.length / state.maxCountOnPage);

        const storage = localStorage.getItem("tableState");
        // если есть запись в сторадже, то слить со стейтом
        if (storage) {
          // так как в сторадже есть сохраненные записи то
          // на основе данных из стораджа нужно преобразовать полученные посты
          const decodeStorage = JSON.parse(storage);
          state.searchText = decodeStorage.searchText;
          state.filteredPosts = state.posts.filter((post: IFetchPostData) =>
            filterPosts(post, decodeStorage.searchText)
          );
          state.paginationCount = Math.ceil(state.filteredPosts.length / state.maxCountOnPage);
          state.sortOrdering = decodeStorage.sortOrdering;
          state.sortParameter = decodeStorage.sortParameter;
          state = { ...state, ...decodeStorage };
        }
      } else {
        state.posts = [];
        state.fetchSuccess = false;
        state.request = false;
      }
    });
  },
});

export default tableSlice;
