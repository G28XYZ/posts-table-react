import { FC, useEffect } from "react";
import { Link, Params, useParams } from "react-router-dom";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./pagination.module.css";

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const { setPage } = tableSlice.actions;
  const params = useParams<Params>();
  const { number: numberOfPage } = Object.assign(params);
  const { page, maxCountOnPage, posts } = useAppSelector((state) => state.table);
  const maxPages = Math.ceil(posts.length / maxCountOnPage);
  const pagesList = Array.from(
    { length: Math.ceil(posts.length / maxCountOnPage) },
    (_, i) => i + 1
  );

  useEffect(() => {
    dispatch(setPage({ page: parseInt(numberOfPage) }));
  }, [numberOfPage]);

  return (
    <div className={style.pagination}>
      <Link to={`/page/${page - 1 ? page - 1 : page}`}>Назад</Link>
      <ul className={style.pageList}>
        {pagesList.map((_page, i) => (
          <li className={`page ${page === _page && style.pageActive}`} key={i}>
            {_page}
          </li>
        ))}
      </ul>
      <Link to={`/page/${page + 1 > maxPages ? page : page + 1}`}>Далее</Link>
    </div>
  );
};

export default Pagination;
