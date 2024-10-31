import { Switch, SwitchProps } from "@mui/material";
import { useState } from "react";
import styles from "../Css/switch.module.scss";
import { addTimelineSwitch } from "../Store/TimelineSlice";
import { useDispatch } from "react-redux";

type SwitchProp = {
  color: string;
}

export const SwitchButton = ({ color }: SwitchProp) => {
    //-----------hooks---------------
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSwitchChange: SwitchProps["onChange"] = (event) => {
    setIsSwitchOn(event.target.checked);
    dispatch(addTimelineSwitch(isSwitchOn));
  };
  return (
    <>
      <div className={styles["switch"]}>
          <Switch
            checked={isSwitchOn}
            onChange={handleSwitchChange}
            color="secondary"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: color,
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                color: color, 
              },
              "& .MuiSwitch-track": {
                color: color, 
              },
            }}
          />
        <p className={styles['switch-label']} style={{color: color}}>Enable</p>
      </div>
    </>
  );
};
;