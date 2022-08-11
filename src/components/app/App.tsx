import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchPosts } from "../../services/actions/table";
import style from "./app.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFoundPage from "../not-found-page/NotFoundPage";
import Main from "../main/Main";
import LoaderRouter from "../loader-router/LoaderRouter";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Modal from "../modal/Modal";
import tableSlice from "../../services/reducers/table";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const tableState = useAppSelector((state) => state.table);
  const { page, fetchSuccess } = tableState;
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    // так как главная страница это первая страница таблицы,
    // то при запросе по основному адресу перенаправить на первую страницу
    if (path === "/") navigate(`/page/${page}`);
  }, [navigate, page, path]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className={style.page}>
      <Routes>
        {/* LoaderRouter вызывает прелоадер если идет запрос данных */}
        <Route path="/" element={<LoaderRouter />}>
          {/* ProtectedRoute проверяет на корректную страницу если такой нет, то редиректит на первую страницу*/}
          <Route path="page/:number" element={<ProtectedRoute />}>
            <Route path="" element={<Main />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {fetchSuccess === false && <Modal />}
    </div>
  );
};

export default App;
