import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export interface ITableState {
  request: boolean;
  fetchSuccess: boolean;
  posts: [] | IFetchPostData[];
  filteredPosts: [] | IFetchPostData[];
  page: number;
  searchText: string;
  maxCountOnPage: number;
  paginationCount: number;
  tableHead: string[];
  sortParameter: string;
  sortOrdering: boolean;
}

export interface ITableAction {
  tableState: ITableState;
  request: boolean;
  searchText: string;
  parameter: string;
  success: boolean;
  page: number;
}

export interface IFetchPostData {
  readonly userId: number;
  readonly id: number;
  readonly title: string;
  readonly body: string;
}

export interface ISortParam {
  [key: string]: boolean;
}

export type TCaseReducerTable = CaseReducer<ITableState, PayloadAction<ITableAction>>;
