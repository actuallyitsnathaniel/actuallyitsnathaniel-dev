import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiTidal,
  SiYoutube,
} from "react-icons/si";

type PlatformLinksProps = {
  className?: string;
  appleMusicLink?: string;
  spotifyLink?: string;
  soundcloudLink?: string;
  tidalLink?: string;
  youtubeLink?: string;
  webLink?: string;
};

const PlatformLinks = ({
  className,
  appleMusicLink,
  spotifyLink,
  soundcloudLink,
  tidalLink,
  youtubeLink,
  webLink,
}: PlatformLinksProps) => {
  return (
    <div className={`${className} absolute inset-0 z-20`}>
      {spotifyLink && (
        <a
          href={spotifyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2"
        >
          <SiSpotify
            size={80}
            className="hover:text-[#1DB954] transition-colors"
          />
        </a>
      )}
      {appleMusicLink && (
        <a
          href={appleMusicLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[25%] right-[25%] translate-x-1/2 -translate-y-1/2"
        >
          <SiApplemusic
            size={80}
            className="hover:text-[#FF4E6B] transition-colors"
          />
        </a>
      )}
      {tidalLink && (
        <a
          href={tidalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[25%] left-[25%] -translate-x-1/2 translate-y-1/2"
        >
          <SiTidal
            size={80}
            className="hover:text-blue-300 transition-colors"
          />
        </a>
      )}
      {soundcloudLink && (
        <a
          href={soundcloudLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2"
        >
          <SiSoundcloud
            size={80}
            className="hover:text-orange-400 transition-colors"
          />
        </a>
      )}
      {youtubeLink && (
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2"
        >
          <SiYoutube
            size={80}
            className="hover:text-[#fc0032] transition-colors"
          />
        </a>
      )}
      {webLink && (
        <a
          href={webLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2 text-2xl hover:underline transition-colors"
        >
          web
        </a>
      )}
    </div>
  );
};

export default PlatformLinks;
