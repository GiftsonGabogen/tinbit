import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useLocalStorage, {
  LocalStorageEnum,
} from "../../components/hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { setUser } from "features/user/userSlice";

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
    <div className="flex h-screen w-screen justify-center">
      {error && (
        <div className="flex fixed top-0 w-screen justify-center p-6">
          <div className="p-3 rounded bg-red-400 text-gray-200">{error}</div>
        </div>
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center">
          <div className="flex flex-col items-center w-auto h-fit rounded-md p-16 bg-gray-800 hover:bg-gray-300  transition-all duration-300 ease-linear group">
            <button
              onClick={() => googleLogin()}
              className="cursor-pointer mb-5"
            >
              <FcGoogle size="258" />
            </button>
            <h2 className="font-light text-gray-200 group-hover:text-gray-800 transition-all duration-300 ease-linear">
              login with google
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
