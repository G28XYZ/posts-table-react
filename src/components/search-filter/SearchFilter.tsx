import { ChangeEvent, FC, FormEvent } from "react";
import style from "./search-filter.module.css";

const SearchFilter: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={style.search} onSubmit={handleSubmit}>
      <input
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
