import { FC, MouseEvent } from "react";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { namesTableHead } from "../../utils/constants";
import style from "./table-head.module.css";

const { generate } = require("shortid");

const TableHead: FC = () => {
  const dispatch = useAppDispatch();
  const { tableHead, sortParameter, sortOrdering } = useAppSelector((state) => state.table);
  const { setSortParameter } = tableSlice.actions;

  const handleChangeSortValue = (e: MouseEvent<HTMLButtonElement>) => {
    const parameter: string = (e.target as HTMLButtonElement).name;
    dispatch(setSortParameter({ parameter }));
  };

  return (
    <thead className={style.tableHead}>
      <tr>
        {tableHead.map((name: string) => (
          <th className={style.tableHeadColumn} key={generate()}>
            <button
              name={name}
              className={`${style.tableHeadButton} ${
                name === sortParameter &&
                (sortOrdering ? style.tableHeadButtonDown : style.tableHeadButtonUp)
              }`}
              onClick={handleChangeSortValue}
            >
              {namesTableHead[name]}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
