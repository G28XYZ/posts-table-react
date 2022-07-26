import { FC, MouseEvent, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { emptyPostData, namesTableHead } from "../../utils/constants";
import { sortingByIdNumber } from "../../utils/sortingByIdNumber";
import { sortingByString } from "../../utils/sortingByString";
import { IFetchPostData, ISortParam } from "../../utils/types";
import Post from "../post-component/Post";
import style from "./table.module.css";

const { generate } = require("shortid");

const Table: FC<{ children: ReactElement }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { setSortValue } = tableSlice.actions;
  const tableState = useAppSelector((state) => state.table);
  const { page, maxCountOnPage, searchText, tableHead, filteredPosts, sortValue } = tableState;

  const [sortParam, setSortParam] = useState<ISortParam>({
    id: sortValue === "id",
    title: sortValue === "title",
    body: sortValue === "body",
  });

  // сортировка по выбранному заголовку, если массив не пустой и выбран заголовок
  // то проверяется на условие по какому типу сортировать чтобы выполнить соответствующую сортировку
  // возвращает массив
  const sorting = useCallback(
    (array: IFetchPostData[]) => {
      const key = Object.keys(sortParam).find((key) => sortParam[key]) as keyof IFetchPostData;
      if (array.length && key) {
        if (typeof array[0][key] === "number") {
          return sortingByIdNumber(array, key, sortParam);
        } else if (typeof array[0][key] === "string") {
          return sortingByString(array, key, sortParam);
        }
      }
      return array;
    },
    [sortParam]
  );

  // возвращает массив, который предварительно проходит сортировку по выбранному заголовку
  const sortedPosts = useMemo(
    () => sorting([...filteredPosts]),
    [filteredPosts.length, sortParam, page]
  );

  // массив постов с проверкой на заполненность массива
  // добавляет пустые объекты в массив до максимального количества отображаемых постов на странице
  // чтобы отрисовать полную таблицы как на макете
  // или возвращает массив предварительно отфильтровав от пустых объектов если они есть
  const checkedOnFillFilteredPosts: IFetchPostData[] | undefined[] = useMemo(() => {
    let result = sortedPosts.slice((page - 1) * maxCountOnPage, page * maxCountOnPage);
    if (result.length < maxCountOnPage) {
      result = [...result, ...Array(maxCountOnPage - result.length)];
    } else {
      result = result.filter((post) => post.id > 0);
    }
    return result;
  }, [sortedPosts, page]);

  const handleChangeSortValue = (e: MouseEvent<HTMLButtonElement>) => {
    const name: string = (e.target as HTMLButtonElement).name;
    dispatch(setSortValue({ value: sortParam[name] ? "" : name }));
    setSortParam({
      ...sortParam,
      ...Object.keys(sortParam).reduce((object: ISortParam, key: string) => {
        // через reduce создается объект в котором содержатся имена заголовков как ключи объекта
        // их значения это bool, если выбранное имя совпадает и оно не true то установить true иначе false
        // остальные ключи будут false
        object[key] = name === key && !sortParam[key];
        return object;
      }, {}),
    });
  };

  useEffect(() => {
    localStorage.setItem("tableState", JSON.stringify(tableState));
  }, [page, sortValue, searchText]);

  return (
    <>
      <table className={`${style.table}`}>
        <thead className={style.tableHead}>
          <tr>
            {tableHead.map((name: string) => (
              <th className={style.tableHeadColumn} key={generate()}>
                <button
                  name={name}
                  className={`${style.tableHeadButton} ${
                    sortParam[name] && style.tableHeadButtonActive
                  }`}
                  onClick={handleChangeSortValue}
                >
                  {namesTableHead[name]}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {checkedOnFillFilteredPosts.map((post: IFetchPostData | undefined) =>
            post ? (
              <Post key={generate()} post={post} />
            ) : (
              <Post key={generate()} post={emptyPostData} />
            )
          )}
        </tbody>
      </table>
      {children} {/* Pagination */}
    </>
  );
};

export default Table;
