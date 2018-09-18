import React, { Component } from "react";
import PropTypes from "prop-types";
import HealthBar from "./HealthBar";
import CharacterTeamInfo from "./CharacterTeamInfo";
import {
    widthRightPanel,
    heightHeader,
    imageSize,
    widthRightPanelLeft,
} from "./StyleConstants";

const styles = {
    characterTeamHeader: {
        width: `${widthRightPanel - 20}px`,
        height: `${heightHeader / 2}px`,
        position: "relative",
        float: "left",
        display: "inline-block",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
    },
    characterTeamHeaderImage: {
        position: "relative",
        width: `${imageSize / 2}px`,
        height: `${imageSize / 2}px`,
        float: "left",
        display: "inline-block",
    },
};

class TeamCharacter extends Component {
    render() {
        const { icon, name, status, gold, health, maxHealth } = this.props;

        return (
            <div style={styles.characterTeamHeader}>
                <img
                    src={icon}
                    alt={name}
                    style={styles.characterTeamHeaderImage}
                />
                <CharacterTeamInfo title={name} />
                <CharacterTeamInfo
                    title="Status :"
                    text={status ? status : "OK"}
                />
                <CharacterTeamInfo title="Gold :" text={gold ? gold : 0} />
                <HealthBar
                    width={`${(health / maxHealth) * 100}%`}
                    maxWidth={`${widthRightPanelLeft - 20 + imageSize / 2}px`}
                />
            </div>
        );
    }
}

TeamCharacter.defaultProps = {
    health: 50,
    maxHealth: 50,
};

TeamCharacter.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    gold: PropTypes.number.isRequired,
    health: PropTypes.number,
    maxHealth: PropTypes.number,
};

export default TeamCharacter;
