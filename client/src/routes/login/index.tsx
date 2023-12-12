import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage, { LocalStorageEnum } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { setUser } from "features/user/userSlice";
import BigGoogleButtonIcon from "routes/Common/BigGoogleButtonIcon";
import type { CodeResponse, NonOAuthError } from "@react-oauth/google";

function Login() {
  // error message
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // tokens
  const { setItem: setAccessTokenItem } = useLocalStorage(
    LocalStorageEnum.ACCESS_TOKEN
  );
  const { setItem: setRefreshTokenItem } = useLocalStorage(
    LocalStorageEnum.REFRESH_TOKEN
  );
  const dispatch = useDispatch();

  const from = location?.state?.from?.pathname || "/";

  // FIXME: refactor this, duplicate code with register page
  const onLoginSuccess = async (codeResponse: { code: string }) => {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: codeResponse.code,
      }),
    });
    console.log(res);

    if (res.ok) {
      const resData = await res.json();
      const {
        access_token,
        refresh_token,
        firstName,
        lastName,
        profilePicUrl,
        email,
      } = resData;

      dispatch(
        setUser({ firstName, lastName, profilePic: profilePicUrl, email })
      );
      setAccessTokenItem(access_token);
      setRefreshTokenItem(refresh_token);
      navigate(from);
    } else {
      setError("Email is not registered");
    }

    setIsLoading(false);
  };
  const onLoginError = async (
    errorResponse: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    const { error, error_description } = errorResponse;
    console.log(error);
    setError(error_description || "");
    setIsLoading(false);
  };
  const onNonAuth = async (nonOAuthErr: NonOAuthError) => {
    const errorText = nonOAuthErr.type.replace("_", " ");
    setError(errorText);
    setIsLoading(false);
  };

  const loggingIn = useGoogleLogin({
    flow: "auth-code",
    onSuccess: onLoginSuccess,
    onError: onLoginError,
    onNonOAuthError: onNonAuth,
  });

  const googleLogin = () => {
    setError("");
    setIsLoading(true);
    loggingIn();
  };
  return (
    <BigGoogleButtonIcon
      googleLogin={googleLogin}
      isLoading={isLoading}
      error={error}
      buttonText="login with google"
    />
  );
}

export default Login;
