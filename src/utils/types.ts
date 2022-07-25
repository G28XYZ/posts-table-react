export interface ITableState {
  request: boolean;
  fetchSuccess: boolean;
  posts: [];
}

export interface IFetchPostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
