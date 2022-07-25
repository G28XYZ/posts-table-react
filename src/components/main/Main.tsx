import { FC } from "react";
import Pagination from "../pagination/Pagination";
import SearchFilter from "../search-filter/SearchFilter";
import Table from "../table/Table";
import style from "./main.module.css";

const Main: FC = () => {
  return (
    <main className={style.main}>
      <SearchFilter />
      <Table>
        <Pagination />
      </Table>
    </main>
  );
};

export default Main;
