import { Switch } from "@mui/material";
import styles from "../Css/familyTree.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { FaPlus } from "react-icons/fa6";
import { GrandfatherCard } from "./FamilyTreeCards/GrandFatherCard";
import { GrandMotherCard } from "./FamilyTreeCards/GrandMotherCard";
import { GrandFather1Card } from "./FamilyTreeCards/GrandFather1Card";
import { GrandMother1Card } from "./FamilyTreeCards/GrandMother1Card";
import { FatherCard } from "./FamilyTreeCards/FatherCard";
import { MotherCard } from "./FamilyTreeCards/Mother";
import { CardInterface } from "../Typescript/familyTree.interface";
import { Card } from "./FamilyTreeCards/Card";
import { Footer } from "./Footer";

export const FamilyTree = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [siblingCards, setSiblingCards] = useState<CardInterface[]>([]);
  const [wifeCards, setWifeCards] = useState<CardInterface[]>([]);
  const [childCards, setChildCards] = useState<CardInterface[]>([]);
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    setReloadPage(false);
    setInputValue(localStorage.getItem("family-Input") || "");

    // accessing the family switch button
    const gallerySwitch = localStorage.getItem("family-switch");
    if (gallerySwitch) {
      setIsSwitchOn(JSON.parse(gallerySwitch));
    }
    // accessing the profile image
    const profile = localStorage.getItem("profile-image");
    if (profile) {
      setProfileImage(profile);
    }
    // accessing the family sibling cards
    const cards = localStorage.getItem("Sibling-card");
    if (cards) {
      setSiblingCards(JSON.parse(cards));
    };
    // accessing the family wife cards
    const wifeCard = localStorage.getItem("Wife-card");
    if (wifeCard) {
      setWifeCards(JSON.parse(wifeCard));
    };
    // accessing the family child cards
    const childCard = localStorage.getItem("Child-card");
    if (childCard) {
      setChildCards(JSON.parse(childCard));
    };
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      localStorage.setItem("Sibling-card", JSON.stringify(siblingCards));
      localStorage.setItem("Wife-card", JSON.stringify(wifeCards));
      localStorage.setItem("Child-card", JSON.stringify(childCards));
    }
  }, [siblingCards, wifeCards, childCards]);

  const handleSiblingCard = () => {
    const newcard = {
      id: siblingCards.length + 1,
      name: "Full Name",
      imgUrl: "",
    };
    setSiblingCards((prev) => [...prev, newcard]);
  };

  const handleWifeCards = () => {
    const newcard = {
      id: wifeCards.length + 1,
      name: "Full Name",
      imgUrl: "",
    };
    setWifeCards((prev) => [...prev, newcard]);
  };

  const handleChildCards = () => {
    const newcard = {
      id: childCards.length + 1,
      name: "Full Name",
      imgUrl: "",
    };
    setChildCards((prev) => [...prev, newcard]);
  };

  const handleUpdateSiblingCard = (
    id: number,
    updatedData: Partial<CardInterface>
  ) => {
    setSiblingCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, ...updatedData } : card
      )
    );
  };

  const handleUpdateWifeCard = (
    id: number,
    updatedData: Partial<CardInterface>
  ) => {
    setWifeCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedData } : card))
    );
  };

  const handleUpdateChildCard = (
    id: number,
    updatedData: Partial<CardInterface>
  ) => {
    setChildCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedData } : card))
    );
  };

  const deleteSiblingCard = (id: number) => {
    setSiblingCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const deleteWifeCard = (id: number) => {
    setWifeCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const deleteChildCard = (id: number) => {
    setChildCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <>
      <div className={styles["family"]}>
        <div className={styles["family-content"]}>
          <div className={styles["family-content-input"]}>
            <input
              type="text"
              placeholder="Family Tree"
              style={{ color: textColor }}
              value={inputValue}
              onChange={(e) => {
                const newFamilyInput = e.target.value;
                setInputValue(newFamilyInput);
                localStorage.setItem("family-Input", newFamilyInput);
              }}
            />
            <div className={styles["family-content-input-line"]}></div>
          </div>

          <div className={styles["family-content-switch"]}>
            <Switch
              checked={isSwitchOn}
              onChange={(event) => {
                const newSwitchState = event.target.checked;
                setIsSwitchOn(newSwitchState);
                localStorage.setItem(
                  "family-switch",
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

        <div className={styles["family-tree"]}>
          {/* ----------grand parents--------------- */}
          <div className={styles["family-tree-1"]}>
            {/* ------------- dada g --------------- */}
            <div className={styles["family-tree-1-left"]}>
              <div className={styles["family-tree-1-left-father"]}>
                <div
                  className={styles["family-tree-1-left-father-card"]}
                  style={{ backgroundColor: pageColor }}
                >
                  <GrandfatherCard
                    iconStyle={{
                      backgroundColor: "red",
                      padding: "3px",
                      fontSize: "20px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div
                  className={styles["family-tree-1-left-father-lineRight"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-1-left-father-lineDown"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
              </div>
              {/* ------------- dadi g --------------- */}
              <div className={styles["family-tree-1-left-mother"]}>
                <div
                  className={styles["family-tree-1-left-mother-lineDown"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-1-left-mother-lineLeft"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-1-left-mother-card"]}
                  style={{ backgroundColor: pageColor }}
                >
                  <GrandMotherCard
                    iconStyle={{
                      backgroundColor: "red",
                      padding: "3px",
                      fontSize: "20px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ------------- nana g --------------- */}
            <div className={styles["family-tree-1-right"]}>
              <div className={styles["family-tree-1-right-father"]}>
                <div
                  className={styles["family-tree-1-right-father-card"]}
                  style={{ backgroundColor: pageColor }}
                >
                  <GrandFather1Card
                    iconStyle={{
                      backgroundColor: "red",
                      padding: "3px",
                      fontSize: "20px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div
                  className={styles["family-tree-1-right-father-lineRight"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-1-right-father-lineDown"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
              </div>
              {/* ------------- nani g ------------- */}
              <div className={styles["family-tree-1-right-mother"]}>
                <div
                  className={styles["family-tree-1-right-mother-lineDown"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-1-right-mother-lineLeft"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-1-right-mother-card"]}
                  style={{ backgroundColor: pageColor }}
                >
                  <GrandMother1Card
                    iconStyle={{
                      backgroundColor: "red",
                      padding: "3px",
                      fontSize: "20px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ----------parents--------------- */}
          <div className={styles["family-tree-2"]}>
            <div className={styles["family-tree-2-left"]}>
              <div className={styles["family-tree-2-left-father"]}>
                <div
                  className={styles["family-tree-2-left-father-card"]}
                  style={{ backgroundColor: pageColor }}
                >
                  <FatherCard
                    iconStyle={{
                      backgroundColor: "red",
                      padding: "3px",
                      fontSize: "20px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div
                  className={styles["family-tree-2-left-father-lineRight"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-2-left-father-lineDown"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
              </div>
            </div>
            <div className={styles["family-tree-2-right"]}>
              <div className={styles["family-tree-2-right-mother"]}>
                <div
                  className={styles["family-tree-2-right-mother-lineDown"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-2-right-mother-lineLeft"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-2-right-mother-card"]}
                  style={{ backgroundColor: pageColor }}
                >
                  <MotherCard
                    iconStyle={{
                      backgroundColor: "red",
                      padding: "3px",
                      fontSize: "20px",
                      borderRadius: "5px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ----------sibling and wife----------- */}
          <div className={styles["family-tree-3"]}>
            {/* ----------sibling----------- */}
            <div className={styles["family-tree-3-siblings"]}>
              <div className={styles["family-tree-3-siblings-wrapper"]}>
                <div
                  className={styles["family-tree-3-siblings-wrapper-lineTop"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-3-siblings-wrapper-lineLeft"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-3-siblings-wrapper-card"]}
                  style={{ border: `1px solid ${pageColor}` }}
                >
                  {siblingCards.map((c) => (
                    <Card
                      key={c.id}
                      data={c}
                      onUpdate={handleUpdateSiblingCard}
                      onDelete={deleteSiblingCard}
                      iconStyle={{
                        backgroundColor: "red",
                        padding: "3px",
                        fontSize: "20px",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                  <div
                    className={
                      styles["family-tree-3-siblings-wrapper-card-items"]
                    }
                    style={{ backgroundColor: pageColor, cursor: "pointer" }}
                    onClick={handleSiblingCard}
                  >
                    <div
                      className={
                        styles["family-tree-3-siblings-wrapper-card-items-add"]
                      }
                    >
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
                </div>
              </div>
            </div>
            {/* ---------- ME ----------- */}
            <div
              className={styles["family-tree-3-me"]}
              style={{ backgroundColor: pageColor }}
            >
              <div className={styles["family-tree-3-me-image"]}>
                <img src={profileImage} alt="" />
              </div>
            </div>
            {/* ----------wife----------- */}
            <div className={styles["family-tree-3-siblings"]}>
              <div className={styles["family-tree-3-siblings-wrapper"]}>
                <div
                  className={styles["family-tree-3-wife-lineLeft"]}
                  style={{ backgroundColor: pageColor }}
                ></div>
                <div
                  className={styles["family-tree-3-siblings-wrapper-card"]}
                  style={{ border: `1px solid ${pageColor}` }}
                >
                  {wifeCards.map((c) => (
                    <Card
                      key={c.id}
                      data={c}
                      onUpdate={handleUpdateWifeCard}
                      onDelete={deleteWifeCard}
                      iconStyle={{
                        backgroundColor: "red",
                        padding: "3px",
                        fontSize: "20px",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                  <div
                    className={
                      styles["family-tree-3-siblings-wrapper-card-items"]
                    }
                    style={{ backgroundColor: pageColor, cursor: "pointer" }}
                    onClick={handleWifeCards}
                  >
                    <div
                      className={
                        styles["family-tree-3-siblings-wrapper-card-items-add"]
                      }
                    >
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
                </div>
              </div>
            </div>
          </div>
          {/* son and daughter  */}
          <div className={styles["family-tree-4"]}>
            <div className={styles["family-tree-4-child"]}>
              <div
                className={styles["family-tree-4-child-lineTop"]}
                style={{ backgroundColor: pageColor }}
              ></div>
              <div
                className={styles["family-tree-4-child-card"]}
                style={{ border: `1px solid ${pageColor}` }}
              >
                  {
                  childCards.map((c) => (
                    <Card
                      key={c.id}
                      data={c}
                      onUpdate={handleUpdateChildCard}
                      onDelete={deleteChildCard}
                      iconStyle={{
                        backgroundColor: "red",
                        padding: "3px",
                        fontSize: "20px",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  ))
                }
                <div
                  className={styles["family-tree-4-child-card-items"]}
                  style={{ backgroundColor: pageColor, cursor: "pointer" }}
                  onClick={handleChildCards}
                >
                  <div className={styles["family-tree-4-child-card-items-add"]}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
