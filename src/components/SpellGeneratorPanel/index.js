import React from "react";

import { heightLeft, widthLeft } from "../Utils/StyleConstants";
import SpellGeneratorPanelHeader from "./SpellGeneratorPanelHeader";
import SpellGeneratorPanelContent from "./SpellGeneratorPanelContent";

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

const styledContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid white",
};

const SpellGeneratorPanel = () => (
  <div style={styledMapSide}>
    <div style={styledContainer}>
      <SpellGeneratorPanelHeader />
      <SpellGeneratorPanelContent />
    </div>
  </div>
);

export default SpellGeneratorPanel;
