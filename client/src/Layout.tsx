import Sidebar from "components/Sidebar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const noSideBarUrls = ["/login", "/register"];
  const isOnNoSideBarUrl = noSideBarUrls.includes(location.pathname);
  return (
    <div className="flex h-full">
      {!isOnNoSideBarUrl && <Sidebar />}
      <div className={`${!isOnNoSideBarUrl && "pl-16"} w-full`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
