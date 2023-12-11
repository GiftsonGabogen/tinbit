import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getUser } from "features/user/userSelectors";
import { useSelector } from "react-redux";

function RequireAuth() {
  const location = useLocation();
  const user = useSelector(getUser);
  return user?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
