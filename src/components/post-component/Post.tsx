import { FC } from "react";
import { IFetchPostData } from "../../utils/types";
import style from "./post.module.css";

const Post: FC<{ post: IFetchPostData }> = ({ post }) => {
  return (
    <tr className={style.tableBodyRow}>
      <td className={style.tableBodyColumn}>{post.id || ""}</td>
      <td className={style.tableBodyColumn}>{post.title}</td>
      <td className={style.tableBodyColumn}>{post.body}</td>
    </tr>
  );
};

export default Post;
