import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage, {
  LocalStorageEnum,
} from "../../components/hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { setUser } from "features/user/userSlice";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  // tokens
  const { setItem: setAccessTokenItem } = useLocalStorage(
    LocalStorageEnum.ACCESS_TOKEN
  );
  const { setItem: setRefreshTokenItem } = useLocalStorage(
    LocalStorageEnum.REFRESH_TOKEN
  );
  const dispatch = useDispatch();
  // error message
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const loggingIn = useGoogleLogin({
    flow: "auth-code",
    onSuccess: onLoginSuccess,
    onError: (errorResponse) => console.log(errorResponse),
  });

  const googleLogin = () => {
    setIsLoading(true);
    loggingIn();
  };
  return (
    <div>
      <h2>Login</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ minWidth: "200px" }}>
          {error}
          <button onClick={() => googleLogin()}>login with google</button>
        </div>
      )}
    </div>
  );
}

export default Login;
