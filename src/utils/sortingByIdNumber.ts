import { IFetchPostData, ISortParam } from "./types";

export const sortingByIdNumber = (array: IFetchPostData[], id: string, sortParam: ISortParam) => {
  const key = id as keyof IFetchPostData;
  return array.sort((a, b) => {
    if (sortParam[key]) {
      return (b[key] as number) - (a[key] as number);
    } else {
      return (a[key] as number) - (b[key] as number);
    }
  });
};
