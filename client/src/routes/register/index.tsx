import { useState } from "react";
import type { FormEvent } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useLocalStorage, { LocalStorageEnum } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/user/userSlice";
import { getUser } from "features/user/userSelectors";
import BigGoogleButtonIcon from "routes/Common/BigGoogleButtonIcon";

function Register() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(getUser);
  // User Details
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [password, setPassword] = useState("");
  // tokens
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const { setItem: setAccessTokenItem } = useLocalStorage(
    LocalStorageEnum.ACCESS_TOKEN
  );
  const { setItem: setRefreshTokenItem } = useLocalStorage(
    LocalStorageEnum.REFRESH_TOKEN
  );
  const dispatch = useDispatch();
  // error message
  const [error, setError] = useState("");

  const onRegisterAuthSuccess = async (codeResponse: { code: string }) => {
    const tokens = await fetch("http://localhost:8000/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: codeResponse.code,
      }),
    });

    const res = await tokens.json();

    const {
      access_token,
      refresh_token,
      firstName,
      lastName,
      profilePicUrl,
      email,
    } = res;

    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setProfilePic(profilePicUrl);

    setAccessToken(access_token);
    setRefreshToken(refresh_token);

    setIsLoading(false);
    setLoggedIn(true);
  };

  const loggingIn = useGoogleLogin({
    flow: "auth-code",
    onSuccess: onRegisterAuthSuccess,
    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        profilePic,
        email,
        password,
      }),
    });
    if (res.ok) {
      const responseData = await res.json();
      if (responseData.statusMessage === "Failed") {
        setError(responseData.message);
      } else {
        dispatch(setUser({ firstName, lastName, profilePic, email }));
        setAccessTokenItem(accessToken);
        setRefreshTokenItem(refreshToken);
      }
    }
  };

  const googleLogin = () => {
    setIsLoading(true);
    loggingIn();
  };

  const displayLoading = () => {
    return <span>Loading...</span>;
  };

  const displayNotLoading = () => {
    return !loggedIn ? (
      <BigGoogleButtonIcon
        googleLogin={googleLogin}
        isLoading={isLoading}
        error={error}
        buttonText="register with google"
      />
    ) : (
      <>
        {error}
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">register</button>
        </form>
      </>
    );
  };

  return <>{isLoading ? displayLoading() : displayNotLoading()}</>;
}

export default Register;
