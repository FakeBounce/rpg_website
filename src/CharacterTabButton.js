import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthRightPanelLeft } from "./StyleConstants";

const styles = {
    tabButton: {
        width: `${widthRightPanelLeft / 4}px`,
        height: 25,
        padding: 0,
        position: "relative",
        float: "left",
        display: "inline-block",
        cursor: "pointer",
    },
};

class CharacterTabButton extends Component {
    render() {
        const { onChangeTab, tabToChange } = this.props;

        return (
            <button
                onClick={() => onChangeTab(tabToChange)}
                style={styles.tabButton}
            >
                {tabToChange}
            </button>
        );
    }
}

CharacterTabButton.propTypes = {
    onChangeTab: PropTypes.func.isRequired,
    tabToChange: PropTypes.string.isRequired,
};

export default CharacterTabButton;
