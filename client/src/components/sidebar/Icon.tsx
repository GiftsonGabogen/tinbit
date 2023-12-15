import { Link } from "react-router-dom";

function Icon({
  icon,
  text,
  link,
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
}) {
  return (
    <Link to={"/" + link} className="sidebar-icon group">
      {icon}{" "}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </Link>
  );
}

export default Icon;
