import React, { ChangeEvent, useRef } from "react";
import styles from "../../Css/FamilyTreeScss/FamilyTreeCards.module.scss";
import { LuTrash } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appstore";
import { CardInterface } from "../../Typescript/familyTree.interface";

type CardProps = {
  iconStyle: React.CSSProperties;
  data: CardInterface;
  onUpdate: (id: number, updatedData: Partial<CardInterface>) => void;
  onDelete: (id: number) => void;
};

export const Card = ({ iconStyle, data, onUpdate, onDelete }: CardProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const textColor = useSelector((store: RootState) => store.text.isText);
  const pageColor = useSelector((store: RootState) => store.color.isColor);

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
        onUpdate(data.id, { imgUrl: base64String }); // Update image URL in the parent state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles["card"]} style={{ backgroundColor: pageColor }}>
      <div className={styles["card-delete"]}>
        <LuTrash style={iconStyle} onClick={() => onDelete(data.id)} />
      </div>
      <div className={styles["card-image"]}>
        <div className={styles["card-image-pic"]}>
          {data.imgUrl ? (
            <img onClick={handleImage} src={data.imgUrl} alt="Card" />
          ) : (
            <IoPersonCircleSharp
              style={{ height: "90px", width: "90px", cursor: "pointer" }}
              onClick={handleImage}
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className={styles["card-name"]}>
        <input
          type="text"
          style={{ color: textColor }}
          value={data.name}
          onChange={(e) => {
            const newName = e.target.value;
            onUpdate(data.id, { name: newName }); // Update name in the parent state
          }}
        />
      </div>
    </div>
  );
};
