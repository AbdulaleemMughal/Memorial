import styles from "../Css/banner.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SideBar } from "./SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { IoImageOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import { Profile } from "./Profile";

export const Banner = () => {
  // -------Hooks --------------
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  const pageColorSelect = useSelector(
    (store: RootState) => store.color.isColor
  );
  const textColorSelect = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    const storedImage = localStorage.getItem("banner-image");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem("banner-image", base64String);
      };
      reader.readAsDataURL(file); 
    }
  };

  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <>
      <SideBar
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        iconProp={{ fontSize: "27px", cursor: "pointer" }}
        doticon={{ fontSize: "16px", fontWeight: 500 }}
        palletteProp={{ fontSize: "22px" }}
        footerProp={{ fontSize: "16px", margin: "0px 5px" }}
      />

      <div
        className={styles["banner"]}
        style={{
          backgroundImage: image ? `url(${image})` : "none",}}
      >
        <div className={styles["banner-container"]}>
          <div className={styles["banner-container-button1"]}>
            <button
              onClick={() => setOpenDrawer(!openDrawer)}
              style={{
                backgroundColor: pageColorSelect,
                color: textColorSelect,
              }}
              className={styles["banner-container-button1-button"]}
            >
              <BsSliders style={{ fontSize: "13px" }} />
              Page Setting
            </button>
          </div>
          <div className={styles["banner-container-button2"]}>
            <button
              style={{
                backgroundColor: pageColorSelect,
                color: textColorSelect,
              }}
              className={styles["banner-container-button2-button"]}
              onClick={changeImage}
            >
              <IoImageOutline />
              Change Image
            </button>
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className={styles["banner-container-button2-input"]}
            />
          </div>
        </div>
      </div>
      <Profile iconStyles={{fontSize: '18px', color: pageColorSelect}} />
    </>
  );
};
