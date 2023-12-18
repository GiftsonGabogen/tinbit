import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BigGoogleButtonIcon from "routes/Common/BigGoogleButtonIcon";
import type { CodeResponse, NonOAuthError } from "@react-oauth/google";
import useAuthDetails from "hooks/useAuthDetails";

function Login() {
  // error message
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserAuthDetails } = useAuthDetails();

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

    if (res.ok) {
      const resData = await res.json();
      setUserAuthDetails(resData);
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
