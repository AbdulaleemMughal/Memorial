import React from "react";
import styles from "../Css/header.module.scss";
import { header } from "../Typescript/header";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { MyStory } from "./MyStory";

type HeaderProps = {
  iconStyles: React.CSSProperties;
};

export const Header = ({ iconStyles }: HeaderProps) => {
  //----------hooks---------
  const textColor = useSelector((store: RootState) => store.text.isText);
  const fontSelect = useSelector((store: RootState) => store.font.isFont);

  return (
    <>
      <div className={styles["tab-header"]}>
        <div className="container">
          <div className={styles["tab-header-nav"]}>
            {header.map((item) => (
              <div className={styles["tab-header-nav-item"]}>
                <item.icon style={iconStyles} />
                <p style={{ color: textColor, fontWeight: fontSelect }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <MyStory />
      </div>
    </>
  );
};
