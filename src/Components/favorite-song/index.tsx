import Disc from "./disc";
import faveSongWebp from "../../assets/images/dolphin-600x600bb.webp";

const FAVORITE_SONG = {
  title: "Hard to Pretend",
  artist: "Tennyson, Leslie",
  artwork: faveSongWebp,
  spotifyLink: "https://open.spotify.com/track/1zPak0T7bSZGbIx5GJNiSH",
  appleMusicLink: "https://music.apple.com/us/song/hard-to-pretend/1764952014",
  tidalLink: "https://listen.tidal.com/track/383356090",
  // soundcloudLink:
  //   "https://soundcloud.com/tennysonleslie/hard-to-pretend?utm_medium=api&utm_campaign=social_sharing&utm_source=id_314547",
  youtubeLink: "https://www.youtube.com/watch?v=MR_C21-PmWs",
};

const FavoriteSong = () => {
  return (
    <div id="favorite-song" className="flex flex-col items-center py-4">
      {/* <p className="text-xl italic opacity-60 pb-2"></p> */}
      <h3 className="text-4xl font-bold py-4 pt-8">currently obsessed with</h3>
      <Disc {...FAVORITE_SONG} />
    </div>
  );
};

export default FavoriteSong;
