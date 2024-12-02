import { useSelector } from "react-redux";
import styles from "../LivePageCss/gallery.module.scss";
import { RootState } from "../../Store/appstore";
import { CiFolderOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FolderInterface } from "../../Typescript/gallery";

export const Gallery = () => {
  const [galleryImage, setGalleryImage] = useState<FolderInterface[]>([]);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    const savedImages = localStorage.getItem("gallery-photo");
    if (savedImages) {
      setGalleryImage(JSON.parse(savedImages));
    }
  }, []);

  return (
    <>
      <div className={styles["gallery"]}>
        <div className={styles["gallery-heading"]}>
          <h2 style={{ color: textColor }}>Gallery</h2>
          <div
            className={styles["gallery-heading-line"]}
            style={{ backgroundColor: pageColor }}
          ></div>
        </div>
        <div className={styles["gallery-filter"]}>
          <button
            className={styles["gallery-filter-all"]}
            style={{ color: pageColor, border: `0.8px solid ${pageColor}` }}
          >
            <CiFolderOn />
            All
          </button>
          <button
            className={styles["gallery-filter-custom"]}
            style={{ color: pageColor, border: `0.8px solid ${pageColor}` }}
          >
            kawasaki
          </button>
        </div>
        <div className={styles["gallery-images"]}>
          {galleryImage.map((image) => (
            <div className={styles["gallery-images-items"]}>
              <img src={image.imageURL} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
