import { FC, useEffect, useMemo } from "react";
import { Link, Params, useParams } from "react-router-dom";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./pagination.module.css";

const Pagination: FC = () => {
  const dispatch = useAppDispatch();

  const { setPage } = tableSlice.actions;
  const params = useParams<Params>();

  const { page, maxCountOnPage, filteredPosts } = useAppSelector((state) => state.table);

  const maxPages = useMemo(
    () => Math.ceil(filteredPosts.length / maxCountOnPage),
    [filteredPosts.length, maxCountOnPage]
  );

  const pagesList = useMemo(
    () => Array.from({ length: Math.ceil(filteredPosts.length / maxCountOnPage) }, (_, i) => i + 1),
    [filteredPosts.length, maxCountOnPage]
  );

  useEffect(() => {
    dispatch(setPage({ page: parseInt(params.number as string) }));
  }, [dispatch, params.number, setPage]);

  return (
    <div className={style.pagination}>
      <Link className={style.button} to={`/page/${page - 1 ? page - 1 : page}`}>
        Назад
      </Link>
      <ul className={style.pageList}>
        {pagesList.map((_page, i) => (
          <li className={`page ${page === _page && style.pageActive}`} key={i}>
            {_page}
          </li>
        ))}
      </ul>
      <Link className={style.button} to={`/page/${page + 1 > maxPages ? page : page + 1}`}>
        Далее
      </Link>
    </div>
  );
};

export default Pagination;
