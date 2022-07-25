export interface ITableState {
  request: boolean;
  fetchSuccess: boolean;
  posts: [];
  page: number;
}

export interface IFetchPostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
