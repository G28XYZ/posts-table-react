import { IFetchPostData } from "./types";

export const filterPosts = (post: IFetchPostData, searchText: string) =>
  post.body.includes(searchText) || post.title.includes(searchText);
