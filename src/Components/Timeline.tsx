import { useDispatch, useSelector } from "react-redux";
import styles from "../Css/timeline.module.scss";
import { RootState } from "../Store/appstore";
import { MdAdd } from "react-icons/md";
import { SwitchButton } from "./Switch";
import { useEffect, useState } from "react";
import {
  addDay,
  addLocation,
  addMonth,
  addTilte,
  addTimeline,
  addYear,
} from "../Store/TimelineSlice";
import { day, month, TimelineInterface, year } from "../Typescript/timeline";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidV4 } from "uuid";

export const Timeline = () => {
  //--------hooks-------------
  const [timelineInput, setTimelineInput] = useState<string>("");
  const [timeline, setTimeline] = useState<TimelineInterface[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const dispatch = useDispatch();
  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);
  const isSwitch = useSelector((store: RootState) => store.timeline.isSwitch);

  useEffect(() => {
    setTimelineInput(localStorage.getItem("timeline-input") || "");
    setSelectedYear(Number(localStorage.getItem("timeline-year") || ""));
    setSelectedMonth(localStorage.getItem("timeline-month") || "");
    setSelectedDay(Number(localStorage.getItem("timeline-day") || ""));
    setTitle(localStorage.getItem("timeline-title") || "");
    setLocation(localStorage.getItem("timeline-location") || "");
  }, []);

  //--------function-----------
  const handleTimelineInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimelineInput(e.target.value);
    dispatch(addTimeline(timelineInput));
  };

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
    console.log(timeline);
  };

  return (
    <>
      <section id="timeline">
        <div className="container">
          <div className={styles["timeline"]}>
            <div className={styles["timeline-edit"]}>
              <div className={styles["timeline-edit-input"]}>
                <input
                  type="text"
                  placeholder="Timeline"
                  value={timelineInput}
                  onChange={handleTimelineInput}
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
                {timeline.map(() => (
                  <div className={styles["timeline-content"]} draggable={true}>
                    <div className={styles["timeline-content-select"]}>
                      <h4>
                        <select
                          aria-label="Year"
                          style={{ color: pageColor }}
                          value={selectedYear}
                          onChange={(e) => {
                            setSelectedYear(Number(e.target.value));
                            dispatch(addYear(selectedYear));
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
                            dispatch(addMonth(selectedMonth));
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
                            dispatch(addDay(selectedDay));
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
                            dispatch(addTilte(title));
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
                            dispatch(addLocation(location));
                          }}
                        />
                      </p>
                      <button
                        style={{ color: textColor, backgroundColor: pageColor }}
                      >
                        <FaRegTrashAlt
                          style={{ color: textColor, fontSize: "16px" }}
                        />
                      </button>
                    </div>
                  </div>
                ))}

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
        </div>
      </section>
    </>
  );
};
