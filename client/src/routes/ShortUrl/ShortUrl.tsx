import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../error-page";
import { useParams } from "react-router-dom";

export type ShortUrlParams = {
  short_url?: string;
};

const fetchTodos = async (short_url: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_API_SERVER_URL
    }/url/short_url?short_url_link=${short_url}`
  );
  return await res.json();
};

function ShortUrl() {
  const params = useParams<ShortUrlParams>();
  const { isError, isLoading, data } = useQuery({
    queryFn: () => fetchTodos(params.short_url || ""),
    queryKey: ["short_url", params.short_url],
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data?.data?.length) {
    return <ErrorPage />;
  }

  console.log(data);
  return (
    <div>
      <div
        id="links"
        className="flex w-full flex-wrap justify-center items-center"
      >
        {data.data.map((url: any) => {
          return (
            <div className="w-full md:w-96 text-center p-12">
              <div key={url.short_url_link + url.link}>{url.website_name}</div>
              <img
                className="w-full"
                src={`http://localhost:5173/assets/images/websites/${url.website_image}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShortUrl;
