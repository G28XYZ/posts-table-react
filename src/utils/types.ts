import { PayloadAction } from "@reduxjs/toolkit";

export interface ITableState {
  request: boolean;
  fetchSuccess: boolean;
  posts: [] | IFetchPostData[];
  page: number;
  searchText: string;
  maxCountOnPage: number;
}

export interface IFetchPostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
