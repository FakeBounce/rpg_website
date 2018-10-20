import React, { Component } from "react";
import { widthRightPanel, heightCameras } from "../Utils/StyleConstants";

const styledBottomPanel = {
  position: "absolute",
  bottom: "0px",
  left: "0px",
  borderTop: "1px solid black",
  width: `${window.innerWidth - widthRightPanel}px`,
  height: `${heightCameras}px`,
};

class BottomPanel extends Component {
  render() {
    return (
      <div style={styledBottomPanel}>
        {/*<div style={styledBoxHeader}>Cameras</div>*/}
      </div>
    );
  }
}

export default BottomPanel;
