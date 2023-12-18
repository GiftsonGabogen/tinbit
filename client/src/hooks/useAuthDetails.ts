import { setUser } from "features/user/userSlice";
import useLocalStorage, { LocalStorageEnum } from "hooks/useLocalStorage";
import { useDispatch } from "react-redux";

export interface UserAuthDataType {
  access_token: string;
  refresh_token: string;
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  email: string;
}

export default () => {
  const dispatch = useDispatch();
  const { setItem: setAccessTokenItem } = useLocalStorage(
    LocalStorageEnum.ACCESS_TOKEN
  );
  const { setItem: setRefreshTokenItem } = useLocalStorage(
    LocalStorageEnum.REFRESH_TOKEN
  );
  const setUserAuthDetails = (Data: UserAuthDataType) => {
    const {
      access_token,
      refresh_token,
      firstName,
      lastName,
      profilePicUrl,
      email,
    } = Data;

    dispatch(
      setUser({ firstName, lastName, profilePic: profilePicUrl, email })
    );
    setAccessTokenItem(access_token);
    setRefreshTokenItem(refresh_token);
  };

  return { setUserAuthDetails };
};
