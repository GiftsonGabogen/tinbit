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
      <div
        className={`${
          !isOnNoSideBarUrl && "pl-4 pr-4 pt-20 pb-4 md:pt-8 md:pl-24"
        } w-full bg-gray-300`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
