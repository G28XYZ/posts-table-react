import { FC } from "react";
import style from "./preloader.module.css";

const Preloader: FC = () => {
  return (
    <div className={style.preloader}>
      <div className={style.preloaderContainer}>
        <span className={style.preloaderRound}></span>
      </div>
    </div>
  );
};

export default Preloader;
