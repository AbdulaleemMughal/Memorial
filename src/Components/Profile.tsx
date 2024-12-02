import { IoImageOutline } from "react-icons/io5";
import styles from "../Css/profile.module.scss";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LuCalendarDays } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import dayjs, { Dayjs } from "dayjs";
import { Header } from "./Header";

type ProfileProps = {
  iconStyles: React.CSSProperties;
};

export const Profile = ({ iconStyles }: ProfileProps) => {
  // ------hooks-----------
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [livePreveiw, setLivePreveiw] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [fName, setFName] = useState<string>("");
  const [mName, setMName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<string>("");
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textSelect = useSelector((store: RootState) => store.text.isText);
  const fontSelect = useSelector((store: RootState) => store.font.isFont);

  useEffect(() => {
    setReloadPage(false);
    const storedImage = localStorage.getItem("profile-image");
    if (storedImage) {
      setImage(storedImage);
    }

    setFName(localStorage.getItem("first-name") || "");
    setMName(localStorage.getItem("middle-name") || "");
    setLName(localStorage.getItem("last-name") || "");
    setLocation(localStorage.getItem("location") || "");

    const expiry_Date = localStorage.getItem('expiryDate');
    if(expiry_Date) {
      setExpiryDate(dayjs(expiry_Date));
    };

    const birth_Date = localStorage.getItem('birthDate');
    if(birth_Date) {
      setBirthDate(dayjs(birth_Date));
    };
  }, []);

  useEffect(() => {

    if(!reloadPage){
      fName!="" && localStorage.setItem("first-name", fName);
    mName!="" && localStorage.setItem("middle-name", mName);
    location!="" && localStorage.setItem("location", location);
    lName!="" && localStorage.setItem("last-name", lName);
    }
    
  }, [fName, mName, lName, location]);

  // -------Function----------

  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };


  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem("profile-image", base64String);
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleBirth = (newDate: Dayjs | null) => {
    setExpiryDate(newDate);
    if (newDate) {
      localStorage.setItem('birthDate', newDate.toISOString());
    } else {
      localStorage.removeItem('brithDate'); 
    }
  };

  const handleExpiry = (newDate: Dayjs | null) => {
    setExpiryDate(newDate);
    if (newDate) {
      localStorage.setItem('expiryDate', newDate.toISOString());
    } else {
      localStorage.removeItem('expiryDate'); 
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={styles["user-header"]}>
          <div className={styles["profile"]}>
            <img src={`${image}`} />
            <button
              className={styles["profile-button"]}
              style={{ backgroundColor: pageColor, color: textSelect }}
              onClick={changeImage}
            >
              <IoImageOutline />
              Change Image
            </button>
            <input ref={imageRef} type="file" accept="image/*" onChange={handleImage} />
          </div>
          <div className={styles["content"]}>
            <div className={styles["content-input"]}>
              <input
                type="text"
                placeholder="F Name"
                name="f-name"
                style={{ color: textSelect, fontWeight: fontSelect }}
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
              <input
                type="text"
                placeholder="M Name"
                name="m-name"
                style={{ color: textSelect, fontWeight: fontSelect }}
                value={mName}
                onChange={(e) => setMName(e.target.value)}
              />
              <input
                type="text"
                placeholder="L Name"
                name="l-name"
                style={{ color: textSelect, fontWeight: fontSelect }}
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
                value={expiryDate}
                onChange={handleExpiry}
              />
            </div>
            <div className={styles["content-location"]}>
              <IoLocationOutline style={iconStyles} />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ color: textSelect, fontWeight: fontSelect }}
              />
            </div>
          </div>
        </div>
      </LocalizationProvider>
      <Header iconStyles={{ fontSize: "22px", color: pageColor }} />
    </>
  );
};
