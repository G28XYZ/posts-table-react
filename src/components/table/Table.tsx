import { FC } from "react";
import { useAppSelector } from "../../services/store";
import { IFetchPostData } from "../../utils/types";
import style from "./table.module.css";

const Table: FC = () => {
  const table = useAppSelector((state) => state.table);

  return (
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
        {table.posts
          .slice(table.page - 1, table.page * 10)
          .map((post: IFetchPostData) => (
            <tr key={post.id} className={style.tableBodyRow}>
              <td className={style.tableBodyColumn}>{post.id}</td>
              <td className={style.tableBodyColumn}>{post.title}</td>
              <td className={style.tableBodyColumn}>{post.body}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
