import { Drawer } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../Css/sidebar.module.scss";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDownSLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { BsBoxArrowUpRight } from "react-icons/bs";
// import { FaArrowRightLong } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import { SidebarInterface } from "../Typescript/sidebar.interface";
import {
  sidebarItems,
  pageColor,
  backgroundColor,
  textColor,
} from "../Typescript/sidebar";
import { RiArrowUpSLine } from "react-icons/ri";
import { addColor } from "../Store/ColorSlice";
import { useDispatch, useSelector } from "react-redux";
import { addFont } from "../Store/FontSlice";
import { RootState } from "../Store/appstore";
import { addBackground } from "../Store/BackgroundSlice";

//Types
type SideBarProps = {
  iconProp: React.CSSProperties;
  doticon: React.CSSProperties;
  palletteProp: React.CSSProperties;
  footerProp: React.CSSProperties;
};

export const SideBar = ({
  iconProp,
  doticon,
  palletteProp,
  footerProp,
}: SideBarProps) => {
  //hooks
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isOpenPagePalette, setIsOpenPagePalette] = useState<boolean>(false);
  const [isOpenBackgroundPalette, setIsOpenBackgroundPalette] =
    useState<boolean>(false);
  const [isOpenTextPalette, setIsOpenTextPalette] = useState<boolean>(false);
  const [isOpenFontPalette, setIsOpenFontPalette] = useState<boolean>(false);
  const [isPageColor, setIsPageColor] = useState<string>("black");
  const [isBackgroundColor, setIsBackgroundColor] = useState<string>("white");
  const [isTextColor, setIsTextColor] = useState<string>("black");

  const dispatch = useDispatch();
  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const pageFont = useSelector((store: RootState) => store.font.isFont);
  const backgroundColor = useSelector((store: RootState) => store.background.isBackground);

  useEffect(() => {
    setOpenDrawer(true);
  }, []);

  //function
  const handleDrawer = () => {
    setOpenDrawer(true);
  };

  const onclose = () => {
    setOpenDrawer(false);
  };

  const handleSection = () => {
    setIsOpenDropdown(!isOpenDropdown);
    setIsOpenPagePalette(false);
    setIsOpenBackgroundPalette(false);
    setIsOpenTextPalette(false);
    setIsOpenFontPalette(false);
  };

  const handlePage = () => {
    setIsOpenPagePalette(!isOpenPagePalette);
    setIsOpenBackgroundPalette(false);
    setIsOpenTextPalette(false);
    setIsOpenFontPalette(false);
    setIsOpenDropdown(false);
  };

  const handleBackground = () => {
    setIsOpenBackgroundPalette(!isOpenBackgroundPalette);
    setIsOpenPagePalette(false);
    setIsOpenTextPalette(false);
    setIsOpenFontPalette(false);
    setIsOpenDropdown(false);
  };

  const handleText = () => {
    setIsOpenTextPalette(!isOpenTextPalette);
    setIsOpenPagePalette(false);
    setIsOpenBackgroundPalette(false);
    setIsOpenFontPalette(false);
    setIsOpenDropdown(false);
  };

  const handleFont = () => {
    setIsOpenFontPalette(!isOpenFontPalette);
    setIsOpenPagePalette(false);
    setIsOpenBackgroundPalette(false);
    setIsOpenTextPalette(false);
    setIsOpenDropdown(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPageColor(e.target.value);
  };

  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBackgroundColor(e.target.value);

    document.body.style.backgroundColor = isBackgroundColor;
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTextColor(e.target.value);
  };

  return (
    <>
      <button onClick={handleDrawer}>Open</button>
      <Drawer
        open={openDrawer}
        onClose={onclose}
        placement="left"
        closeIcon={false}
        size="default"
      >
        <div className={styles.container}>
          <div className={styles["drawer"]}>
            <div className={styles["drawer-title"]}>
              <h2 style={{ color: pageColor, fontWeight: pageFont }}>
                Page Configurations
              </h2>
              <div
                className={styles["drawer-title-line"]}
                style={{ backgroundColor: isPageColor }}
              ></div>
            </div>
            <RxCross2 style={iconProp} onClick={() => setOpenDrawer(false)} />
          </div>

          {/* First */}
          <div className={styles["drawer-content"]}>
            <div
              className={styles["drawer-content-dropdown"]}
              onClick={() => handleSection()}
            >
              <button>Re-order section</button>
              {!isOpenDropdown ? (
                <RiArrowDownSLine style={iconProp} />
              ) : (
                <RiArrowUpSLine style={iconProp} />
              )}
            </div>
            {isOpenDropdown && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: isTextColor }}>
                  Re-order the different sections of the page:
                </p>
                {sidebarItems.map((item) => {
                  return (
                    <div
                      className={styles["drawer-content-list-items"]}
                      key={item.id}
                    >
                      <RxDragHandleDots2 style={doticon} />
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Second */}

          <div
            className={styles["drawer-content"]}
            onClick={() => handlePage()}
          >
            <div className={styles["drawer-content-dropdown"]}>
              <button>Page color</button>
              {!isOpenPagePalette ? (
                <RiArrowDownSLine style={iconProp} />
              ) : (
                <RiArrowUpSLine style={iconProp} />
              )}
            </div>
            {isOpenPagePalette && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: isTextColor }}>Select page color:</p>
                <div className={styles["drawer-content-list-color"]}>
                  {pageColor.map((color: SidebarInterface) => (
                    <div
                      className={styles["drawer-content-list-color-lists"]}
                      key={color.id}
                      style={{ backgroundColor: color.color }}
                      onClick={() => {
                        dispatch(addColor(color.color)); // Dispatch action to update color
                      }}
                    ></div>
                  ))}
                  <div
                    className={
                      styles["drawer-content-list-color-lists-palette"]
                    }
                  >
                    <div className={styles["color-picker"]}>
                      <div
                        className={styles["color-picker-circle"]}
                        style={{ backgroundColor: isPageColor }}
                      >
                        <input
                          type="color"
                          value={isPageColor}
                          onChange={handleChange}
                          className={styles["color-picker-circle-input"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Third */}

          <div
            className={styles["drawer-content"]}
            onClick={() => handleBackground()}
          >
            <div className={styles["drawer-content-dropdown"]}>
              <button>Background color</button>
              {!isOpenBackgroundPalette ? (
                <RiArrowDownSLine style={iconProp} />
              ) : (
                <RiArrowUpSLine style={iconProp} />
              )}
            </div>
            {isOpenBackgroundPalette && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: isTextColor }}>Select page color:</p>
                <div className={styles["drawer-content-list-color"]}>
                  {backgroundColor.map((color: SidebarInterface) => {
                    return (
                      <div
                        className={styles["drawer-content-list-color-lists"]}
                        key={color.id}
                        style={{ backgroundColor: color.color }}
                        onClick={() => {
                          // setIsBackgroundColor(color.color);
                          dispatch(addBackground(color.color));
                          document.body.style.backgroundColor =
                            backgroundColor;
                        }}
                      ></div>
                    );
                  })}
                  <div
                    className={
                      styles["drawer-content-list-color-lists-palette"]
                    }
                  >
                    <div className={styles["color-picker"]}>
                      <div
                        className={styles["color-picker-circle"]}
                        style={{ backgroundColor: isBackgroundColor }}
                      >
                        <input
                          type="color"
                          value={isPageColor}
                          onChange={handleBackgroundChange}
                          className={styles["color-picker-circle-input"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fourth */}

          <div
            className={styles["drawer-content"]}
            onClick={() => handleText()}
          >
            <div className={styles["drawer-content-dropdown"]}>
              <button>Text color</button>
              {!isOpenTextPalette ? (
                <RiArrowDownSLine style={iconProp} />
              ) : (
                <RiArrowUpSLine style={iconProp} />
              )}
            </div>
            {isOpenTextPalette && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: isTextColor }}>Select page color:</p>
                <div className={styles["drawer-content-list-color"]}>
                  {textColor.map((color) => {
                    return (
                      <div
                        className={styles["drawer-content-list-color-lists"]}
                        key={color.id}
                        style={{ backgroundColor: color.color }}
                        onClick={() => {
                          setIsTextColor(color.color);
                        }}
                      ></div>
                    );
                  })}
                  <div
                    className={
                      styles["drawer-content-list-color-lists-palette"]
                    }
                  >
                    <div className={styles["color-picker"]}>
                      <div
                        className={styles["color-picker-circle"]}
                        style={{ backgroundColor: isBackgroundColor }}
                      >
                        <input
                          type="color"
                          value={isPageColor}
                          onChange={handleTextChange}
                          className={styles["color-picker-circle-input"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fifth */}

          <div
            className={styles["drawer-content"]}
            onClick={() => handleFont()}
          >
            <div className={styles["drawer-content-dropdown"]}>
              <button>Font Weight</button>
              {!isOpenFontPalette ? (
                <RiArrowDownSLine style={iconProp} />
              ) : (
                <RiArrowUpSLine style={iconProp} />
              )}
            </div>
            {isOpenFontPalette && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: isTextColor }}>
                  Choose the default "weight" for your text:
                </p>
                <div className={styles["drawer-content-list-button"]}>
                  <button
                    style={{ backgroundColor: isPageColor }}
                    onClick={() => {
                      dispatch(addFont("normal"));
                    }}
                  >
                    Light
                  </button>
                  <button
                    style={{ backgroundColor: isPageColor }}
                    onClick={() => {
                      dispatch(addFont("bold"));
                    }}
                  >
                    Bold
                  </button>
                </div>
              </div>
            )}
          </div>

          <footer className={styles["footer"]}>
            <button
              style={{ backgroundColor: isPageColor, color: isTextColor }}
            >
              <BsBoxArrowUpRight style={footerProp} />
              Veiw Live Page
            </button>
            <button
              style={{ backgroundColor: isPageColor, color: isTextColor }}
            >
              Register Page
              <BsArrowRight style={footerProp} />
            </button>
          </footer>
        </div>
      </Drawer>
    </>
  );
};
