import { useSelector } from "react-redux";
import styles from "../LivePageCss/timeline.module.scss";
import { RootState } from "../../Store/appstore";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { TimelineInterface } from "../../Typescript/timeline";

export const Timeline = () => {
  const [timelineInput, setTimelineInput] = useState<string>("");
  const [timeline, setTimeline] = useState<TimelineInterface[]>([]);

  const textColor = useSelector((store: RootState) => store.text.isText);
  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const timelineSwitch = useSelector(
    (store: RootState) => store.timeline.isSwitch
  );

  useEffect(() => {
    const timeline = localStorage.getItem("timeline-input");
    if (timeline) {
      setTimelineInput(timeline);
    }

    const storedTimeline = localStorage.getItem("timeline");
    if (storedTimeline) {
      setTimeline(JSON.parse(storedTimeline));
    }

  }, []);

  return (
    <>
      {timelineSwitch && (
        <div className={styles["timeline"]}>
          <div className={styles["timeline-heading"]}>
            <h2 style={{ color: textColor }}>{timelineInput}</h2>
            <div
              style={{ backgroundColor: pageColor }}
              className={styles["timeline-heading-line"]}
            ></div>
          </div>

          {
            timeline.map((t) => (
                <div className={styles["timeline-content"]}>
            <div className={styles["timeline-content-date"]}>
              <h2 style={{color: pageColor}}>{t.year}</h2>
              <span style={{color: textColor}}>
                {t.month} {t.day} <sup>th</sup>
              </span>
            </div>
            <div
              className={styles["timeline-content-marker"]}
              style={{ backgroundColor: pageColor }}
            ></div>
            <div className={styles["timeline-content-info"]}>
              <h5 style={{color: pageColor}}>{t.title}</h5>
              <p style={{color: textColor}}>
                <IoLocationOutline /> {t.location}
              </p>
            </div>
          </div>
            ))
          }
        </div>
      )}
    </>
  );
};
