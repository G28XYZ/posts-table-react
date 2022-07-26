export interface ITableState {
  request: boolean;
  fetchSuccess: boolean;
  posts: [] | IFetchPostData[];
  filteredPosts: [] | IFetchPostData[];
  page: number;
  searchText: string;
  maxCountOnPage: number;
  tableHead: string[];
  sortValue: string;
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
