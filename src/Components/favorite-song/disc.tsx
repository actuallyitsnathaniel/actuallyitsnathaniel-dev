import { useState } from "react";
import PlatformLinks from "./platform-links";

export type DiscProps = {
  className?: string;
  appleMusicLink?: string;
  spotifyLink?: string;
  soundcloudLink?: string;
  tidalLink?: string;
  youtubeLink?: string;
  webLink?: string;
  artwork: string;
  title?: string;
  artist?: string;
};

const Disc = ({
  className,
  appleMusicLink,
  spotifyLink,
  soundcloudLink,
  tidalLink,
  youtubeLink,
  webLink,
  artwork,
  title,
  artist,
}: DiscProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`${className} transition-scale duration-100 text-8xl md:hover:scale-110 group p-3`}
    >
      <div
        className="relative h-72 w-72 mx-auto"
        onMouseLeave={() => setFocused(false)}
        onMouseEnter={() => setFocused(true)}
        onClick={() => setFocused(!focused)}
      >
        {/* Full-size background layer */}
        <div
          className={`absolute inset-0 transition-all bg-black z-10
            ${focused ? "bg-opacity-50 backdrop-blur-md opacity-100 visible" : "invisible opacity-0 bg-opacity-0 backdrop-blur-none"}`}
        />
        {/* Icon layer, sits above background */}
        <PlatformLinks
          className={`transition-all ${focused ? "opacity-100 visible" : "invisible opacity-0"}`}
          {...{
            appleMusicLink,
            spotifyLink,
            soundcloudLink,
            tidalLink,
            youtubeLink,
            webLink,
          }}
        />
        <img
          height="288px"
          width="288px"
          src={artwork}
          alt={title}
          loading="eager"
        />
      </div>
      <div className="flex flex-col text-center justify-center transition-scale duration-100 origin-top text-lg md:invisible md:group-hover:visible md:scale-0 md:group-hover:scale-90">
        {title && <span className="font-bold">{title}</span>}
        {artist && <span className="text-base opacity-70">{artist}</span>}
      </div>
    </div>
  );
};

export default Disc;
