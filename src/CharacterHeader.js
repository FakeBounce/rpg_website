import React, { Component } from "react";
import PropTypes from "prop-types";
import HealthBar from "./HealthBar";
import CharacterHeaderInfos from "./CharacterHeaderInfos";
import {
    widthRightPanel,
    imageSize,
    widthRightPanelLeft,
    heightHeader,
} from "./StyleConstants";

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
        const { character } = this.props;

        return (
            <div style={styles.characterHeader}>
                <img
                    src={character.icon}
                    alt={character.name}
                    style={styles.characterHeaderIcon}
                />
                <div style={styles.characterHeaderName}>{character.name}</div>
                <HealthBar
                    width={`${(character.health / character.maxHealth) * 100}%`}
                    maxWidth={`${widthRightPanelLeft}px`}
                />
                <CharacterHeaderInfos
                    status={character.status}
                    gold={character.gold}
                />
            </div>
        );
    }
}

CharacterHeader.propTypes = {
    character: PropTypes.object.isRequired,
};

export default CharacterHeader;
