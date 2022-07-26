import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchPosts } from "../../services/actions/table";
import tableSlice from "../../services/reducers/table";
import style from "./app.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFoundPage from "../not-found-page/NotFoundPage";
import Main from "../main/Main";
import LoaderRouter from "../loader-router/LoaderRouter";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Modal from "../modal/Modal";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const tableState = useAppSelector((state) => state.table);
  const { page, fetchSuccess } = tableState;
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { setRequest, setTableState } = tableSlice.actions;

  const getStorage = useCallback(() => {
    const storage = localStorage.getItem("tableState");
    if (storage) {
      return JSON.parse(storage);
    }
    return storage;
  }, []);

  useEffect(() => {
    // так как главная страница это первая страница таблицы, то при запросе по основному адресу перенаправить на первую страницу
    if (path === "/") navigate(`/page/${page}`);
  }, [navigate, page, path]);

  useEffect(() => {
    console.log("render app");
    dispatch(fetchPosts());
    const storage = getStorage();
    if (storage) {
      dispatch(setRequest({ request: false }));
      dispatch(setTableState({ tableState: { ...storage, fetchSuccess: true } }));
    } else {
      dispatch(setRequest({ request: true }));
    }
  }, []);

  return (
    <div className={style.page}>
      <Routes>
        <Route path="/" element={<LoaderRouter />}>
          {/* LoaderRouter вызывает прелоадер если идет запрос данных */}
          <Route path="page/:number" element={<ProtectedRoute />}>
            {/* ProtectedRoute проверяет на корректную страницу если такой нет, то редиректит на первую страницу*/}
            <Route path="" element={<Main />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!fetchSuccess && <Modal />}
    </div>
  );
};

export default App;
