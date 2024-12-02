import { FavouriteInterface } from "../Typescript/favourite";
import styles from "../Css/favoutie.module.scss";
import { BsTrash } from "react-icons/bs";
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { useState } from "react";

type favouriteContentProp = {
  t: FavouriteInterface;
  onDelete: (id: number) => void;
};

export const FavouriteContent = ({ onDelete, t }: favouriteContentProp) => {

  const fontStyle = useSelector((store: RootState) => store.font.isFont)
  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);


  const [nameInput, setNameInput] = useState<string>("");
  const [nameDesc, setNameDesc] = useState<string>("");
  return (
    <>
      <div className="col-lg-4">
        <div className={styles["favourite-description"]}>
          <div className={styles["favourite-description-card"]}>
            <div className={styles["favourite-description-card-delete"]}>
              <BsTrash
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => onDelete(t.id)}
              />
            </div>
            <div className={styles["favourite-description-card-input"]}>
              <h6>
                <LiaQuoteLeftSolid
                  style={{ fontSize: "16px", color: textColor }}
                />
                <input
                  type="text"
                  placeholder="What was {firstname}'s favorite ....."
                  style={{ color: textColor, fontWeight: fontStyle }}
                  value={t.name}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    localStorage.setItem("favourite-name", nameInput);
                  }}
                />
              </h6>
            </div>
            <div className={styles["favourite-description-card-desc"]}>
              <p>
                <textarea
                  rows={2}
                  placeholder="Your Response Here"
                  style={{ color: textColor, fontWeight: fontStyle }}
                  value={t.desc}
                  onChange={(e) => {
                    setNameDesc(e.target.value);
                    localStorage.setItem("favourite-desc", nameDesc);
                  }}
                ></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
