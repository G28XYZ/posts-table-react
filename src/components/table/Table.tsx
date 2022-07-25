import { FC } from "react";
import { useAppSelector } from "../../services/store";
import { IFetchPostData } from "../../utils/types";
import style from "./table.module.css";

const Table: FC = () => {
  const table = useAppSelector((state) => state.table);

  return (
    <table className={`table table-bordered`}>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Заголовок</th>
          <th scope="col">Описание</th>
        </tr>
      </thead>
      <tbody>
        {table.posts.map((post: IFetchPostData) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
