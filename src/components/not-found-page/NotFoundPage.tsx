import { useNavigate } from "react-router-dom";
import { FC } from "react";
import style from "./not-found-page.module.css";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  function handleClickBack() {
    navigate("/");
  }

  return (
    <section className={style.error}>
      <h1 className={style.errorTitle}>404</h1>
      <p className={style.errorMessage}>Страница не найдена</p>
      <button className={style.errorButton} onClick={handleClickBack}>
        Назад
      </button>
    </section>
  );
};

export default NotFoundPage;
