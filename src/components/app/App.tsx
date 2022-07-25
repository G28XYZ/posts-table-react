import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchPosts } from "../../services/actions/table";
import tableSlice from "../../services/reducers/table";
import style from "./app.module.css";
import SearchFilter from "../search-filter/SearchFilter";
import { Route, Routes } from "react-router-dom";
import Table from "../table/Table";

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
      <SearchFilter></SearchFilter>
      <Routes>
        <Route path="/" element={<Table />}></Route>
      </Routes>
    </div>
  );
};

export default App;
