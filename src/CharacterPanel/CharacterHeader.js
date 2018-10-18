import React, { Component } from "react";
import PropTypes from "prop-types";
import HealthBar from "../Utils/HealthBar";
import CharacterHeaderInfos from "./CharacterHeaderInfos";
import {
    widthRightPanel,
    imageSize,
    widthRightPanelLeft,
    heightHeader,
} from "../Utils/StyleConstants";

const styles = {
    characterHeader: {
        width: `${widthRightPanel}px`,
        height: `${heightHeader}px`,
        position: "relative",
        float: "left",
        display: "inline-block",
    },
    characterHeaderName: {
        position: "relative",
        width: `${widthRightPanelLeft}px`,
        height: 25,
        float: "left",
        display: "inline-block",
    },
    characterHeaderIcon: {
        position: "relative",
        width: `${imageSize}px`,
        height: `${imageSize}px`,
        float: "left",
        display: "inline-block",
    },
};

class CharacterHeader extends Component {
    render() {
        const { icon, name, health, maxHealth, gold, status } = this.props;

        return (
            <div style={styles.characterHeader}>
                <img src={icon} alt={name} style={styles.characterHeaderIcon} />
                <div style={styles.characterHeaderName}>{name}</div>
                <HealthBar
                    width={`${(health / maxHealth) * 100}%`}
                    maxWidth={`${widthRightPanelLeft}px`}
                />
                <CharacterHeaderInfos status={status} gold={gold} />
            </div>
        );
    }
}

CharacterHeader.propTypes = {
    gold: PropTypes.number.isRequired,
    health: PropTypes.number.isRequired,
    maxHealth: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default CharacterHeader;
