import { useActivityLog } from "../../context/ActivityLogContext";

export const Link = ({
  image,
  href,
  alt,
  type,
  download,
}: {
  image: string;
  href: string;
  alt: string;
  type?: string;
  download?: string;
}) => {
  const { log } = useActivityLog();

  const handleClick = () => {
    log("event", `Opened: ${alt}`);
  };

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      type={type}
      download={download}
      onClick={handleClick}
    >
      <img
        src={image}
        className="p-3 h-16 w-16 duration-150 hover:brightness-50 hover:-translate-y-1"
        alt={alt}
      />
    </a>
  );
};
