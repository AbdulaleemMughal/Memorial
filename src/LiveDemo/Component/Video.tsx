import ReactPlayer from "react-player";
import styles from "../LivePageCss/video.module.scss";
import { VideoInterface } from "../../Typescript/video";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appstore";

export const Video = () => {

  const [video, setVideo] = useState<VideoInterface[]>([]);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);
  const videoSwitch = useSelector((store: RootState) => store.video.isVideoSwitch)

  useEffect(() => {
    const videoData = localStorage.getItem("video-data");
    if (videoData) {
      setVideo(JSON.parse(videoData));
    }
  }, []);

  return (
    <>
      {!videoSwitch && <div className={styles["video"]}>
        <div className={styles["video-heading"]}>
          <h2 style={{color: textColor}}>Videos</h2>
          <div className={styles["video-heading-line"]} style={{backgroundColor: pageColor}}></div>
        </div>
        <div className={styles["video-content"]}>
          {video.map((video) => (
            <ReactPlayer
              key={video.id}
              width="450px"
              height="250px"
              url={video.url}
            />
          ))}
        </div>
      </div>}
    </>
  );
};
