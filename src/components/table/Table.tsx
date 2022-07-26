import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../services/store";
import { emptyPostData } from "../../utils/constants";
import { IFetchPostData } from "../../utils/types";
import Post from "../post-component/Post";
import style from "./table.module.css";

const { generate } = require("shortid");

const Table: FC<{ children: ReactElement }> = ({ children }) => {
  const [sort, setSort] = useState({ id: false, title: false, body: false });

  const { posts, page, maxCountOnPage, searchText } = useAppSelector((state) => state.table);

  const postsSlice = posts.slice((page - 1) * maxCountOnPage, page * maxCountOnPage);

  const filteredPostsByText: IFetchPostData[] = useMemo(() => {
    const filtered: IFetchPostData[] = postsSlice.filter((post: IFetchPostData) => {
      return post.body.includes(searchText) || post.title.includes(searchText);
    });
    return filtered;
  }, [sort, searchText, page]);

  const checkedOnFillFilteredPosts: any = useMemo(() => {
    let result = filteredPostsByText;
    if (result.length < maxCountOnPage) {
      result = [...result, ...Array(maxCountOnPage - result.length)];
    } else {
      result = result.filter((post) => post.id > 0);
    }
    return result.slice();
  }, [filteredPostsByText.length, page]);

  useEffect(() => {
    console.log(checkedOnFillFilteredPosts);
  }, [searchText]);

  return (
    <>
      <table className={`table`}>
        <thead className={style.tableHead}>
          <tr>
            <th className={style.tableHeadColumn}>
              ID
              <button className={style.tableHeadButton}></button>
            </th>
            <th className={style.tableHeadColumn}>
              Заголовок
              <button className={style.tableHeadButton}></button>
            </th>
            <th className={style.tableHeadColumn}>
              Описание
              <button className={style.tableHeadButton}></button>
            </th>
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
