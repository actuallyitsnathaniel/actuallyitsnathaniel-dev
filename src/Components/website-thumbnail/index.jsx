export const WebsiteThumbnail = ({ href, image, label, classNames, alt }) => {
  return (
    <div className="flex flex-wrap justify-center uppercase text-center max-w-sm p-4">
      <a href={href} rel="noopener noreferrer" target="_blank" className="p-2">
        <img src={image} alt={alt} className="object-scale-down rounded-md" />
      </a>
      {label}
    </div>
  );
};
