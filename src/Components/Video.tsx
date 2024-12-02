import { Switch, SwitchProps, Backdrop } from "@mui/material";
import styles from "../Css/video.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/appstore";
import { addSwitch } from "../Store/videoSlice";
import ReactPlayer from "react-player";
import { RxCross2 } from "react-icons/rx";
import { VideoInterface } from "../Typescript/video";
import { FaTrash } from "react-icons/fa";
import { Gallery } from "./Gallery";

export const Video = () => {
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [videoInput, setVideoInput] = useState<string>("Videos");
  const [reloadPage, setReloadPage] = useState<boolean>(true);
  const [videoURL, setVideoURL] = useState<string>("");
  const [videoData, setVideoData] = useState<VideoInterface[]>([]);

  const textColor = useSelector((store: RootState) => store.text.isText);
  const pageColor = useSelector((store: RootState) => store.color.isColor);

  useEffect(() => {
    setReloadPage(false);

    setVideoInput(localStorage.getItem("video-input") || "");
    setVideoData(JSON.parse(localStorage.getItem("video-data") || "[]"));
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      videoInput != "" && localStorage.setItem("video-input", videoInput);
      localStorage.setItem("video-data", JSON.stringify(videoData));
    }
  }, [videoInput, videoData]);

  const handleSwitchChange: SwitchProps["onChange"] = (event) => {
    setIsSwitchOn(event.target.checked);
    dispatch(addSwitch(isSwitchOn));
  };

  const handleVideo = () => {
    setOpen(false);
    setVideoURL("");
    const newVideo = {
      id: videoData.length + 1,
      url: videoURL,
    };

    setVideoData((prev) => [...prev, newVideo]);
    console.log(videoData);
  };

  const deleteVideo = (id: number) => {
    setVideoData((prev) => prev.filter((item) => item.id!== id));
  }

  return (
    <>
      <div className={styles["video"]}>
        <div className={styles["video-content"]}>
          <div className={styles["video-content-input"]}>
            <input
              type="text"
              placeholder="Video"
              style={{ color: textColor }}
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
            />
            <div
              className={styles["video-content-input-line"]}
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className={styles["video-content-switch"]}>
            <Switch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
              color="secondary"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: pageColor,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  color: pageColor,
                },
                "& .MuiSwitch-track": {
                  color: pageColor,
                },
              }}
            />
            <p style={{ color: pageColor }}>Enable</p>
          </div>
        </div>

        {isSwitchOn && (
          <>
            <div className={styles["video-container"]}>
              {videoData.map((video) => (
                <div>
                  <ReactPlayer
                    key={video.id}
                    width="450px"
                    height="250px"
                    url={video.url}
                  />
                  <FaTrash
                    style={{
                      color: "white",
                      position: "relative",
                      bottom: "232px",
                      left: "427px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteVideo(video.id)}
                  />
                </div>
              ))}
            </div>
            <div className={styles["video-button"]}>
              <button
                style={{ backgroundColor: pageColor, color: textColor }}
                onClick={() => setOpen(true)}
              >
                Add Video
              </button>
              <div className={styles["video-modal"]}>
                <Backdrop
                  sx={{
                    backgroundColor: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: "53vw",
                    height: "49vh",
                    top: "24%",
                    left: "25%",
                    display: "block",
                    overflowY: "auto",
                  }}
                  open={open}
                >
                  <div className={styles["video-modal-title"]}>
                    <h4 style={{ color: pageColor }}>Add a Video</h4>
                    <RxCross2
                      style={{ fontSize: "23px", cursor: "pointer" }}
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <div className={styles["video-modal-body"]}>
                    <div className={styles["video-modal-body-input"]}>
                      <label>Youtube URL</label>
                      <input
                        type="text"
                        placeholder="Enter the address of your Video"
                        value={videoURL}
                        onChange={(e) => setVideoURL(e.target.value)}
                      />
                    </div>
                    <div className={styles["video-modal-body-link"]}>
                      <p>
                        The Format should be like:
                        <span style={{ textDecoration: "underline" }}>
                          https://www.youtube.com/watch?v=JGwWNGJdvx8
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className={styles["video-modal-footer"]}>
                    <div className={styles["video-modal-footer-button"]}>
                      <button
                        style={{ backgroundColor: pageColor, color: textColor }}
                        onClick={handleVideo}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Backdrop>
              </div>
            </div>
          </>
        )}
      </div>
      <Gallery />
    </>
  );
};
