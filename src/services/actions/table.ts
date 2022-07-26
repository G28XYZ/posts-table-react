import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { filterPosts } from "../../utils/filterPosts";
import { IFetchPostData, ITableState } from "../../utils/types";

export const fetchPosts = createAsyncThunk("table/fetchPosts", async () => {
  const response = await api
    .getPosts()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      return null;
    });

  if (response) {
    return { success: true, data: response };
  } else {
    return { success: false, data: [] };
  }
});

export const setPage = (state: ITableState, action: PayloadAction<{ page: number }>) => {
  state.page = action.payload.page;
};

export const setRequest = (state: ITableState, action: PayloadAction<{ request: boolean }>) => {
  state.request = action.payload.request;
};

export const setFetchSuccess = (
  state: ITableState,
  action: PayloadAction<{ success: boolean }>
) => {
  state.fetchSuccess = action.payload.success;
};

export const setTableState = (
  state: ITableState,
  action: PayloadAction<{ tableState: ITableState }>
) => {
  const tableState = action.payload.tableState;
  state = Object.assign(state, tableState);
};

export const setSortValue = (state: ITableState, action: PayloadAction<{ value: string }>) => {
  state.sortValue = action.payload.value;
};

export const setSearchText = (
  state: ITableState,
  action: PayloadAction<{ searchText: string }>
) => {
  state.searchText = action.payload.searchText;
  state.filteredPosts = state.posts.filter((post: IFetchPostData) =>
    filterPosts(post, state.searchText)
  );
};
