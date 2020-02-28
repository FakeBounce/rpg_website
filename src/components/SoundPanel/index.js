import React, { useState } from "react";

import { heightLeft, widthRightPanel } from "../Utils/StyleConstants";
import SoundPanelMusicHeader from "./SoundPanelMusicHeader";
import SoundPanelMusicMenu from "./SoundPanelMusicMenu";
import SoundPanelMusicList from "./SoundPanelMusicList";
import SoundPanelNoiseHeader from "./SoundPanelNoiseHeader";
import SoundPanelNoiseMenu from "./SoundPanelNoiseMenu";
import SoundPanelNoiseList from "./SoundPanelNoiseList";

const styledMapSide = {
  width: `${widthRightPanel}px`,
  height: `${heightLeft}px`,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  justifyContent: "space-between",
};

const styledNoiseContainer = {
  display: "flex",
  flexDirection: "column",
  minHeight: "40%",
};

const SoundPanel = () => {
  const [activeMusicItem, setActiveMusicItem] = useState("boss");
  const [activeNoiseItem, setActiveNoiseItem] = useState("others");

  return (
    <div style={styledMapSide}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SoundPanelMusicHeader />
        <>
          <SoundPanelMusicMenu
            activeMusicItem={activeMusicItem}
            setActiveMusicItem={setActiveMusicItem}
          />
          <SoundPanelMusicList activeMusicItem={activeMusicItem} />
        </>
      </div>
      <div style={styledNoiseContainer}>
        <SoundPanelNoiseHeader />
        <>
          <SoundPanelNoiseMenu
            activeNoiseItem={activeNoiseItem}
            setActiveNoiseItem={setActiveNoiseItem}
          />
          <SoundPanelNoiseList activeNoiseItem={activeNoiseItem} />
        </>
      </div>
    </div>
  );
};

export default SoundPanel;
