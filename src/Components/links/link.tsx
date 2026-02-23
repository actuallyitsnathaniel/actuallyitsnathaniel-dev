import { useActivityLog } from "../../context/ActivityLogContext";

export const Link = ({
  image,
  href,
  alt,
  type,
  download,
  onClick,
  disabled,
}: {
  image: string;
  href?: string;
  alt: string;
  type?: string;
  download?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { log } = useActivityLog();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    log("event", `Opened: ${alt}`);
  };

  return (
    <a
      href={href ?? "#"}
      rel="noopener noreferrer"
      target="_blank"
      type={type}
      download={download}
      onClick={handleClick}
      aria-disabled={disabled}
      style={disabled ? { cursor: "wait", opacity: 0.6 } : undefined}
    >
      <img
        src={image}
        className="p-3 h-16 w-16 duration-150 hover:brightness-50 hover:-translate-y-1"
        alt={alt}
      />
    </a>
  );
};
