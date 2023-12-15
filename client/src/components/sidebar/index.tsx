import { MdAccountCircle } from "react-icons/md";
import { PiLinkSimpleBold } from "react-icons/pi";
import { FaExclamation } from "react-icons/fa";
import Icon from "./Icon";

function Sidebar() {
  return (
    <div className="fixed top-0 md:left-0 h-16 md:h-screen w-full md:w-16 flex md:flex-col gap-2 pr-2 md:pr-0 md:gap-0 bg-gray-900 text-white justify-end md:justify-start mx-auto">
      <Icon text="me" icon={<MdAccountCircle size="28" />} />
      <Icon text="my urls" icon={<PiLinkSimpleBold size="28" />} />
      <Icon text="about" icon={<FaExclamation size="28" />} />
    </div>
  );
}

export default Sidebar;
