import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BigGoogleButtonIcon from "routes/Common/BigGoogleButtonIcon";
import type { CodeResponse, NonOAuthError } from "@react-oauth/google";
import useAuthDetails from "hooks/useAuthDetails";
import { setWebsites } from "features/websites/websiteSlice";
import { useDispatch } from "react-redux";

function Login() {
  // error message
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { setUserAuthDetails } = useAuthDetails();

  const from = location?.state?.from?.pathname || "/";

  const onLoginSuccess = async (codeResponse: { code: string }) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeResponse.code,
        }),
      }
    );

    if (res.ok) {
      const getWebsitesRes = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/url/website`
      );

      const getWebsitesResData = await getWebsitesRes.json();

      const resData = await res.json();

      setUserAuthDetails(resData);
      dispatch(setWebsites({ websites: getWebsitesResData?.data }));
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
      subCard={{
        linkTo: "/register",
        texts: ["not registered?", "registration"],
      }}
    />
  );
}

export default Login;
