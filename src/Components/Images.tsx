import styles from "../Css/images.module.scss";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FolderInterface } from "../Typescript/gallery";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import { RootState } from "../Store/appstore";
import { useSelector } from "react-redux";
import { Backdrop } from "@mui/material";

type ImagesProps = {
  data: FolderInterface;
  onDelete: (id: number) => void;
};

export const Images = ({ data, onDelete }: ImagesProps) => {
  const [folderDropdown, setFolderDropdown] = useState<boolean>(false);
  const [imageDropdown, setImageDropdpwn] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [folder, setFolder] = useState<FolderInterface[]>([]);

  const pageColor = useSelector((store: RootState) => store.color.isColor);

  // Load folders from localStorage
  useEffect(() => {
    const folderData = localStorage.getItem("folders");
    if (folderData) {
      const parsedFolders = JSON.parse(folderData).map((folder: FolderInterface) => ({
        ...folder,
        folderName: folder.folderName || [], 
      }));
      setFolder(parsedFolders);

      console.log(folder);
    }
  }, []);
  

  const handleCheckboxChange = (folderId: number, folderName: string, checked: boolean) => {
    setFolder((prevFolders) =>
      prevFolders.map((item) =>
        item.id === folderId
          ? {
              ...item,
              folderName: checked
                ? [...(item.folderName || []), folderName] 
                : item.folderName?.filter((name) => name !== folderName),
            }
          : item
      )
    );
  
    const updatedFolders = folder.map((item) =>
      item.id === folderId
        ? {
            ...item,
            folderName: checked
              ? [...(item.folderName || []), folderName]
              : item.folderName?.filter((name) => name !== folderName),
          }
        : item
    );
  
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
  };
  

  return (
    <>
      <div className={styles["images"]} key={data.id}>
        <div className={styles["images-container"]}>
          <img src={data.imageURL} />
          <HiOutlineDotsHorizontal
            onClick={() => {
              setImageDropdpwn(!imageDropdown);
              setFolderDropdown(false);
            }}
            style={{
              fontSize: "31px",
              color: "white",
              position: "absolute",
              right: "10px",
              cursor: "pointer",
              top: "12px",
            }}
          />
        </div>

        {imageDropdown && (
          <>
            <div className={styles["images-dropdown"]}>
              <ul>
                <li>
                  <FaTrash
                    style={{
                      fontSize: "14px",
                      color: pageColor,
                      cursor: "pointer",
                    }}
                    onClick={() => onDelete(data.id)}
                  />
                </li>
                <li>
                  <FaEye
                    style={{
                      fontSize: "14px",
                      color: pageColor,
                      cursor: "pointer",
                    }}
                    onClick={() => setBackdrop(true)}
                  />
                  <Backdrop
                    sx={(theme) => ({
                      color: "#fff",
                      zIndex: theme.zIndex.drawer + 1,
                    })}
                    open={backdrop}
                    onClick={() => setBackdrop(false)}
                  >
                    <img src={data.imageURL} height="250px" width="350px" />
                  </Backdrop>
                </li>
                <li>
                  <FaFolder
                    style={{
                      fontSize: "14px",
                      color: pageColor,
                      cursor: "pointer",
                    }}
                    onClick={() => setFolderDropdown(!folderDropdown)}
                  />
                </li>
              </ul>
            </div>
          </>
        )}
        <>
          {folderDropdown && (
            <div className={styles["folder-dropdown"]}>
              {folder.map((f) => (
                <div className={styles["folder-dropdown-items"]} key={f.id}>
                  <input
                    type="checkbox"
                    id={f.name || ""} // Fallback to an empty string if `f.name` is undefined
                    name={f.name || ""} // Same as above
                    checked={!!(f.name && f.folderName?.includes(f.name))} // Ensure `f.name` is defined and `folderName` is checked safely
                    onChange={(e) => {
                      if (f.name) {
                        handleCheckboxChange(f.id, f.name, e.target.checked); // Only call the function if `f.name` is defined
                      }
                    }}
                  />

                  <label style={{ color: pageColor }}>{f.name}</label>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </>
  );
};
