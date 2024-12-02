import styles from "../Css/gallery.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { Switch } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiFolderOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { SlTrash } from "react-icons/sl";
import { FolderInterface } from "../Typescript/gallery";
import { Images } from "./Images";
import { IoImageOutline } from "react-icons/io5";
import { FamilyTree } from "./FamilyTree";

export const Gallery = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [galleryInput, setGalleryInput] = useState<string>("");
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [folders, setFolders] = useState<FolderInterface[]>([]);
  const [reloadPage, setReloadPage] = useState<boolean>(true);
  const [images, setImages] = useState<FolderInterface[]>([]);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    setReloadPage(false);

    setGalleryInput(localStorage.getItem('gallery-Input') || ""); 

    const gallerySwitch = localStorage.getItem("gallery-switch");
    if (gallerySwitch) {
      setIsSwitchOn(JSON.parse(gallerySwitch));
    }

    const savedFolders = localStorage.getItem("folders");
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }

    const savedImages = localStorage.getItem("gallery-photo");
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      localStorage.setItem("folders", JSON.stringify(folders));
      localStorage.setItem("gallery-photo", JSON.stringify(images));
    }
  }, [folders, images]);

  const handleAddFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: "New Folder",
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const updateFolderName = (id: number, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder))
    );
  };

  const deleteFolder = (id: number) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

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
        const newImage: FolderInterface = {
          id: images.length + 1,
          imageURL: base64String,
        };
        const updatedGallery = [...images, newImage];
        setImages(updatedGallery);
        // console.log(images);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: number) => {
  let a = confirm('Are you sure you want to delete this Image?')
    if(a) {
      setImages((prev) => prev.filter((i) => i.id !== id));
    }
};

  return (
    <>
      <div className={styles["gallery"]}>
        <div className={styles["gallery-content"]}>
          <div className={styles["gallery-content-input"]}>
            <input
              type="text"
              placeholder="Gallery"
              style={{ color: textColor }}
              value={galleryInput}
              onChange={(e) => {
                const newGalleryInput = e.target.value;
                setGalleryInput(newGalleryInput);
                localStorage.setItem("gallery-Input", newGalleryInput);
              }}
            />
            <div className={styles["gallery-content-input-line"]}></div>
          </div>
          <div className={styles["gallery-content-switch"]}>
            <Switch
              checked={isSwitchOn}
              onChange={(event) => {
                const newSwitchState = event.target.checked;
                setIsSwitchOn(newSwitchState);
                localStorage.setItem(
                  "gallery-switch",
                  JSON.stringify(newSwitchState)
                );
              }}
              color="secondary"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: pageColor,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  color: pageColor,
                },
                "& .MuiSwitch-track": {
                  color: pageColor,
                },
              }}
            />
            <p style={{ color: pageColor }}>Enable</p>
          </div>
        </div>

        {isSwitchOn && (
          <div className={styles["gallery-description"]}>
            <div className={styles["gallery-description-folders"]}>
              <button
                className={styles["gallery-description-folders-button"]}
                style={{
                  border: `0.8px solid ${pageColor}`,
                  color: pageColor,
                }}
              >
                <CiFolderOn />
                All
              </button>
              {folders.map((f) => (
                <div
                  key={f.id}
                  className={styles["gallery-description-folders-new"]}
                  style={{ border: `0.8px solid ${pageColor}` }}
                >
                  <input
                    type="text"
                    placeholder="New folder"
                    style={{ color: textColor }}
                    value={f.name}
                    onChange={(e) => updateFolderName(f.id, e.target.value)}
                  />
                  <SlTrash
                    style={{ color: pageColor, cursor: 'pointer' }}
                    onClick={() => deleteFolder(f.id)}
                  />
                </div>
              ))}
              <button
                className={styles["gallery-description-folders-add"]}
                style={{ backgroundColor: pageColor, color: textColor }}
                onClick={handleAddFolder}
              >
                <FaPlus />
                Add Folder
              </button>
            </div>
            <div className={styles["gallery-description-images"]}>
                {
                    images.map((data) => (
                        <Images data={data} onDelete={handleDelete} />
                    ))
                }
                  
            </div>
            <div className={styles["gallery-description-footer"]}>
              <button
                style={{ color: textColor, backgroundColor: pageColor }}
                onClick={handleImage}
              >
                <IoImageOutline />
                Add A Photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}
      </div>
      <FamilyTree />
    </>
  );
};
