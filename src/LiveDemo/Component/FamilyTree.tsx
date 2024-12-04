import { useSelector } from "react-redux";
import styles from "../LivePageCss/familyTree.module.scss";
import { RootState } from "../../Store/appstore";
import { useEffect, useState } from "react";
import { CardInterface, FamilyCardInterface } from "../../Typescript/familyTree.interface";
import { IoPersonCircleSharp } from "react-icons/io5";

export const FamilyTree = () => {

    const [showGrandFatherCard, setShowGrandFatherCard] = useState<boolean>(false);
    const [showGrandMotherCard, setShowGrandMotherCard] = useState<boolean>(false);
    const [grandFatherCard, setGrandFatherCard] = useState<FamilyCardInterface | null>(null);
    const [grandMotherCard, setGrandMotherCard] = useState<FamilyCardInterface | null>(null);
    const [showGrandFather1Card, setShowGrandFather1Card] = useState<boolean>(false);
    const [grandFather1Card, setGrandFather1Card] = useState<FamilyCardInterface | null>(null);
    const [showGrandMother1Card, setShowGrandMother1Card] = useState<boolean>(false);
    const [grandMother1Card, setGrandMother1Card] = useState<FamilyCardInterface | null>(null);
    const [showFatherCard, setShowFatherCard] = useState<boolean>(false);
    const [fatherCard, setFatherCard] = useState<FamilyCardInterface | null>(null);
    const [showMotherCard, setShowMotherCard] = useState<boolean>(false);
    const [motherCard, setMotherCard] = useState<FamilyCardInterface | null>(null);
    const [siblingCards, setSiblingCards] = useState<CardInterface[] | null>(null);
    const [wifeCards, setWifeCards] = useState<CardInterface[]>([]);
    const [childCards, setChildCards] = useState<CardInterface[]>([]);
    const [profileImage, setProfileImage] = useState<string>('');


  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);

  useEffect(() => {
    //Fetching the grand father card
    const showGrandFather = localStorage.getItem("Show-grandfather-Card");
    if(showGrandFather) {
        setShowGrandFatherCard(JSON.parse(showGrandFather));
    };
    const grandFather = localStorage.getItem('Grand-Father');
    if(grandFather) {
        setGrandFatherCard(JSON.parse(grandFather));
    };
    
    //Fetching the grand mother card
    const showGrandMother = localStorage.getItem("Show-grandmother-Card");
    if(showGrandMother) {
        setShowGrandMotherCard(JSON.parse(showGrandMother));
    };
    const grandMother = localStorage.getItem('Grand-Mother');
    if(grandMother) {
        setGrandMotherCard(JSON.parse(grandMother));
    };

    //fetching the grand father 1 card
    const showGrandFather1 = localStorage.getItem("Show-grandfather-Card-1");
    if(showGrandFather1) {
        setShowGrandFather1Card(JSON.parse(showGrandFather1));
    };
    const grandFather1 = localStorage.getItem('Grand-Father-1');
    if(grandFather1) {
        setGrandFather1Card(JSON.parse(grandFather1));
    };

    //fetching grand mother card 2
    const showGrandMother1 = localStorage.getItem("Show-grandmother-Card-1");
    if(showGrandMother1) {
        setShowGrandMother1Card(JSON.parse(showGrandMother1));
    };
    const grandMother1 = localStorage.getItem('Grand-Mother-1');
    if(grandMother1) {
        setGrandMother1Card(JSON.parse(grandMother1));
    };

    //fetching father card detail
    const showFather = localStorage.getItem("Show-Father");
    if(showFather) {
        setShowFatherCard(JSON.parse(showFather));
    };
    const father = localStorage.getItem("Father");
    if(father) {
        setFatherCard(JSON.parse(father));
    };

    //fetching mother card detail
    const showMother = localStorage.getItem("Show-Mother");
    if(showMother) {
        setShowMotherCard(JSON.parse(showMother));
    };
    const mother = localStorage.getItem("Mother");
    if(mother) {
        setMotherCard(JSON.parse(mother));
    };

    //fetching sibling cards
    const siblings = localStorage.getItem('Sibling-card');
    if(siblings) {
        setSiblingCards(JSON.parse(siblings));
    };

    //fetching the profile image
    const profile = localStorage.getItem("profile-image");
    if(profile) {
        setProfileImage(profile);
    };

    //fetching the wife cards
    const wife = localStorage.getItem("Wife-card");
    if(wife) {
        setWifeCards(JSON.parse(wife));
    };

    //fetching the child cards
    const child = localStorage.getItem("Child-card");
    if(child) {
        setChildCards(JSON.parse(child));
    };

  }, []);

  return (
    <>
      <div className={styles["familytree"]}>
        <div className={styles["familytree-heading"]}>
          <h2 style={{ color: textColor }}>Family Tree</h2>
          <div
            className={styles["familytree-heading-line"]}
            style={{ backgroundColor: pageColor }}
          ></div>
        </div>

        <div className={styles["familytree-content"]}>
            {/* grand parents */}
          <div className={styles["familytree-content-1"]}>
            <div className={styles["familytree-content-1-left"]}>
                <div className={styles["familytree-content-1-left-father"]}>
                    {!showGrandFatherCard && <><div className={styles["familytree-content-1-left-father-card"]} style={{backgroundColor: pageColor, color: textColor}}>
                        <div className={styles["familytree-content-1-left-father-card-container"]}>
                                <img src={grandFatherCard?.imgUrl} />
                        </div>
                                <p>{grandFatherCard?.name}</p>
                    </div>
                    <div className={styles["familytree-content-1-left-father-lineRight"]} style={{backgroundColor: pageColor}}></div>
                    <div className={styles["familytree-content-1-left-father-lineDown"]} style={{backgroundColor: pageColor}}></div>
                    </>
  }
                </div>
                <div className={styles["familytree-content-1-left-mother"]}>
                    {!showGrandMotherCard && <><div className={styles["familytree-content-1-left-mother-lineDown"]} style={{backgroundColor: pageColor}}></div>
                    <div className={styles["familytree-content-1-left-mother-lineLeft"]} style={{backgroundColor: pageColor}}></div>
                    <div className={styles["familytree-content-1-left-mother-card"]} style={{backgroundColor: pageColor, color: textColor}}>
                        <div className={styles["familytree-content-1-left-mother-card-container"]}>
                             {
                               grandMotherCard?.imgUrl === '' ? (
                                   <IoPersonCircleSharp
                     style={{ height: "90px", width: "90px", cursor: "pointer" }}
                   />   
                              ) : (
                                  <img src={grandMotherCard?.imgUrl} />
                              )
                           }
                                
                        </div>
                            <p>{grandMotherCard?.name}</p>
                    </div></>}
                    
                </div>
            </div>
            <div className={styles["familytree-content-1-right"]}>
                <div className={styles["familytree-content-1-right-father"]}>
                   {!showGrandFather1Card &&  <><div className={styles["familytree-content-1-right-father-card"]} style={{backgroundColor: pageColor, color: textColor}}>
                        <div className={styles["familytree-content-1-right-father-card-container"]}>
                                <img src={grandFather1Card?.imgUrl} />
                        </div>
                                <p>{grandFather1Card?.name}</p>
                    </div>
                    <div className={styles["familytree-content-1-right-father-lineRight"]}style={{backgroundColor: pageColor}}></div>
                    <div className={styles["familytree-content-1-right-father-lineDown"]}style={{backgroundColor: pageColor}}></div></>}
                </div>

                <div className={styles["familytree-content-1-right-mother"]}>
                {!showGrandMother1Card && <><div className={styles["familytree-content-1-right-mother-lineDown"]}style={{backgroundColor: pageColor}}></div>
                <div className={styles["familytree-content-1-right-mother-lineLeft"]}style={{backgroundColor: pageColor}}></div>
                <div className={styles["familytree-content-1-right-mother-card"]} style={{backgroundColor: pageColor, color: textColor}}>
                <div className={styles["familytree-content-1-right-father-card-container"]}>
                                {
                                    grandMother1Card?.imgUrl !== "" ? (
                                    <img src={grandMother1Card?.imgUrl} />
                                ) : (
                                     <IoPersonCircleSharp
                                     style={{ height: "90px", width: "90px", cursor: "pointer" }}
                                   />
                                )
                                }
                        </div>
                                <p>{grandMother1Card?.name}</p>
                </div></>}
                </div>
            </div>
          </div>
          {/* parents */}
          <div className={styles["familytree-content-2"]}>
            <div className={styles["familytree-content-2-left"]}>
                <div className={styles["familytree-content-2-left-father"]}>
                {!showFatherCard && <><div className={styles["familytree-content-2-left-father-card"]} style={{backgroundColor: pageColor}}>
                        <div className={styles["familytree-content-2-left-father-card-container"]}>
                            {fatherCard?.imgUrl === null ? (
                                <IoPersonCircleSharp
                                style={{ height: "90px", width: "90px", cursor: "pointer" }}
                              />
                                
                            ) : (<img src={fatherCard?.imgUrl} />)}
                        </div>
                        <p  style={{color: textColor}}>{fatherCard?.name}</p>
                    </div>
                    <div className={styles["familytree-content-2-left-father-lineRight"]}></div>
                    <div className={styles["familytree-content-2-left-father-lineDown"]}></div></>}
                </div>
            </div>
            <div className={styles["familytree-content-2-right"]}>
                <div className={styles["familytree-content-2-right-mother"]}>
                    {!showMotherCard && <><div className={styles["familytree-content-2-right-mother-lineDown"]}></div>
                    <div className={styles["familytree-content-2-right-mother-lineLeft"]}></div>
                    <div className={styles["familytree-content-2-right-mother-card"]} style={{backgroundColor: pageColor}}>
                        <div className={styles["familytree-content-2-right-mother-card-container"]}>
                            {
                                motherCard?.imgUrl === null ? (
                                    <IoPersonCircleSharp
                                    style={{ height: "90px", width: "90px", cursor: "pointer" }}
                                  />
                                  
                                ) : (
                                    <img src={motherCard?.imgUrl} />
                                )
                            }
                        </div>
                        <p  style={{color: textColor}}>{motherCard?.name}</p>
                    </div></>}
                </div>
            </div>
          </div>

          <div className={styles["familytree-content-3"]}>
            {/* siblings */}
            <div className={styles["familytree-content-3-siblings"]}>
                <div className={styles["familytree-content-3-siblings-wrapper"]}>
                    <div className={styles["familytree-content-3-siblings-wrapper-lineTop"]} style={{backgroundColor: pageColor}}></div>
                    <div className={styles["familytree-content-3-siblings-wrapper-lineLeft"]} style={{backgroundColor: pageColor}}></div>
                    <div className={styles["familytree-content-3-siblings-wrapper-card"]} style={{border: `1px solid ${pageColor}`}}>
                        {
                            siblingCards?.map((card) => (
                                <div className={styles["familytree-content-3-siblings-wrapper-card-items"]} style={{backgroundColor: pageColor}}>
                            <div className={styles["familytree-content-3-siblings-wrapper-card-items-image"]}>
                                {
                                    card?.imgUrl === '' ? (
                                        <IoPersonCircleSharp
                                style={{ height: "90px", width: "90px", cursor: "pointer" }}
                              />
                                    ) : (
                                        <img src={card?.imgUrl} />
                                    )
                                }
                                
                            </div>
                            <p style={{color: textColor}}>{card?.name}</p>
                        </div>
                            ))
                        }
                        
                    </div>  
                </div>
            </div>
            {/* me */}
            <div className={styles["familytree-content-3-me"]} style={{backgroundColor: pageColor}}>
                <div className={styles["familytree-content-3-me-card"]}>
                    <img src={profileImage} />
                </div>
            </div>
            {/* wife */}
            <div className={styles["familytree-content-3-wife"]}>
                <div className={styles["familytree-content-3-wife-wrapper"]}>
                    <div className={styles["familytree-content-3-wife-wrapper-lineLeft"]} style={{backgroundColor: pageColor}}></div>
                    <div className={styles["familytree-content-3-wife-wrapper-card"]} style={{border: `1px solid ${pageColor}`}}>
                        {
                            wifeCards.map((card) => (
                                <div className={styles["familytree-content-3-wife-wrapper-card-items"]} style={{backgroundColor: pageColor}}>
                            <div className={styles["familytree-content-3-wife-wrapper-card-items-image"]}>
                                {
                                    card?.imgUrl === "" ? (
                                        <IoPersonCircleSharp
                                        style={{ height: "90px", width: "90px", cursor: "pointer" }}
                                      />
                                    ) : (
                                        <img src={card?.imgUrl} />
                                    )
                                }
                                
                            </div>
                            <p style={{color: textColor}}>{card?.name}</p>
                        </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
          </div>
          <div className={styles["familytree-content-4"]}>
            <div className={styles["familytree-content-4-child"]}>
                <div className={styles["familytree-content-4-child-lineTop"]} style={{backgroundColor: pageColor}}></div>
                <div className={styles["familytree-content-4-child-card"]} style={{border: `1px solid ${pageColor}`}}>
                    {
                        childCards.map((card) => (
                            <div className={styles["familytree-content-4-child-card-items"]} style={{backgroundColor: pageColor}}>
                        <div className={styles["familytree-content-4-child-card-items-image"]}>
                            {
                                card?.imgUrl === ""? (
                                    <IoPersonCircleSharp
                                    style={{ height: "90px", width: "90px", cursor: "pointer" }}
                                  />
                                  
                                ) : (
                                    <img src={card?.imgUrl} />
                                )
                            }
                        </div>
                        <p style={{color: textColor}}>{card?.name}</p>
                    </div>
                        ))
                    }
                    
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
