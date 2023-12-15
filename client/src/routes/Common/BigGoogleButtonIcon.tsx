import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

interface SubCardType {
  texts: [string, string];
  linkTo: string;
}
interface BigGoogleButtonIconType {
  isLoading: boolean;
  error: string;
  googleLogin: () => void;
  subCard: SubCardType;
  buttonText?: string;
}

function BigGoogleButtonIcon({
  isLoading,
  error,
  buttonText,
  subCard,
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
        <div className="flex items-center flex-grow-1 flex-wrap w-[600px] px-6">
          <div className="w-full">
            <div className="flex flex-col items-center w-full h-fit rounded-md p-16 bg-gray-800 hover:bg-gray-300 hover:rounded-sm  transition-all duration-300 ease-linear group ">
              <button
                onClick={() => googleLogin()}
                className="cursor-pointer mb-5"
              >
                <FcGoogle size="128" />
              </button>
              <h2 className="font-light text-gray-200 group-hover:text-gray-800 transition-all duration-300 ease-linear text-center">
                {buttonText}
              </h2>
            </div>
            <div className="flex items-center p-6 w-full mt-4 bg-[#4caf50] rounded-md opacity-7 text-gray-100">
              <p className="grow">{subCard.texts[0]}</p>
              <Link
                to={subCard.linkTo}
                className="
              px-2 py-1 rounded-md bg-gray-100 text-gray-700
              "
              >
                {subCard.texts[1]}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BigGoogleButtonIcon;
