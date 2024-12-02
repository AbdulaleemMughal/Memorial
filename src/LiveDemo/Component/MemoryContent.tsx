import { useSelector } from "react-redux";
import styles from '../LivePageCss/momoeryContent.module.scss'
import { useEffect, useState } from "react";
import { ImageInterface, MemoryInterface } from "../../Typescript/memory";
import { RootState } from "../../Store/appstore";

type MemoryContentProps = {
    data:  MemoryInterface;
    images: ImageInterface[];
};

export const MemoryContent = ({ data, images }: MemoryContentProps) => {

    const [image, setImage] = useState<ImageInterface[]>([]);

  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    setImage(images);
    localStorage.setItem('content-image', JSON.stringify(image));
    const savedImage = JSON.parse(localStorage.getItem('content-image') || '[]');
    if(savedImage) {
        setImage(savedImage);
    }
    console.log(image);
  }, [])

console.log(images);

  return (
    <>
      <div className={styles["memory-card"]}>
        <div className={styles["memory-card-header"]}>
          <div className={styles["memory-card-header-date"]} style={{color: textColor}}>
            November 7, 2024
          </div>
        </div>
        <h2>{data.message}</h2>
        <div className={styles["memory-card-name"]}>
            <h3 style={{color: textColor}}>{data.name}</h3>
        </div>
        <div className={styles["memory-card-images"]}>
            {
                images.map((i) => (
                    <img src={i.url} key={i.id} />

                ))
            }
        </div>
      </div>
      
    </>
  );
};
