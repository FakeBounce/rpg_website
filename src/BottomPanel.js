import React, { Component } from "react";


const widthRightPanel = 350;
const heightBottomPanel = 150;

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledBottomPanel = {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    borderTop: "1px solid black",
    width: `${window.innerWidth - widthRightPanel}px`,
    height: `${heightBottomPanel}px`,
};

class BottomPanel extends Component {
    render() {
        return (
            <div style={styledBottomPanel}>
                <div style={styledBoxHeader}>Cameras</div>
            </div>
        );
    }
}

export default BottomPanel;
