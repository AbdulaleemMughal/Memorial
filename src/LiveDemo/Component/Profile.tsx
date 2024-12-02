import { useEffect, useState } from "react";
import styles from "../LivePageCss/profile.module.scss";
import { LuCalendarDays } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appstore";
import dayjs, { Dayjs } from "dayjs";

export const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [fName, setFName] = useState<string>("");
  const [mName, setMName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);

  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    const Profile_Image = localStorage.getItem("profile-image");
    if(Profile_Image) {
    setProfileImage(Profile_Image);
    }


    setFName(localStorage.getItem("first-name") || "");
    setMName(localStorage.getItem("middle-name") || "");
    setLName(localStorage.getItem("last-name") || "");
    setLocation(localStorage.getItem("location") || "");
    const birthDateStr = localStorage.getItem("birth-date");
    if (birthDateStr) {
      setBirthDate(dayjs(birthDateStr));
    }
    const expiryDateStr = localStorage.getItem("expiry-date");
    if (expiryDateStr) {
      setExpiryDate(dayjs(expiryDateStr));
    }
  }, []);

  return (
    <>
      <div className={styles["user-header"]}>
        <div className={styles["user-header-profile"]}>
          <img src={profileImage} />
        </div>
        <div className={styles["user-header-content"]}>
          <h1 style={{ color: textColor }}>
            {fName}
            {mName} {lName}
          </h1>
          <p style={{ color: textColor }}>
            <LuCalendarDays />
            {birthDate ? birthDate.format("YYYY-MM-DD") : "N/A"} •{" "}
            {expiryDate ? expiryDate.format("YYYY-MM-DD") : "N/A"}
          </p>
          <p style={{ color: textColor }}>
            <IoLocationOutline />
            {location}
          </p>
        </div>
      </div>
    </>
  );
};
