import { useState } from "react";
import Modal from "./Modal";

const urls: ShortUrlType[] = [
  {
    id: 1,
    name: "affordable bags",
    shortUrl: "https://tinbit.co/asddw",
    urls: [
      {
        urlId: 1,
        link: "https://amazon.com/bag1",
        website: "amazon",
        name: "amazon bag",
        image:
          "https://brandlogos.net/wp-content/uploads/2016/10/amazon-logo-preview.png",
      },
      {
        urlId: 2,
        link: "https://bestbuy.com/bag2",
        website: "bestbuy",
        name: "bestbuy bag",
        image:
          "https://brandlogos.net/wp-content/uploads/2021/05/best-buy-logo.png",
      },
    ],
  },
  {
    id: 1,
    name: "sample bags",
    shortUrl: "https://tinbit.co/asddw",
    urls: [
      {
        urlId: 1,
        link: "https://amazon.com/bag1",
        website: "amazon",
        name: "amazon bag",
        image:
          "https://brandlogos.net/wp-content/uploads/2016/10/amazon-logo-preview.png",
      },
      {
        urlId: 2,
        link: "https://bestbuy.com/bag2",
        website: "bestbuy",
        name: "bestbuy bag",
        image:
          "https://brandlogos.net/wp-content/uploads/2021/05/best-buy-logo.png",
      },
    ],
  },
];

export interface ShortUrlType {
  id: string | number;
  name: string;
  shortUrl: string;
  urls: UrlType[];
}

interface UrlType {
  urlId: string | number;
  link: string;
  website: string;
  image: string;
  name: string;
}

const Url = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<ShortUrlType>();

  const openModal = (id: ShortUrlType["id"]) => {
    const currentObject = urls.find((url) => url.id === id);
    setCurrentLink(currentObject!);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <h1 className="text-h2 text-center mb-4">Url</h1>
      <div className="flex h-full justify-center">
        <div
          className={`border-gray-400 w-full h-fit flex flex-wrap gap-4${
            !urls.length ? " justify-center" : ""
          }`}
        >
          <div className="basis-full">
            {urls.length > 0 &&
              urls.map((url) => {
                return (
                  <div
                    className="w-full bg-gray-50 border-b border-gray-200 px-6 py-2"
                    key={url.id}
                    onClick={() => openModal(url.id)}
                  >
                    <p>{url.name}</p>
                    <p>{url.shortUrl}</p>
                  </div>
                );
              })}
          </div>
          <button className="bg-green-500 px-6 py-3 text-gray-300">
            create link
          </button>
        </div>
        <Modal open={isModalOpen} link={currentLink} close={closeModal} />
      </div>
    </>
  );
};

export default Url;
