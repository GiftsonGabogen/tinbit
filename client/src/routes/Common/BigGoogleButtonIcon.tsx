import { FcGoogle } from "react-icons/fc";

interface BigGoogleButtonIconType {
  isLoading: boolean;
  error: string;
  googleLogin: () => void;
  buttonText?: string;
}

function BigGoogleButtonIcon({
  isLoading,
  error,
  buttonText,
  googleLogin,
}: BigGoogleButtonIconType) {
  return (
    <div className="flex h-full w-screen justify-center">
      {error && (
        <div className="flex fixed top-0 w-screen justify-center p-6">
          <div className="p-3 rounded bg-red-400 text-gray-200">{error}</div>
        </div>
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center">
          <div className="flex flex-col items-center w-auto h-fit rounded-md p-16 bg-gray-800 hover:bg-gray-300 hover:rounded-sm  transition-all duration-300 ease-linear group ">
            <button
              onClick={() => googleLogin()}
              className="cursor-pointer mb-5"
            >
              <FcGoogle size="258" />
            </button>
            <h2 className="font-light text-gray-200 group-hover:text-gray-800 transition-all duration-300 ease-linear">
              {buttonText}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default BigGoogleButtonIcon;
