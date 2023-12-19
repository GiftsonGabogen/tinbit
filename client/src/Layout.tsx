import Sidebar from "components/Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ShortUrlParams } from "routes/ShortUrl/ShortUrl";
import pageShouldhaveSidebar from "utils/PageShouldNoSidebar";

function Layout() {
  const location = useLocation();
  const params = useParams<ShortUrlParams>();
  const pageShouldhaveSidebarRes = pageShouldhaveSidebar({
    location: location?.pathname,
    params,
  });
  return (
    <div className="flex h-full">
      {pageShouldhaveSidebarRes && <Sidebar />}
      <div
        className={`${
          pageShouldhaveSidebarRes && "pl-4 pr-4 pt-20 pb-4 md:pt-8 md:pl-24"
        } w-full bg-gray-300`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
