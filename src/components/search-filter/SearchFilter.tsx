import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef } from "react";
import tableSlice from "../../services/reducers/table";
import { useAppDispatch, useAppSelector } from "../../services/store";
import style from "./search-filter.module.css";

const SearchFilter: FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchText } = useAppSelector((state) => state.table);
  const { setSearchText } = tableSlice.actions;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value as string;
    dispatch(setSearchText({ searchText: text }));
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <form className={style.search} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
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
