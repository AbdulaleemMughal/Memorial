import { useSelector } from "react-redux";
import { RootState } from "../../Store/appstore";
import styles from '../../Css/header.module.scss';
import { header } from "../../Typescript/header";
export const Header = () => {
    //----------hooks---------
    
    const pageColor = useSelector((store: RootState) => store.color.isColor)
    const textColor = useSelector((store: RootState) => store.text.isText);
    const fontSelect = useSelector((store: RootState) => store.font.isFont);
    
    
    return (
        <>
      <div className={styles["tab-header"]}>
        <div className="container">
          <div className={styles["tab-header-nav"]}>
            {header.map((item) => (
              <div className={styles["tab-header-nav-item"]}>
                <item.icon style={{ fontSize: "22px", color: pageColor }}/>
                <p style={{ color: textColor, fontWeight: fontSelect }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
      </div>
    </>
    );
};