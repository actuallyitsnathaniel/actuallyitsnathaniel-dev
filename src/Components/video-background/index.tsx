import BGVideoMP4 from "/src/assets/videos/node_background.mp4";
import BGVideoWEBM from "/src/assets/videos/node_background.webm";

export const VideoBackground = () => {
  return (
    <div className="video-wrapper">
      <video
        height={"110%"}
        width={"auto"}
        id="video"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="video"
      >
        <source src={BGVideoMP4} type="video/mp4" />
        <source src={BGVideoWEBM} type="video/webm" />
        Sorry, your browser does not support HTML5 video.
      </video>
    </div>
  );
};
