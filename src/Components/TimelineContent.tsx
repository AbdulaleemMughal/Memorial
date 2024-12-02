import styles from "../Css/timeline.module.scss";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { day, month, TimelineInterface, year } from "../Typescript/timeline";
import { useState } from "react";

type TimelineContentProps = {
  t: TimelineInterface;
  index: number;
  onDelete: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDrop: () => void;
  isDragging: boolean;
};

export const TimelineContent = ({
  t,
  index,
  onDelete,
  onDragStart,
  onDragEnter,
  onDrop,
  isDragging,
}: TimelineContentProps) => {

  const [selectedYear, setSelectedYear] = useState<number | string>();
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number | string>();
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");


  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);

  return (
    <div
      className={`${styles["timeline-content"]} ${
        isDragging ? styles["dragging"] : ""
      }`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragOver={(e) => e.preventDefault()} // Required to allow drop
      onDrop={onDrop}
    >
      <div className={styles["timeline-content-select"]}>
                  <h4>
                    <select
                      aria-label="Year"
                      style={{ color: pageColor }}
                      value={t.year ? t.year : "Year"}
                      onChange={(e) => {
                        setSelectedYear(Number(e.target.value));
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
                      value={t.month ? t.month : "Month"}
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
                      value={t.day ? t.day : "Day"}
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
                      value={t.title}
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
                      value={t.location}
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
                      onClick={() => onDelete(t.id)}
                    />
                  </button>
                </div>
    </div>
  );
};
