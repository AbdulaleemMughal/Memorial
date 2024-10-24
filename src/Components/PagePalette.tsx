import styles from '../Css/sidebar.module.scss';
import { useState } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";
import { RxDragHandleDots2 } from "react-icons/rx";
import { pageColor } from '../Typescript/sidebar';

type SideBarProps = {
    iconProp: React.CSSProperties;
    doticon: React.CSSProperties;
  };

export const PagePalette = ({ iconProp, doticon }: SideBarProps) => {
    const [isOpenPagePalette, setIsOpenPagePalette] = useState<boolean>(false);

    return (
        <>
            <div className={styles["drawer-content"]}>
          <div
            className={styles["drawer-content-dropdown"]}
            onClick={() => setIsOpenPagePalette(!isOpenPagePalette)}
          >
            <button>Re-order section</button>
            <RiArrowDownSLine style={iconProp} />
          </div>
          {/* Dropdown */}
          {isOpenPagePalette && (
            <div
              className={styles["drawer-content-list"]}
            >
              <p>Re-order the different sections of the page:</p>
              {pageColor.map((item) => {
                return (
                  <div
                    className={styles["drawer-content-list-items"]}
                    key={item.id}
                  >
                    <RxDragHandleDots2 style={doticon} />
                    <p>{item.color}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </>
    )
};