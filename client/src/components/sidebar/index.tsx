import { MdAccountCircle } from "react-icons/md";
import { PiLinkSimpleBold } from "react-icons/pi";
import { FaExclamation } from "react-icons/fa";
import Icon from "./Icon";

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 text-white">
      <Icon text="me" icon={<MdAccountCircle size="28" />} />
      <Icon text="my urls" icon={<PiLinkSimpleBold size="28" />} />
      <Icon text="about" icon={<FaExclamation size="28" />} />
    </div>
  );
}

export default Sidebar;
