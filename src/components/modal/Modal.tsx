import ReactDOM from "react-dom";
import { FC, useCallback, useEffect, useState } from "react";
import style from "./modal.module.css";
import { useAppDispatch } from "../../services/store";
import ModalOverlay from "./ModalOverlay";
import tableSlice from "../../services/reducers/table";

const MODAL = document.getElementById("react-modal") as HTMLElement;
type TCallbackModalCloseByEsc = (e: KeyboardEvent) => void;

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const { setFetchSuccess } = tableSlice.actions;

  const [modalClass, setModalClass] = useState<string>(style.modal);

  const onCloseModal = useCallback(() => {
    setModalClass(style.modal);
    dispatch(setFetchSuccess({ success: true }));
  }, []);

  const handleCloseModalByEsc = useCallback<TCallbackModalCloseByEsc>(
    (e) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    setModalClass(style.modalOpened);
    document.addEventListener("keydown", handleCloseModalByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseModalByEsc);
      setModalClass(style.modal);
    };
  }, [handleCloseModalByEsc, modalClass]);

  return ReactDOM.createPortal(
    <div className={modalClass}>
      <ModalOverlay onCloseModal={onCloseModal} />
      <div className={style.container}>
        <div className={style.header}>
          <button className={style.close} onClick={onCloseModal}></button>
        </div>
        Произошла ошибка в запросе данных, попробуйте перезагрузить страницу.
      </div>
    </div>,
    MODAL
  );
};

export default Modal;
