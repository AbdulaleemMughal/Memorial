import { useSelector } from "react-redux";
import styles from "../Css/memoryContent.module.scss";
import { FaTrash } from "react-icons/fa";
import { RootState } from "../Store/appstore";
import { ImageInterface, MemoryInterface } from "../Typescript/memory";
import { useEffect, useState } from "react";

type MemoryContentProps = {
    data:  MemoryInterface;
    onDelete: (id: number) => void;
    images: ImageInterface[];
};

export const MemoryContent = ({ data, onDelete, images }: MemoryContentProps) => {

    const [memoryImages, setMemoryImages] = useState<ImageInterface[]>([]);

  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    localStorage.setItem('content-MemoryImages', JSON.stringify(memoryImages));
    const savedImage = JSON.parse(localStorage.getItem('content-MemoryImages') || '[]');
    if(savedImage) {
        setMemoryImages(savedImage);
    }
  }, []);

  return (
    <>
      <div className={styles["memory-card"]}>
        <div className={styles["memory-card-header"]}>
          <div className={styles["memory-card-header-date"]} style={{color: textColor}}>
            November 7, 2024
          </div>
          <div className={styles["memory-card-header-content"]}>
            <div className={styles["memory-card-header-content-select"]}>
              <select>
                <option value="pending">Pending</option>
                <option value="selected">Selected</option>
              </select>
            </div>
            <div className={styles["memory-card-header-content-delete"]}>
              <FaTrash style={{ color: textColor, cursor: "pointer" }} onClick={() => onDelete(data.id)}/>
            </div>
          </div>
        </div>
        <h2>{data.message}</h2>
        <div className={styles["memory-card-name"]}>
            <h3 style={{color: textColor}}>{data.name}</h3>
        </div>
        <div className={styles["memory-card-images"]}>
            {
                memoryImages.map((i) => (
                    <img src={i.url} key={i.id} />

                ))
            }
        </div>
      </div>
      
    </>
  );
};
