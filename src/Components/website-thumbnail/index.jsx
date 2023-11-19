export const WebsiteThumbnail = ({ href, image, label, classNames, alt }) => {
  return (
    <div className="flex max-w-md flex-wrap flex-col justify-center uppercase text-center p-4">
      <a href={href} rel="noopener noreferrer" target="_blank" className="p-2">
        <img
          src={image}
          alt={alt}
          className="w-full object-contain rounded-md"
        />
      </a>
      <p className="text-3xl">{label}</p>
    </div>
  );
};
