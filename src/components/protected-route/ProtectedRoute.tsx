import { FC } from "react";
import { Navigate, Outlet, Params, useParams } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const params = useParams<Params>();
  const { number } = Object.assign(params);

  return isNaN(number) !== false ? <Navigate to="/page/1" /> : <Outlet />;
};

export default ProtectedRoute;
