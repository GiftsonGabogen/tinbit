import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useLocalStorage, { LocalStorageEnum } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "features/user/userSlice";
import { getUser } from "features/user/userSelectors";
import BigGoogleButtonIcon from "routes/Common/BigGoogleButtonIcon";
import Input from "routes/Common/Input";
import type { FormEvent } from "react";
import type { CodeResponse, NonOAuthError } from "@react-oauth/google";

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
  // FIXME: refactor this, duplicate code with login page
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
    onSuccess: onRegisterAuthSuccess,
    onError: onLoginError,
    onNonOAuthError: onNonAuth,
  });

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/user/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          profilePic,
          email,
          password,
        }),
      }
    );
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
    setError("");
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
        subCard={{
          linkTo: "/login",
          texts: ["already registered?", "login"],
        }}
      />
    ) : (
      <>
        {error}
        <form
          onSubmit={handleRegisterSubmit}
          className="flex items-center h-full"
        >
          <div className="max-w-[400px] mx-auto">
            <Input type="text" value={firstName} onChange={setFirstName} />
            <Input type="text" value={lastName} onChange={setLastName} />
            <Input type="password" value={password} onChange={setPassword} />
            <button
              type="submit"
              className="block text-center w-full mt-4 rounded-md p-2 bg-gray-400 hover:bg-gray-700 text-gray-800 hover:text-gray-300 transition-all duration-300 ease-linear"
            >
              register
            </button>
          </div>
        </form>
      </>
    );
  };

  return <>{isLoading ? displayLoading() : displayNotLoading()}</>;
}

export default Register;
