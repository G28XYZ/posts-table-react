import { ChangeEvent, FC, FormEvent } from "react";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./search-filter.module.css";

const SearchFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.table);
  const { setSearchText } = tableSlice.actions;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    dispatch(setSearchText({ searchText: text }));
  };

  return (
    <form className={style.search} onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        className={style.searchInput}
        placeholder="Поиск"
        minLength={1}
        value={searchText}
        required
      />
      <button className={style.searchButton} type="submit"></button>
    </form>
  );
};

export default SearchFilter;
