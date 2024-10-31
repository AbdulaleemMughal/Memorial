import { useDispatch, useSelector } from "react-redux";
import styles from "../Css/timeline.module.scss";
import { RootState } from "../Store/appstore";
import { MdAdd } from "react-icons/md";
import { SwitchButton } from "./Switch";
import { useEffect, useState } from "react";
import { addTimeline } from "../Store/TimelineSlice";
import { day, month, TimelineInterface, year } from "../Typescript/timeline";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";



export const Timeline = () => {
    //--------hooks-------------
    const [timelineInput, setTimelineInput] = useState<string>("");
    const [timeline, setTimeline] = useState<TimelineInterface[]>([]);

    const dispatch = useDispatch();
    const pageColor = useSelector((store: RootState) => store.color.isColor);
    const textColor = useSelector((store: RootState) => store.text.isText);
    const isSwitch = useSelector((store: RootState) => store.timeline.isSwitch);

    useEffect(() => {
        setTimelineInput(localStorage.getItem("timeline-input") || "");
    }, []);

    //--------function-----------
    const handleTimelineInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimelineInput(e.target.value);
        dispatch(addTimeline(timelineInput));
    };

    const handleTimelineContent = () => {

    }

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
                                <div className={styles['timeline-content']} draggable={true}>
                                    <div className={styles['timeline-content-select']}>
                                        <h4>
                                            <select aria-label="Year" style={{color: pageColor}}>
                                                <option>Year</option>
                                                {
                                                    year.map((y) => (
                                                        <option key={y.title} value={y.title}>{y.title}</option>
                                                    ))
                                                }
                                            </select>
                                        </h4>
                                        <div className={styles['timeline-content-select-edit']}>
                                        <select aria-label="Month" style={{color: pageColor}}>
                                                <option>Month</option>
                                                {
                                                    month.map((m) => (
                                                        <option key={m.title} value={m.title}>{m.title}</option>
                                                    ))
                                                }
                                            </select>
                                            <select aria-label="Day" style={{color: pageColor}}>
                                                <option>Day</option>
                                                {
                                                    day.map((d) => (
                                                        <option key={d.title} value={d.title}>{d.title}</option>
                                                    ))
                                                }
                                            </select>
                                            </div>
                                    </div>
                                    <div className={styles['timeline-content-marker']} style={{backgroundColor: pageColor}}>  </div>
                                    <div className={styles['timeline-content-info']}> 
                                        <h5>
                                            <input type="text" placeholder="Title" style={{color: pageColor}} />
                                        </h5>
                                        <p>
                                                <IoLocationOutline style={{color: textColor, fontSize: '16px'}} />
                                            <input type="text" placeholder="Location" style={{color: textColor}}/>
                                        </p>
                                        <button style={{color: textColor, backgroundColor: pageColor}}><FaRegTrashAlt style={{color: textColor, fontSize: '16px'}} /></button>
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
                </div>
            </section>
        </>
    );
};
