import { FC, useCallback, useEffect } from "react";
import { Navigate, Outlet, Params, useParams } from "react-router-dom";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";

const ProtectedRoute: FC = () => {
  const dispatch = useAppDispatch();
  const { paginationCount } = useAppSelector((state) => state.table);
  const { setPageFromProtectedRoute, setPage } = tableSlice.actions;
  const params = useParams<Params>();
  const { number } = Object.assign(params);

  /*
   * проверка валидности параметра в запросе
   * @return true or false (boolean) возвращает true - если невалидны, иначе false
   */
  const isNotValidParams = useCallback(() => {
    return isNaN(number) || parseInt(number) <= 0 || (paginationCount || 1) < parseInt(number);
  }, [number, paginationCount]);

  useEffect(() => {
    // если параметры не валидны то сбросить сохраненную страницу на первую
    // иначе сохранить текущую
    if (isNotValidParams()) {
      dispatch(setPageFromProtectedRoute({ page: 1 }));
    } else {
      dispatch(setPage({ page: parseInt(number) }));
    }
  }, [isNotValidParams]);

  return isNotValidParams() ? <Navigate to={`/page/1`} /> : <Outlet />;
};

export default ProtectedRoute;
