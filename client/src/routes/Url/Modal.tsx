import { createPortal } from "react-dom";
import { ShortUrlType } from ".";

interface Props {
  open: boolean;
  link?: ShortUrlType;
  className?: string;
  close?: () => void;
}

const Body = ({ link, close, className }: Omit<Props, "open">) => {
  return link ? (
    <div
      className={`fixed md:relative top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-gray-600 bg-opacity-30 ${className}`}
    >
      <div className="w-128 md:w-full md:h-full bg-gray-200 p-8 relative">
        <button
          className="absolute right-4 top-2 cursor-pointer"
          onClick={close}
        >
          X
        </button>
        <div className="text-center mb-6">
          <h1 className="text-h2 leading-none">{link.name}</h1>
          <p>{link.shortUrl}</p>
        </div>
        <div>
          {link.urls.map((url) => {
            return (
              <div className="flex w-full mb-2 border-b border-gray-400 p-2">
                <img src={url.image} alt="" className="h-20 p-3" />
                <div className="flex flex-wrap">
                  <input
                    className="w-full border-b border-gray-400 bg-gray-200 p-1"
                    value={url.name}
                  />
                  <input
                    className="w-full border-b border-gray-400 bg-gray-200 p-1"
                    value={url.link}
                  />
                  <input
                    className="w-full border-b border-gray-400 bg-gray-200 p-1"
                    value={url.website}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>hello</div>
  );
};

function Modal({ open, link, close, className }: Props) {
  const screenWidth = window.innerWidth;
  console.log(screenWidth);
  console.log(screenWidth > 768);

  return screenWidth > 768 ? (
    <Body link={link} className={className} />
  ) : open ? (
    createPortal(
      <Body link={link} close={close} className={className} />,
      document.getElementById("portal")!
    )
  ) : null;
}

export default Modal;
