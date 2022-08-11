import { FC, useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./pagination.module.css";

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setPage } = tableSlice.actions;

  const { page, paginationCount } = useAppSelector((state) => state.table);

  const handleNextPage = useCallback(
    () => dispatch(setPage({ page: page + 1 })),
    [dispatch, page, setPage]
  );

  const handlePrevPage = useCallback(
    () => dispatch(setPage({ page: page - 1 })),
    [dispatch, page, setPage]
  );

  const pagesList = useMemo(() => {
    let array = Array.from({ length: paginationCount }, (_, i) => i + 1);
    if (page + 3 > paginationCount) {
      return array.slice(paginationCount - 4, paginationCount);
    } else if (page > 3) {
      return array.slice(page - 2, page + 1);
    } else {
      return array.slice(0, 5);
    }
  }, [paginationCount, page]);

  const FirstPage = () => (
    <li>
      <Link className={`${style.page}`} to={`/page/1`}>
        {1}
      </Link>
      {` ... `}
    </li>
  );

  const LastPage = () => (
    <li>
      {` ... `}
      <Link className={`${style.page}`} to={`/page/${paginationCount}`}>
        {paginationCount}
      </Link>
    </li>
  );

  useEffect(() => {
    navigate(`/page/${page}`);
  }, [navigate, page]);

  return (
    <div className={style.pagination}>
      <button
        disabled={page === 1 || paginationCount === 0}
        className={`${style.button} ${
          (page === 1 || paginationCount === 0) && style.button_disabled
        }`}
        onClick={handlePrevPage}
      >
        Назад
      </button>

      <ul className={style.pageList}>
        {paginationCount !== 0 && page > 3 && <FirstPage />}
        {pagesList.map((_page, i) => (
          <li key={i}>
            <Link
              className={`${style.page} ${page === _page && style.pageActive}`}
              to={`/page/${_page}`}
            >
              {_page}
            </Link>
          </li>
        ))}
        {paginationCount !== 0 && page + 2 < paginationCount && <LastPage />}
      </ul>

      <button
        disabled={page === paginationCount || paginationCount === 0}
        className={`${style.button} ${
          (page === paginationCount || paginationCount === 0) && style.button_disabled
        }`}
        onClick={handleNextPage}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
