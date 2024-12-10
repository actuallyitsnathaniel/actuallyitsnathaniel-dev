export const WebsiteThumbnail = ({
  href,
  image,
  label,
  classNames,
  alt,
}: {
  href: string;
  image: string;
  label: string;
  classNames?: string;
  alt: string;
}) => {
  return (
    <div
      className={`flex max-w-md flex-wrap flex-col 
        justify-center uppercase text-center p-4 
        mx-8 duration-100 hover:scale-105 ${classNames}`}
    >
      <a href={href} rel="noopener noreferrer" target="_blank" className="p-2 ">
        <img src={image} alt={alt} className="object-cover rounded-md" />
      </a>
      <p className="text-3xl">{label}</p>
    </div>
  );
};
