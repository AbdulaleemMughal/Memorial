import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "../Css/editor.module.scss";
import { Switch, SwitchProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/appstore";
import { addSwitch } from "../Store/EditorSlice";
import { Timeline } from "./Timeline";

export const MyStory = () => {
  const [val, setVal] = useState<string>("");
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [inputValue, setInputVal] = useState<string>("");
  const dispatch = useDispatch();

  const textColor = useSelector((store: RootState) => store.text.isText);
  const pageColor = useSelector((store: RootState) => store.color.isColor);

  useEffect(() => {
    const savedSwitchState = localStorage.getItem("editor-switch");
    setIsSwitchOn(savedSwitchState ? JSON.parse(savedSwitchState) : false);

    const savedInputValue = localStorage.getItem("editor-input");
    setInputVal(savedInputValue ? savedInputValue : "");

    const savedCkEditorVal = localStorage.getItem("ckEditorVal");
    setVal(savedCkEditorVal ? savedCkEditorVal : "");
  }, []);

  useEffect(() => {
    inputValue != "" && localStorage.setItem("editor-input", inputValue);
    val != "" && localStorage.setItem("ckEditorVal", val);
  }, [inputValue, val]);

  const handleSwitchChange: SwitchProps["onChange"] = (event) => {
    setIsSwitchOn(event.target.checked);
    dispatch(addSwitch(isSwitchOn));
  };

  return (
    <>
      <section id="myStory">
        <div className={styles["editor"]}>
          <div className={styles["editor-content"]}>
            <div className={styles["editor-content-input"]}>
              <input
                type="text"
                placeholder="My Story"
                value={inputValue}
                onChange={(e) => setInputVal(e.target.value)}
                style={{ color: textColor }}
              />
              <div
                className={styles["editor-content-input-line"]}
                style={{ backgroundColor: pageColor }}
              ></div>
            </div>
            <div className={styles["editor-content-switch"]}>
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
              <CKEditor
                editor={ClassicEditor}
                data={val}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setVal(data);
                  console.log(val);
                }}
              />
            </>
          )}
        </div>
      </section>
      <Timeline />
    </>
  );
};
