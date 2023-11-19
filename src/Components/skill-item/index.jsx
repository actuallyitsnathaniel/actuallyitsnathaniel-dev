export const SkillItem = ({ href, image, alt, color, classNames }) => {
  return (
    <a href={href} className="flex justify-center md:basis-1/4 basis-1/3 p-1">
      <img
        src={image}
        alt={alt}
        className={`transition-all duration-100 fill-[${color}] hover:fill-gray-400 md:contrast-[70%] hover:contrast-100 hover:brightness-110 md:saturate-0 hover:saturate-100 w-24 p-0.5 ${classNames}`}
      />
    </a>
  );
};
