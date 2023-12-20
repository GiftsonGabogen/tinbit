import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getUser } from "features/user/userSelectors";
import { useSelector } from "react-redux";
import useLocalStorage, { LocalStorageEnum } from "hooks/useLocalStorage";
import { useState } from "react";
import useAuthDetails from "hooks/useAuthDetails";

function RequireAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const user = useSelector(getUser);
  const { getItem } = useLocalStorage(LocalStorageEnum.REFRESH_TOKEN);
  const { setUserAuthDetails } = useAuthDetails();

  const refreshToken = getItem();

  const getNewAccTokenWithRefToken = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/refresh-token`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    if (res.ok) {
      // TODO: get the info then save to state
      const Data = await res.json();
      setUserAuthDetails(Data);
    }
    setIsLoading(false);
  };
  if (!user.email) {
    if (isLoading) {
      getNewAccTokenWithRefToken();
    }
    if (!isLoading) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } else {
    return <Outlet />;
  }

  // return <Navigate to="/login" state={{ from: location }} replace />;
  // return <Outlet />;
}

export default RequireAuth;
