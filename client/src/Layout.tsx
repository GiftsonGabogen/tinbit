import Sidebar from "components/sidebar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const noSideBarUrls = ["/login", "/register"];
  const isOnNoSideBarUrl = noSideBarUrls.includes(location.pathname);
  return (
    <div className="flex">
      {!isOnNoSideBarUrl && <Sidebar />}
      <div className={`${!isOnNoSideBarUrl && "pl-16"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
