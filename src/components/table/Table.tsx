import { FC, memo, ReactElement, useEffect } from "react";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { emptyPostData } from "../../utils/constants";
import { IFetchPostData } from "../../utils/types";
import Post from "../post-component/Post";
import TableHead from "../table-head-component/TableHead";
import style from "./table.module.css";

const { generate } = require("shortid");

const Table: FC<{ children: ReactElement }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { changePostsOrdering } = tableSlice.actions;
  const tableState = useAppSelector((state) => state.table);
  const { page, maxCountOnPage, searchText, filteredPosts, sortParameter, sortOrdering } =
    tableState;

  useEffect(() => {
    dispatch(changePostsOrdering({}));
  }, [sortParameter, searchText, sortOrdering]);

  return (
    <>
      <table className={`${style.table}`}>
        <TableHead />
        <tbody>
          {filteredPosts
            .slice((page - 1) * maxCountOnPage, maxCountOnPage * page)
            .map((post: IFetchPostData | undefined) =>
              post ? (
                <Post key={generate()} post={post} />
              ) : (
                <Post key={generate()} post={emptyPostData} />
              )
            )}
        </tbody>
      </table>
      {children} {/* Pagination */}
    </>
  );
};

export default memo(Table);
