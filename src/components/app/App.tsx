import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchPosts } from "../../services/actions/table";
import tableSlice from "../../services/reducers/table";
import style from "./app.module.css";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../not-found-page/NotFoundPage";
import Main from "../main/Main";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.table);
  const { setRequest } = tableSlice.actions;

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(setRequest({ request: true }));
  }, []);

  return (
    <div className={style.page}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
