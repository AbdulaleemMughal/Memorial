import { IoImageOutline } from "react-icons/io5";
import styles from "../Css/profile.module.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LuCalendarDays } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import dayjs, { Dayjs } from "dayjs";
import { textColor } from "../Typescript/sidebar";

type ProfileProps = {
  iconStyles: React.CSSProperties;
};

export const Profile = ({ iconStyles }: ProfileProps) => {
  // ------hooks-----------
  const [livePreveiw, setLivePreveiw] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [fName, setFName] = useState<string>("");
  const [mName, setMName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textSelect = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    const profile = JSON.stringify(localStorage.getItem("profile-image"));
    setLivePreveiw(profile);

    setFName(localStorage.getItem("first-name") || "");
    setMName(localStorage.getItem("middle-name") || "");
    setLName(localStorage.getItem("last-name") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("first-name", fName);
    localStorage.setItem("middle-name", mName);
    localStorage.setItem("last-name", lName);
  }, [fName, mName, lName]);

  // -------Function----------
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setLivePreveiw(previewURL);
      localStorage.setItem("profile-image", livePreveiw);
    }
  };

  const handleBirth = (date: Dayjs | null) => {
    setBirthDate(date);
    if(date){
        localStorage.setItem("birth-date", date.toISOString());
    }
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={styles["user-header"]}>
          <div className={styles["profile"]}>
            <img src={`${livePreveiw}`} />
            <button
              className={styles["profile-button"]}
              style={{ backgroundColor: pageColor, color: textSelect }}
            >
              <IoImageOutline />
              Change Image
            </button>
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>
          <div className={styles["content"]}>
            <div className={styles["content-input"]}>
              <input
                type="text"
                placeholder="F Name"
                name="f-name"
                style={{color: textSelect}}
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
              <input
                type="text"
                placeholder="M Name"
                name="m-name"
                style={{color: textSelect}}
                value={mName}
                onChange={(e) => setMName(e.target.value)}
              />
              <input
                type="text"
                placeholder="L Name"
                name="l-name"
                style={{color: textSelect}}
                value={lName}
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
            <div className={styles["content-date"]}>
              <LuCalendarDays style={iconStyles} />
              <MobileDatePicker
                label="Date of Birth"
                value={birthDate}
                onChange={handleBirth}
              />
              <div className={styles["content-date-dot"]}>-</div>
              <MobileDatePicker
                label="Date of Birth"
                defaultValue={dayjs("2022-04-17")}
              />
            </div>
            <div className={styles["content-location"]}>
              <IoLocationOutline style={iconStyles} />
              <input type="text" placeholder="Location" />
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};
