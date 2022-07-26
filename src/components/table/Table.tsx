import { FC, MouseEvent, ReactElement, useCallback, useMemo, useState } from "react";
import { useAppSelector } from "../../services/store";
import { emptyPostData, namesTableHead } from "../../utils/constants";
import { sortingByIdNumber } from "../../utils/sortingByIdNumber";
import { sortingByString } from "../../utils/sortingByString";
import { IFetchPostData, ISortParam } from "../../utils/types";
import Post from "../post-component/Post";
import style from "./table.module.css";

const { generate } = require("shortid");

const Table: FC<{ children: ReactElement }> = ({ children }) => {
  const { posts, page, maxCountOnPage, searchText, tableHead } = useAppSelector(
    (state) => state.table
  );
  const [sortParam, setSortParam] = useState<ISortParam>({
    id: false,
    title: false,
    body: false,
  });

  const postsSlice = posts.slice((page - 1) * maxCountOnPage, page * maxCountOnPage);

  const sorting = useCallback(
    (array: IFetchPostData[]) => {
      const key = Object.keys(sortParam).find((key) => sortParam[key]) as keyof IFetchPostData;
      if (array.length && key) {
        if (typeof array[0][key] === "number") {
          return sortingByIdNumber(array, key, sortParam);
        } else if (typeof array[0][key] === "string") {
          return sortingByString(array, key, sortParam);
        }
      }
      return array;
    },
    [sortParam]
  );

  const filteredPostsByText = useMemo(() => {
    const filtered: IFetchPostData[] = postsSlice.filter((post: IFetchPostData) => {
      return post.body.includes(searchText) || post.title.includes(searchText);
    });
    return sorting(filtered);
  }, [searchText, page, postsSlice, sortParam]);

  const checkedOnFillFilteredPosts: IFetchPostData[] | undefined[] = useMemo(() => {
    let result = filteredPostsByText;
    if (result.length < maxCountOnPage) {
      result = [...result, ...Array(maxCountOnPage - result.length)];
    } else {
      result = result.filter((post) => post.id > 0);
    }
    return result.slice();
  }, [filteredPostsByText, page, sortParam]);

  const handleChangeSort = (e: MouseEvent<HTMLButtonElement>) => {
    const name: string = (e.target as HTMLButtonElement).name;
    setSortParam({
      ...sortParam,
      ...Object.keys(sortParam).reduce((object: ISortParam, key: string) => {
        object[key] = name === key && !sortParam[key];
        return object;
      }, {}),
    });
  };

  return (
    <>
      <table className={`table`}>
        <thead className={style.tableHead}>
          <tr>
            {tableHead.map((name: string) => (
              <th className={style.tableHeadColumn} key={generate()}>
                <button
                  name={name}
                  className={`${style.tableHeadButton} ${
                    sortParam[name] && style.tableHeadButtonActive
                  }`}
                  onClick={handleChangeSort}
                >
                  {namesTableHead[name]}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {checkedOnFillFilteredPosts.map((post: IFetchPostData | undefined) =>
            post ? (
              <Post key={post.id} post={post} />
            ) : (
              <Post key={generate()} post={emptyPostData} />
            )
          )}
        </tbody>
      </table>
      {children}
    </>
  );
};

export default Table;
