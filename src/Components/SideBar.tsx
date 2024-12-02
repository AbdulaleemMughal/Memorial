import { Drawer } from "antd";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../Css/sidebar.module.scss";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDownSLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { SidebarInterface } from "../Typescript/sidebar.interface";
import { CgColorPicker } from "react-icons/cg";
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
import { addText } from "../Store/TextSlice";
import { Link } from "react-router-dom";

//Types
type SideBarProps = {
  iconProp: React.CSSProperties;
  doticon: React.CSSProperties;
  palletteProp: React.CSSProperties;
  footerProp: React.CSSProperties;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideBar = ({
  iconProp,
  doticon,
  footerProp,
  openDrawer,
  setOpenDrawer,
}: SideBarProps) => {
  //hooks
  const pageInputRef = useRef<HTMLInputElement | null>(null);
  const backgroundRef = useRef<HTMLInputElement | null>(null);
  const fontRef = useRef<HTMLInputElement | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isOpenPagePalette, setIsOpenPagePalette] = useState<boolean>(false);
  const [isOpenBackgroundPalette, setIsOpenBackgroundPalette] =
    useState<boolean>(false);
  const [isOpenTextPalette, setIsOpenTextPalette] = useState<boolean>(false);
  const [isOpenFontPalette, setIsOpenFontPalette] = useState<boolean>(false);
  const [isPageColor, setIsPageColor] = useState<string>("black");
  const [isBackgroundColor, setIsBackgroundColor] = useState<string>("white");
  const [isTextColor, setIsTextColor] = useState<string>("black");
  const [items, setItems] = useState<SidebarInterface[]>(sidebarItems);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const dispatch = useDispatch();
  const pageColorSelect = useSelector(
    (store: RootState) => store.color.isColor
  );
  // const pageFontSelect = useSelector((store: RootState) => store.font.isFont);
  const backgroundColorSelect = useSelector(
    (store: RootState) => store.background.isBackground
  );
  const textColorSelect = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    setOpenDrawer(true);
    document.body.style.backgroundColor = backgroundColorSelect;
  }, []);

  //function

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

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (index: number) => {
    const newItems = [...items];
    const draggedItem = newItems.splice(draggingIndex!, 1)[0];
    newItems.splice(index, 0, draggedItem);
    setDraggingIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    localStorage.setItem("reorderedItems", JSON.stringify(items));
  };

  const handlePageColor = () => {
    if (pageInputRef.current) {
      pageInputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPageColor(e.target.value);
    dispatch(addColor(isPageColor))
  };

  const handleBackgroundColorChange = () => {
    if (backgroundRef.current) {
      backgroundRef.current.click();
    }
  };

  const handleBackgroundPalette = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBackgroundColor(e.target.value);
    dispatch(addBackground(isBackgroundColor))
  };

  const handleFontPicker = () => {
    if (fontRef.current) {
      fontRef.current.click();
    }
  };

  const handleFontChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTextColor(e.target.value);
    dispatch(addText(isTextColor));
  };


  return (
    <>
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
              <h2>Page Configurations</h2>
              <div
                className={styles["drawer-title-line"]}
                style={{ backgroundColor: pageColorSelect }}
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
                <p style={{ color: textColorSelect }}>
                  Re-order the different sections of the page:
                </p>
                {items.map((item, index) => (
                  <div
                    className={`${styles["drawer-content-list-items"]} ${
                      draggingIndex === index ? styles.dragging : ""
                    }`}
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                  >
                    <RxDragHandleDots2 style={doticon} />
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Second */}

          <div
            className={styles["drawer-content"]}
          >
            <div className={styles["drawer-content-dropdown"]}>
              <button>Page color</button>
              {!isOpenPagePalette ? (
                <RiArrowDownSLine style={iconProp} onClick={() => handlePage()} />
              ) : (
                <RiArrowUpSLine style={iconProp} onClick={() => handlePage()} />
              )}
            </div>
            {isOpenPagePalette && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: textColorSelect }}>Select page color:</p>
                <div className={styles["drawer-content-list-color"]}>
                  {pageColor.map((color: SidebarInterface) => (
                    <div
                      className={styles["drawer-content-list-color-lists"]}
                      key={color.id}
                      style={{ backgroundColor: color.color }}
                      onClick={() => {
                        // setIsPageColor(color.color)
                        dispatch(addColor(color.color));
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
                        onClick={handlePageColor}
                      >
                        <CgColorPicker />
                        <input
                        ref={pageInputRef}
                          type="color"
                          value={isPageColor}
                          onChange={handleChange}
                          className={styles["color-picker-circle-input"]}
                          style={{ display: "none" }}
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
            
          >
            <div className={styles["drawer-content-dropdown"]}>
              <button>Background color</button>
              {!isOpenBackgroundPalette ? (
                <RiArrowDownSLine style={iconProp} onClick={() => handleBackground()} />
              ) : (
                <RiArrowUpSLine style={iconProp} onClick={() => handleBackground()} />
              )}
            </div>
            {isOpenBackgroundPalette && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: textColorSelect }}>Select page color:</p>
                <div className={styles["drawer-content-list-color"]}>
                  {backgroundColor.map((color: SidebarInterface) => {
                    return (
                      <div
                        className={styles["drawer-content-list-color-lists"]}
                        key={color.id}
                        style={{ backgroundColor: color.color }}
                        onClick={() => {
                          dispatch(addBackground(color.color));
                          document.body.style.backgroundColor =
                            backgroundColorSelect;
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
                        style={{ backgroundColor: backgroundColorSelect }}
                        onClick={handleBackgroundColorChange}
                      >
                        <CgColorPicker style={{backgroundColor: 'black'}} />
                        <input
                        ref={backgroundRef}
                          type="color"
                          value={pageColorSelect}
                          onChange={handleBackgroundPalette}
                          className={styles["color-picker-circle-input"]}
                          style={{display: "none"}}
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
            
          >
            <div className={styles["drawer-content-dropdown"]}>
              <button>Text color</button>
              {!isOpenTextPalette ? (
                <RiArrowDownSLine style={iconProp} onClick={() => handleText()} />
              ) : (
                <RiArrowUpSLine style={iconProp} onClick={() => handleText()} />
              )}
            </div>
            {isOpenTextPalette && (
              <div className={styles["drawer-content-list"]}>
                <p style={{ color: textColorSelect }}>Select page color:</p>
                <div className={styles["drawer-content-list-color"]}>
                  {textColor.map((color) => {
                    return (
                      <div
                        className={styles["drawer-content-list-color-lists"]}
                        key={color.id}
                        style={{ backgroundColor: color.color }}
                        onClick={() => {
                          dispatch(addText(color.color));
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
                        onClick={handleFontPicker}
                      >
                        <CgColorPicker />
                        <input
                        ref={fontRef}
                          type="color"
                          value={isPageColor}
                          onChange={handleFontChange}
                          className={styles["color-picker-circle-input"]}
                          style={{ display: "none"}}
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
                <p style={{ color: textColorSelect }}>
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
            <Link to={'/edit-memorial'} target="_main">
            <button
              style={{
                backgroundColor: pageColorSelect,
                color: textColorSelect,
                width: '100%'
              }}
            >
              <BsBoxArrowUpRight style={footerProp} />
              Veiw Live Page
            </button>
            </Link>
            <button
              style={{
                backgroundColor: pageColorSelect,
                color: textColorSelect,
              }}
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