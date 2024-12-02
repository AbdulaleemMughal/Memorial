import { useSelector } from "react-redux";
import styles from "../Css/timeline.module.scss";
import { RootState } from "../Store/appstore";
import { MdAdd } from "react-icons/md";
import { SwitchButton } from "./Switch";
import { useEffect, useState } from "react";
import { day, month, TimelineInterface, year } from "../Typescript/timeline";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";
import { TimelineContent } from "./TimelineContent";
import { Favourite } from "./Favourite";

export const Timeline = () => {
  //--------hooks-------------
  const [timelineInput, setTimelineInput] = useState<string>("");
  const [timeline, setTimeline] = useState<TimelineInterface[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | string>();
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number | string>();
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [reloadPage, setReloadPage] = useState<boolean>(true);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);
  const isSwitch = useSelector((store: RootState) => store.timeline.isSwitch);

  useEffect(() => {
    setReloadPage(false);

    const timelineDate = localStorage.getItem("timeline");
    if (timelineDate) {
      const parsedTimeline = JSON.parse(timelineDate);
      setTimeline(parsedTimeline);
    }
    setTimelineInput(localStorage.getItem("timeline-input") || "");
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      const timelineData = JSON.stringify(timeline);
      localStorage.setItem("timeline", timelineData);
    }
  }, [timeline]);

  //--------function-----------

  const handleTimelineContent = () => {
    const newTimeline: TimelineInterface = {
      id: uuidV4(),
      title,
      location,
      year: selectedYear as number,
      month: selectedMonth,
      day: selectedDay as number,
    };

    setTimeline((prev) => [...prev, newTimeline]);
    setTitle("");
    setLocation("");
    setSelectedYear("Year");
    setSelectedMonth("Month");
    setSelectedDay("Day");
    console.log(timeline);
  };

  const handleDelete = (id: string) => {
    setTimeline((prev) => prev.filter((item) => item.id !== id));
    console.log(timeline);
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggingIndex !== null && draggingIndex !== index) {
      const updatedTimeline = [...timeline];
      const [movedItem] = updatedTimeline.splice(draggingIndex, 1);
      updatedTimeline.splice(index, 0, movedItem);
      setTimeline(updatedTimeline);
      setDraggingIndex(index);
    }
  };

  const handleDrop = () => {
    setDraggingIndex(null);
  };

  return (
    <>
      <section id="timeline">
        <div className={styles["timeline"]}>
          <div className={styles["timeline-edit"]}>
            <div className={styles["timeline-edit-input"]}>
              <input
                type="text"
                placeholder="Timeline"
                value={timelineInput}
                onChange={(e) => {
                  setTimelineInput(e.target.value);
                  localStorage.setItem("timeline-input", timelineInput);
                }}
                style={{ color: textColor }}
              />
              <div
                className={styles["timeline-edit-input-line"]}
                style={{ backgroundColor: pageColor }}
              ></div>
            </div>
            <div className={styles["timeline-check"]}>
              <SwitchButton color={pageColor} />
            </div>
          </div>

          {/* timeline-content */}

          {isSwitch && (
            <>
              {timeline.map((t, index) => (
                <TimelineContent
                  key={t.id}
                  t={t}
                  index={index}
                  onDelete={handleDelete}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}
                  isDragging={draggingIndex === index}
                />
              ))}
              <div className={styles["timeline-content"]} draggable={true}>
                <div className={styles["timeline-content-select"]}>
                  <h4>
                    <select
                      aria-label="Year"
                      style={{ color: pageColor }}
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(Number(e.target.value));
                        console.log(selectedYear);
                      }}
                    >
                      <option>Year</option>
                      {year.map((y) => (
                        <option key={y.title} value={y.title}>
                          {y.title}
                        </option>
                      ))}
                    </select>
                  </h4>
                  <div className={styles["timeline-content-select-edit"]}>
                    <select
                      aria-label="Month"
                      style={{ color: pageColor }}
                      value={selectedMonth}
                      onChange={(e) => {
                        setSelectedMonth(e.target.value);
                      }}
                    >
                      <option>Month</option>
                      {month.map((m) => (
                        <option key={m.title} value={m.title}>
                          {m.title}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label="Day"
                      style={{ color: pageColor }}
                      value={selectedDay}
                      onChange={(e) => {
                        setSelectedDay(Number(e.target.value));
                      }}
                    >
                      <option>Day</option>
                      {day.map((d) => (
                        <option key={d.title} value={d.title}>
                          {d.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className={styles["timeline-content-marker"]}
                  style={{ backgroundColor: pageColor }}
                >
                  {" "}
                </div>
                <div className={styles["timeline-content-info"]}>
                  <h5>
                    <input
                      type="text"
                      placeholder="Title"
                      style={{ color: pageColor }}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </h5>
                  <p>
                    <IoLocationOutline
                      style={{ color: textColor, fontSize: "16px" }}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      style={{ color: textColor }}
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                    />
                  </p>
                  <button
                    style={{ color: textColor, backgroundColor: pageColor }}
                  >
                    <FaRegTrashAlt
                      style={{ color: textColor, fontSize: "16px" }}
                      onClick={() => handleDelete}
                    />
                  </button>
                </div>
              </div>

              {/* timeline button */}
              <div className={styles["timeline-button"]}>
                <button
                  style={{ backgroundColor: pageColor, color: textColor }}
                  onClick={handleTimelineContent}
                >
                  <MdAdd />
                  Add More Timeline
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <Favourite />
    </>
  );
};
