import { FC } from "react";
import { Navigate, Outlet, Params, useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";

const ProtectedRoute: FC = () => {
  const { maxCountOnPage, posts } = useAppSelector((state) => state.table);
  const maxCount = Math.ceil(posts.length / maxCountOnPage);
  const params = useParams<Params>();
  const { number } = Object.assign(params);

  const checkParams = () => {
    return isNaN(number) !== false || maxCount < parseInt(number) || parseInt(number) <= 0;
  };

  return checkParams() ? <Navigate to={`/page/1`} /> : <Outlet />;
};

export default ProtectedRoute;
