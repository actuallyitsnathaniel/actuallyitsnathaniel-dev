export const SkillItem = ({
  href,
  image,
  alt,
  color,
  classNames,
}: {
  href: string;
  image: string;
  alt: string;
  color?: string;
  classNames?: string;
}) => {
  return (
    <a href={href} className="flex justify-center">
      <img
        src={image}
        alt={alt}
        className={`transition-all duration-100 fill-[${color}] hover:fill-gray-400 md:contrast-70 hover:contrast-100 hover:brightness-110 md:saturate-0 hover:saturate-100 w-24 p-0.5 ${classNames}`}
        width="96"
        height="96"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
};
