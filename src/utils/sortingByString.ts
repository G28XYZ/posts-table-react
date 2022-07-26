import { IFetchPostData, ISortParam } from "./types";

export const sortingByString = (array: IFetchPostData[], str: string, sortParam: ISortParam) => {
  const key = str as keyof IFetchPostData;
  return array.sort((a, b) => {
    if (sortParam[key]) {
      if (a[key] < b[key]) {
        return 1;
      } else if (a[key] > b[key]) {
        return -1;
      }
    } else {
      if (a[key] < b[key]) {
        return -1;
      } else if (a[key] > b[key]) {
        return 1;
      }
    }
    return 0;
  });
};
