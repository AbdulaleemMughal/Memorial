import { useSelector } from "react-redux";
import { Banner } from "./Component/Banner";
import { RootState } from "../Store/appstore";
import { Profile } from "./Component/Profile";
import { Header } from "./Component/Header";
import { MyStory } from "./Component/MyStory";
import { Favourite } from "./Component/Favourite";
import { Video } from "./Component/Video";
import { Memories } from "./Component/Memories";
import { Timeline } from "./Component/Timeline"
import { Gallery } from "./Component/Gallery";

export const LivePage = () => {
  const backgroundColor = useSelector(
    (store: RootState) => store.background.isBackground
  );

  return (
    <>
      <div style={{ backgroundColor: backgroundColor }}>
        <Banner />
        <Profile />
        <Header />
        <div className="container">
          <MyStory />
          <Favourite />
          <Video />
          <Memories />
          <Timeline />
          <Gallery />
        </div>
      </div>
    </>
  );
};
