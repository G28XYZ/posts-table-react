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

const App: FC = () => {
  const dispatch = useAppDispatch();
  const tableState = useAppSelector((state) => state.table);
  const { page } = tableState;
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
    if (path === "/") navigate(`/page/${page}`);
  }, [navigate, page, path]);

  useEffect(() => {
    const storage = getStorage();
    if (storage && storage.posts.length) {
      dispatch(setRequest({ request: false }));
      dispatch(setTableState({ tableState: storage }));
    } else {
      dispatch(setRequest({ request: true }));
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <div className={style.page}>
      <Routes>
        <Route path="/" element={<LoaderRouter />}>
          <Route path="page/:number" element={<ProtectedRoute />}>
            <Route path="" element={<Main />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
