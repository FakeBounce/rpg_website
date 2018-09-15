import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";

const widthRightPanel = 300;
const gridLength = 20;
const gridDimension = Math.floor((window.innerHeight - 250) / gridLength);
const widthLeft =
    window.innerWidth -
    gridLength * gridDimension -
    gridLength * 2 -
    widthRightPanel;
const heightLeft = gridLength * gridDimension;

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledMapButtons = {
    border: "1px solid blue",
    width: `${gridDimension * 3 + 3}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledGrid = {
    border: "1px solid pink",
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft / 2 - 3}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
};

const gridTypes = [
    {
        name: "Fog",
        background: "black",
    },
    {
        name: "Ocean",
        background: "blue",
    },
    {
        name: "Forest",
        icon: "forest.png",
    },
];

class GMMapPanel extends Component {
    getGridTypes = grids => {
        return grids.map(gridType => {
            if (gridType.background) {
                return (
                    <div
                        key={`gridType-${gridType.background}`}
                        style={{
                            ...styledGrid,
                            border: "none",
                            borderLeft: "1px solid black",
                            backgroundColor: gridType.background,
                        }}
                        onClick={() => this.loadTexture(gridType)}
                    />
                );
            } else if (gridType.icon) {
                return (
                    <div
                        key={`gridType-${gridType.icon}`}
                        style={{
                            ...styledGrid,
                            border: "none",
                            borderLeft: "1px solid black",
                            backgroundImage: `url(${gridType.icon})`,
                            backgroundSize: "cover",
                        }}
                        onClick={() => this.loadTexture(gridType)}
                    />
                );
            }
            return null;
        });
    };

    loadTexture = gridType => {
        this.props.doSetState({
            textureToApply: gridType,
        });
    };

    getGridSelected = grid => {
        if (grid.background) {
            return (
                <div
                    style={{
                        ...styledGrid,
                        border: "none",
                        borderLeft: "1px solid black",
                        backgroundColor: grid.background,
                    }}
                    onClick={() => this.unloadTexture()}
                />
            );
        } else if (grid.icon) {
            return (
                <div
                    style={{
                        ...styledGrid,
                        border: "none",
                        borderLeft: "1px solid black",
                        backgroundImage: `url(${grid.icon})`,
                        backgroundSize: "cover",
                    }}
                    onClick={() => this.unloadTexture()}
                />
            );
        }
        return null;
    };

    unloadTexture = () => {
        this.props.doSetState({
            textureToApply: null,
        });
    };

    render() {
        const { textureToApply } = this.state;

        return (
            <div style={styledMapSide}>
                <div style={styledBoxHeader}>Modifier la carte</div>
                <div style={styledMapButtons}>
                    {this.getGridTypes(gridTypes)}
                </div>
                <div style={styledMapButtons}>
                    {textureToApply && this.getGridSelected(textureToApply)}
                </div>
            </div>
        );
    }
}

GMMapPanel.propTypes = {
    textureToApply: PropTypes.object.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default GMMapPanel;
