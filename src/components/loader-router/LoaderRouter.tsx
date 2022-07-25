import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import Preloader from "../preloader/Preloader";

const LoaderRouter: FC = () => {
  const { request } = useAppSelector((state) => state.table);
  return request === false ? <Navigate to="/" /> && <Outlet /> : <Preloader />;
};

export default LoaderRouter;
