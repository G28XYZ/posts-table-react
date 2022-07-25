export interface ITableState {
  request: boolean;
  fetchSuccess: boolean;
  posts: [] | IFetchPostData[];
  page: number;
  searchText: string;
}

export interface IFetchPostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ITableAction {
  tableState?: ITableState;
  request?: boolean;
}
