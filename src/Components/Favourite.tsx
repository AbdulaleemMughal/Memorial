import { Switch, SwitchProps } from "@mui/material";
import styles from "../Css/favoutie.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { addSwitch } from "../Store/FavouriteSlice";
import { MdAdd } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { FavouriteInterface } from "../Typescript/favourite";
import { FavouriteContent } from "./FavouriteContent";
import { Memories } from "./Memories";

export const Favourite = () => {
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState<FavouriteInterface[]>([]);
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("Favourite");
  const [nameInput, setNameInput] = useState<string>("");
  const [nameDesc, setNameDesc] = useState<string>("");
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);
  const fontStyle = useSelector((store: RootState) => store.font.isFont);

  useEffect(() => {
    setReloadPage(false);

    const favouriteSwitch = localStorage.getItem("favurite-switch");
    setIsSwitchOn(favouriteSwitch ? JSON.parse(favouriteSwitch) : true);

    const favouriteName = localStorage.getItem("favourite-name");
    setNameInput(favouriteName ? favouriteName : "");

    const favouriteDesc = localStorage.getItem("favourite-desc");
    setNameDesc(favouriteDesc ? favouriteDesc : "");

    const favouriteItems = localStorage.getItem("favourite");
    if (favouriteItems) {
      setFavourite(JSON.parse(favouriteItems));
      setNameDesc("");
      setNameInput("");
    } else {
      setFavourite([]);
    }
  }, []);

  useEffect(() => {
    inputValue != "" && localStorage.setItem("favourite-input", inputValue);

    if (!reloadPage) {
      const favouriteContent = JSON.stringify(favourite);
      localStorage.setItem("favourite", favouriteContent);
    }
  }, [inputValue, favourite]);

  const handleSwitchChange: SwitchProps["onChange"] = (event) => {
    setIsSwitchOn(event.target.checked);
    dispatch(addSwitch(isSwitchOn));
  };

  const handleFavourite = () => {
    const newFavourite: FavouriteInterface = {
      id: favourite.length + 1,
      name: nameInput,
      desc: nameDesc,
    };

    setFavourite((prev) => [...prev, newFavourite]);

    setNameInput("");
    setNameDesc("");
  };

  const handleDelete = (id: number) => {
    setFavourite((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className={styles["favourite"]}>
        <div className={styles["favourite-content"]}>
          <div className={styles["favourite-content-input"]}>
            <input
              type="text"
              style={{ color: textColor }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div
              className={styles["favourite-content-input-line"]}
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className={styles["favourite-content-switch"]}>
            <Switch
              checked={isSwitchOn}
              onChange={handleSwitchChange}
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
          <>
            <div className={styles["favourite-description"]}>
              <div className="row">
                {favourite.map((t) => (
                  <FavouriteContent key={t.id} t={t} onDelete={handleDelete} />
                ))}
                <div className="col-lg-4">
                  <div className={styles["favourite-description-card"]}>
                    <div
                      className={styles["favourite-description-card-delete"]}
                    >
                      <BsTrash style={{ color: "red", cursor: "pointer" }} />
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
                          value={nameInput}
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
                          value={nameDesc}
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
            </div>

            <div className={styles["favourite-content-button"]}>
              <button
                style={{ backgroundColor: pageColor, color: textColor }}
                onClick={handleFavourite}
              >
                <MdAdd />
                <span>Add More</span>
              </button>
            </div>
          </>
        )}
      </div>
      <Memories />
    </>
  );
};
