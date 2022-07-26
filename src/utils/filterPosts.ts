import { IFetchPostData } from "./types";

export const filterPosts = (post: IFetchPostData, searchText: string) =>
  post.body.toLowerCase().includes(searchText.toLowerCase()) ||
  post.title.toLowerCase().includes(searchText.toLowerCase()) ||
  String(post.id).includes(searchText);
