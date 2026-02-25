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
          className={`absolute -inset-1 transition-all duration-50 brightness-25 z-10
            ${focused ? "backdrop-blur-md opacity-100 visible" : "invisible opacity-0 backdrop-blur-none"}`}
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
          className="block"
        />
      </div>
      {/* Mobile hint */}
      <p
        className={`text-center text-xs mt-1 md:hidden transition-opacity duration-150 ${focused ? "opacity-0" : "opacity-75"}`}
      >
        tap to explore
      </p>
      {/* Desktop hint */}
      <p
        className={`text-center text-xs mt-1 hidden md:block transition-opacity duration-150 ${focused ? "opacity-0" : "opacity-75"}`}
      >
        hover to explore
      </p>
      <div className="flex flex-col text-center justify-center transition-scale duration-100 origin-top text-lg md:invisible md:group-hover:visible md:scale-0 md:group-hover:scale-90">
        {title && <span className="font-bold">{title}</span>}
        {artist && <span className="text-base opacity-70">{artist}</span>}
      </div>
    </div>
  );
};

export default Disc;
