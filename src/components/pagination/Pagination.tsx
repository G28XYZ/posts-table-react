import { FC, MouseEvent } from "react";
import { useAppSelector } from "../../services/store";
import style from "./pagination.module.css";

const Pagination: FC = () => {
  const { page, maxCountOnPage, posts } = useAppSelector(
    (state) => state.table
  );
  const pagesList = Array.from(
    { length: Math.floor(posts.length / maxCountOnPage) },
    (_, i) => i + 1
  );

  const handleChangePage = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    console.log(target.name);
  };

  return (
    <div className={style.pagination}>
      <button name="back" className={style.button} onClick={handleChangePage}>
        Назад
      </button>
      <ul className={style.pageList}>
        {pagesList.map((_page, i) => (
          <li className={`page ${page === _page && style.pageActive}`} key={i}>
            {_page}
          </li>
        ))}
      </ul>
      <button name="next" className={style.button} onClick={handleChangePage}>
        Далее
      </button>
    </div>
  );
};

export default Pagination;
