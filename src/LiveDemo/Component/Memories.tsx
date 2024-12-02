import { useState, useEffect, useRef, ChangeEvent } from "react";
import styles from '../LivePageCss/memory.module.scss'
import { Backdrop } from "@mui/material";
import { useSelector } from "react-redux";
import { HiArrowRight } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { LuTrash } from "react-icons/lu";
import { ImageInterface, MemoryInterface } from "../../Typescript/memory";
import { RootState } from "../../Store/appstore";
import { MemoryContent } from "./MemoryContent";

type SubmitType = {
  name: string;
  email: string;
  message: string;
};

export const Memories = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [memory, setMemory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [reloadPage, setReloadPage] = useState<boolean>(true);
  const [memoryData, setMemoryData] = useState<MemoryInterface[]>([]);
  const [images, setImages] = useState<ImageInterface[]>([]);

  const pageColor = useSelector((store: RootState) => store.color.isColor);
  const textColor = useSelector((store: RootState) => store.text.isText);
  const fontSelect = useSelector((store: RootState) => store.font.isFont);
  const memorySwitch = useSelector((store: RootState) => store.memories.isMemoriesSwitch);

  useEffect(() => {
    setReloadPage(false);

    setMemory(localStorage.getItem("memory") || "");
    const memory_images = localStorage.getItem("memory-images");
    if (memory_images) {
      setImages(JSON.parse(memory_images));
    } else {
      setImages([]);
    }

    const memory_Data = localStorage.getItem("memory-data");
    if (memory_Data) {
      setMemoryData(JSON.parse(memory_Data));
    } else {
      setMemoryData([]);
    }
  }, []);

  useEffect(() => {
    memory != "" && localStorage.setItem("memory", memory);

    if (!reloadPage) {
      localStorage.setItem("memory-data", JSON.stringify(memoryData));
    }
  }, [memory, memoryData]);

  const handleSubmit = ({ name, email, message }: SubmitType) => {
    const newMemory = {
      id: memoryData.length + 1,
      name,
      email,
      message,
    };

    setMemoryData((prev) => [...prev, newMemory]);

    // console.log(memoryData);
    setOpen(false);
    setName("");
    setEmail("");
    setMessage("");
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
        const newImage = {
          id: images.length + 1,
          url: base64String, 
        };
        const updatedGallery = [...images, newImage];
        setImages(updatedGallery);
        localStorage.setItem("memory-images", JSON.stringify(updatedGallery));
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleDelete = (id: number) => {
    setMemoryData((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteImage = (id: number) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className={styles["memories"]}>
        <div className={styles["memories-content"]}>
          <div className={styles["memories-content-input"]}>
            <h2 style={{color: textColor}}>{memory}</h2>
            <div style={{backgroundColor: pageColor}} className={styles["memories-content-input-line"]}></div>
          </div>
        </div>
          {memorySwitch && <>
            <div className={styles["memories-text"]}>
              <p style={{ color: textColor, fontWeight: fontSelect }}>
                To live in the hearts we leave behind is not to die.
                <br />
                Please share your Photos and Memories about the beloved
              </p>
              <div className={styles["memories-text-button"]}>
                <button
                  style={{ backgroundColor: pageColor, color: textColor }}
                  onClick={() => setOpen(true)}
                >
                  Contribute
                </button>
              </div>
            </div>
            {memoryData.map((data) => (
              <>
                <MemoryContent
                  data={data}
                  key={data.id}
                  images={images}
                />
              </>
            ))}
            
          </>}

        <div className={styles["memories-text-modal"]}>
          <Backdrop
            sx={{
              backgroundColor: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              width: "53vw",
              height: "85vh",
              top: "7%",
              left: "25%",
              display: "block",
              overflowY: "auto",
              borderRadius: "10px",
            }}
            open={open}
          >
            <div className={styles["memories-text-modal-title"]}>
              <h4 style={{ color: pageColor }}>Contribute</h4>
              <RxCross2
                style={{ fontSize: "23px", cursor: "pointer" }}
                onClick={() => setOpen(false)}
              />
            </div>
            <div className={styles["memories-text-modal-body"]}>
              <div className={styles["memories-text-modal-body-input"]}>
                <div className={styles["memories-text-modal-body-input-name"]}>
                  <label style={{ color: pageColor }}>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ border: `1px solid ${pageColor}` }}
                  />
                </div>
                <div className={styles["memories-text-modal-body-input-name"]}>
                  <label style={{ color: pageColor }}>Your Email</label>
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: `1px solid ${pageColor}` }}
                  />
                </div>
              </div>
              <div className={styles["memories-text-modal-body-message"]}>
                <label style={{ color: pageColor }}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ border: `1px solid ${pageColor}` }}
                ></textarea>
              </div>
              <div className={styles["memories-text-modal-body-image"]}>
                <label style={{ color: pageColor }}>Your Image</label>
                {images.length > 0 ? (
                  <div className="d-flex align-items-center">
                    {images.map((i) => (
                      <div key={i.id}>
                        <img
                          style={{ height: "100px", width: "150px" }}
                          src={i.url}
                        />
                        <LuTrash
                          onClick={() => deleteImage(i.id)}
                          style={{
                            position: "relative",
                            right: "25px",
                            bottom: "29px",
                            fontSize: "20px",
                            color: "red",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                <label>
                  <button
                    style={{ backgroundColor: pageColor, color: textColor }}
                    onClick={handleImage}
                  >
                    Add Image
                    <HiArrowRight />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div className={styles["memories-text-modal-footer"]}>
              <button
                className={styles["memories-text-modal-footer-close"]}
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                className={styles["memories-text-modal-footer-submit"]}
                style={{ backgroundColor: pageColor, color: textColor }}
                onClick={() => handleSubmit({ name, email, message })}
              >
                Submit
              </button>
            </div>
          </Backdrop>
        </div>
      </div>
    </>
  );
};
