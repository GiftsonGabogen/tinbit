import { useParams } from "react-router-dom";

export type ShortUrlParams = {
  short_url?: string;
};

function ShortUrl() {
  const params = useParams<ShortUrlParams>();
  return <div>{params.short_url}</div>;
}

export default ShortUrl;
