import { Drawer } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../Css/sidebar.module.scss";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDownSLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { BsBoxArrowUpRight } from "react-icons/bs";
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
import { addText } from "../Store/TextSlice";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPageColor(e.target.value);
  };

  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBackgroundColor(e.target.value);

    document.body.style.backgroundColor = backgroundColorSelect;
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTextColor(e.target.value);
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
                      >
                        <input
                          type="color"
                          value={pageColorSelect}
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
                <p style={{ color: textColorSelect }}>Select page color:</p>
                <div className={styles["drawer-content-list-color"]}>
                  {textColor.map((color) => {
                    return (
                      <div
                        className={styles["drawer-content-list-color-lists"]}
                        key={color.id}
                        style={{ backgroundColor: color.color }}
                        onClick={() => {
                          // setIsTextColor(color.color);
                          dispatch(addText(color.color));
                          // document.body.style.color = textColorSelect;
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
            <button
              style={{
                backgroundColor: pageColorSelect,
                color: textColorSelect,
              }}
            >
              <BsBoxArrowUpRight style={footerProp} />
              Veiw Live Page
            </button>
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
