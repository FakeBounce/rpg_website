import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterTabButton from "./CharacterTabButton";
import { widthRightPanelLeft } from "./StyleConstants";

const styles = {
    tabsButtons: {
        width: `${widthRightPanelLeft}px`,
        height: 25,
        position: "relative",
        float: "left",
        display: "inline-block",
    },
};

class CharacterTabButtons extends Component {
    render() {
        const { onChangeTab } = this.props;

        return (
            <div style={styles.tabsButtons}>
                <CharacterTabButton
                    onChangeTab={onChangeTab}
                    tabToChange="Weapons"
                />
                <CharacterTabButton
                    onChangeTab={onChangeTab}
                    tabToChange="Abilities"
                />
                <CharacterTabButton
                    onChangeTab={onChangeTab}
                    tabToChange="Skills"
                />
                <CharacterTabButton
                    onChangeTab={onChangeTab}
                    tabToChange="Items"
                />
            </div>
        );
    }
}

CharacterTabButtons.propTypes = {
    onChangeTab: PropTypes.func.isRequired,
};

export default CharacterTabButtons;
