import { ChangeEvent, FC, FormEvent } from "react";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch } from "../../services/store";
import style from "./search-filter.module.css";

const SearchFilter: FC = () => {
  const dispatch = useAppDispatch();
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
        required
      />
      <button className={style.searchButton} type="submit"></button>
    </form>
  );
};

export default SearchFilter;
