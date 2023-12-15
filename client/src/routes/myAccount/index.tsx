import { getUser } from "features/user/userSelectors";
import { useSelector } from "react-redux";

type ProfileDetailsProps = { type: string; value: string };

const ProfileDetails = ({ details }: { details: ProfileDetailsProps[] }) => (
  <div className="my-1 flex gap-3">
    <div>
      {details.map((detail) => (
        <p>{detail.type}: </p>
      ))}
    </div>
    <div>
      {details.map((detail) => (
        <p className="text-gray-600">{detail.value}</p>
      ))}
    </div>
  </div>
);
function MyAccount() {
  const profile = useSelector(getUser);

  return (
    <>
      <h1 className="text-h2 text-center mb-4">My Account</h1>
      <div className="bg-white w-full p-4">
        <div className="profile flex gap-2 mb-6">
          <img
            src={profile.profilePic}
            alt="profile-img"
            className="max-w-[4rem] rounded-full"
          />
          <div className="flex-grow flex justify-end items-center">
            <button className="py-1 px-2 border-green-500 border-2 text-green-500">
              edit profile
            </button>
          </div>
        </div>
        <div>
          <ProfileDetails
            details={[
              { type: "Firstname", value: profile.firstName },
              { type: "Lastname", value: profile.lastName },
              { type: "Email", value: profile.email },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default MyAccount;
