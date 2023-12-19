import { ShortUrlParams } from "routes/ShortUrl/ShortUrl";

interface PageShouldNoSidebarProps {
  location?: string;
  params?: ShortUrlParams;
}

const pageShouldhaveSidebar = ({
  location,
  params,
}: PageShouldNoSidebarProps): boolean => {
  const noSideBarUrls = ["/login", "/register"];
  if (!location && !params) {
    return false;
  }
  if (location && noSideBarUrls.includes(location)) {
    return false;
  }

  if (params?.short_url) {
    return false;
  }
  return true;
};

export default pageShouldhaveSidebar;
