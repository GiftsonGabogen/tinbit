import { MdAccountCircle } from "react-icons/md";
import { PiLinkSimpleBold } from "react-icons/pi";
import { FaExclamation } from "react-icons/fa";
import Icon from "./Icon";
import { useParams } from "react-router-dom";
import { ShortUrlParams } from "routes/ShortUrl/ShortUrl";

function Sidebar() {
  const params = useParams<ShortUrlParams>();

  return params.short_url ? null : (
    <div className="fixed top-0 md:left-0 h-16 md:h-screen w-full md:w-16 flex md:flex-col gap-2 pr-2 md:pr-0 md:gap-0 bg-gray-900 text-white justify-end md:justify-start mx-auto">
      <Icon link="me" text="me" icon={<MdAccountCircle size="28" />} />
      <Icon link="urls" text="my urls" icon={<PiLinkSimpleBold size="28" />} />
      <Icon link="about" text="about" icon={<FaExclamation size="28" />} />
    </div>
  );
}

export default Sidebar;
