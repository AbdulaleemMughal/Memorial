import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../../Css/FamilyTreeScss/FamilyTreeCards.module.scss";
import { LuTrash } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appstore";
import { FamilyCardInterface } from "../../Typescript/familyTree.interface";

type FatherCardProps = {
  iconStyle: React.CSSProperties;
};

export const FatherCard = ({ iconStyle }: FatherCardProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState<string>("Full Name");
  const [image, setImage] = useState<string>("");
  const [cardDetail, setCardDetail] = useState<FamilyCardInterface | null>(null);
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    setReloadPage(false);

    const details = localStorage.getItem("Father")
    if(details) {
        setCardDetail(JSON.parse(details));
    };
  }, []);

  useEffect(() => {
      if(!reloadPage){
        setCardDetail({ name, imgUrl: image });
        localStorage.setItem('Father', JSON.stringify(cardDetail))
    }
  }, [name, image]);

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
      <div className={styles["card"]}>
        <div className={styles["card-delete"]}>
          <LuTrash style={iconStyle} />
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
    </>
  );
};
