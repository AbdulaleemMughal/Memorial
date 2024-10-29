import styles from "../Css/banner.module.scss";
import { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { IoImageOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import { Profile } from "./Profile";

export const Banner = () => {
  // -------Hooks --------------
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [livePreveiw, setLivePreveiw] = useState<string>("");

  const pageColorSelect = useSelector(
    (store: RootState) => store.color.isColor
  );
  const textColorSelect = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    const storedImage = localStorage.getItem("banner-image");
    if (storedImage) {
      setLivePreveiw(storedImage);
    }
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setLivePreveiw(previewURL);
      localStorage.setItem("banner-image", previewURL);
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
          backgroundImage: livePreveiw ? `url(${livePreveiw})` : "none",}}
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
            >
              <IoImageOutline />
              Change Image
            </button>
            <input
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
