import { FC } from "react";
import style from "./modal.module.css";

const ModalOverlay: FC<{
  onCloseModal: () => void;
}> = ({ onCloseModal }) => {
  return <div onClick={onCloseModal} className={style.overlay}></div>;
};

export default ModalOverlay;
