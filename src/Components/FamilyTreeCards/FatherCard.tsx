import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "../../Css/FamilyTreeScss/FamilyTreeCards.module.scss";
import { LuTrash } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appstore";
import { FamilyCardInterface } from "../../Typescript/familyTree.interface";
import { FaPlus } from "react-icons/fa6";

type GrandfatherCardProps = {
  iconStyle: React.CSSProperties;
};

export const FatherCard = ({ iconStyle }: GrandfatherCardProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState<string>("Full Name");
  const [image, setImage] = useState<string>("");
  const [cardDetail, setCardDetail] = useState<FamilyCardInterface | null>(
    null
  );
  const [showGrandFatherCard, setShowGrandFatherCard] =
    useState<boolean>(true);
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    setReloadPage(false);
    const storedValue = localStorage.getItem("Show-Father");
    if (storedValue !== null) {
      setShowGrandFatherCard(JSON.parse(storedValue));
    };

    // fetching detail of card
    const details = localStorage.getItem("Father");
    if (details) {
      setCardDetail(JSON.parse(details));
    }
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      setCardDetail({ name, imgUrl: image });
      localStorage.setItem("Father", JSON.stringify(cardDetail));
      localStorage.setItem("Show-Father", JSON.stringify(showGrandFatherCard));
    }
  }, [name, image, showGrandFatherCard]);

  const handleImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {!showGrandFatherCard ? (
        <div className={styles["card"]}>
          <div className={styles["card-delete"]}>
            <LuTrash
              style={iconStyle}
              onClick={() => {
                setShowGrandFatherCard(true);
                localStorage.removeItem("Grand-Father");
              }}
            />
          </div>
          <div className={styles["card-image"]}>
            <div className={styles["card-image-pic"]}>
              {cardDetail?.imgUrl !== '' ? (
                <img onClick={handleImage} src={cardDetail?.imgUrl} />
              ) : (
                <IoPersonCircleSharp
                  style={{ height: "90px", width: "90px", cursor: "pointer" }}
                  onClick={handleImage}
                />
              )}

              <input
                type="file"
                accept="*/image"
                ref={imageRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className={styles["card-name"]}>
            <input
              type="text"
              style={{ color: textColor }}
              value={cardDetail?.name}
              onChange={(e) => {
                const newName = e.target.value;
                setName(newName);
              }}
            />
          </div>
        </div>
      ) : (
        <AddCard
          setCardDetail={setCardDetail}
          setShowGrandFatherCard={setShowGrandFatherCard}
        />
      )}
    </>
  );
};

type AddCardProps = {
  setShowGrandFatherCard: Dispatch<SetStateAction<boolean>>;
  setCardDetail: Dispatch<SetStateAction<FamilyCardInterface | null>>;
};

export const AddCard = ({
  setShowGrandFatherCard,
  setCardDetail,
}: AddCardProps) => {

  const pageColor = useSelector((store: RootState) => store.color.isColor);

  return (
    <>
      <div
        className={styles["cards"]}
        style={{ backgroundColor: pageColor }}
        onClick={() => {
          setShowGrandFatherCard(false);
          setCardDetail(null);
        }}
      >
        <div className={styles["card-add"]}>
          <FaPlus
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              fontSize: "40px",
              color: "black",
              padding: "11px",
            }}
          />
        </div>
      </div>
    </>
  );
};
