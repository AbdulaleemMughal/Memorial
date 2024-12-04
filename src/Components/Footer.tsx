import { useSelector } from "react-redux";
import styles from "../Css/footer.module.scss";
import { RootState } from "../Store/appstore";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Footer = () => {
  const textColor = useSelector((store: RootState) => store.text.isText);
  const pageColor = useSelector((store: RootState) => store.color.isColor);

  return (
    <>
      <div className={styles["footer"]}>
        <div className={styles["footer-content"]}>
          <p style={{ color: textColor }}>
            Made by <span style={{ color: pageColor }}>Abdul Aleem</span>
          </p>
          <div className={styles["footer-content-button"]}>
            <Link to={"/edit-memorial"} target="_main">
              <button style={{ backgroundColor: pageColor, color: textColor }}>
                <FaArrowUpRightFromSquare />
                Veiw Live Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};