import React, { Component } from "react";
import PropTypes from "prop-types";
import HealthBar from "../Utils/HealthBar";
import TeamCharacterInfo from "./TeamCharacterInfo";
import {
  cursorPointer,
  widthRightPanel,
  imageSize,
  widthRightPanelLeft,
} from "../Utils/StyleConstants";

const styles = {
  characterTeamHeader: {
    width: `${widthRightPanel - 20}px`,
    height: `${imageSize / 2}px`,
    position: "relative",
    float: "left",
    display: "inline-block",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    cursor: cursorPointer,
  },
  characterTeamHeaderImage: {
    position: "relative",
    width: `${imageSize / 2}px`,
    height: `${imageSize / 2}px`,
    float: "left",
    display: "inline-block",
  },
  characterTeamExchangeImage: {
    position: "absolute",
    width: 25,
    height: 25,
    left: `${imageSize / 2}px`,
    top: 0,
    zIndex: 1,
  },
};

const styledCharacterTeamHeaderImageContainer = {
  position: "relative",
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  float: "left",
  display: "inline-block",
};

const styledCharacterTeamHeaderInactiveImage = {
  position: "absolute",
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  backgroundColor: "grey",
  opacity: 0.3,
};

class TeamCharacter extends Component {
  render() {
    const {
      icon,
      name,
      status,
      gold,
      health,
      maxHealth,
      exchangeWithTeamMember,
      chatWithTeamMember,
      goldWithTeamMember,
      isGM,
    } = this.props;

    return (
      <div style={styles.characterTeamHeader}>
        {!isGM && (
          <img
            onClick={exchangeWithTeamMember}
            src="./common/exchange.png"
            alt="Exchange icon"
            style={styles.characterTeamExchangeImage}
          />
        )}
        <div onClick={chatWithTeamMember}>
          <div style={styledCharacterTeamHeaderImageContainer}>
            {status === "Inactive" && (
              <div style={styledCharacterTeamHeaderInactiveImage} />
            )}
            <img
              src={icon}
              alt={name}
              style={styles.characterTeamHeaderImage}
            />
          </div>
          <TeamCharacterInfo doubleSized title={name} />
          <TeamCharacterInfo title="" text={status ? status : "OK"} />
        </div>
        <div onClick={goldWithTeamMember}>
          <TeamCharacterInfo title="" text={`${gold ? gold : 0}g`} />
        </div>
        <div onClick={chatWithTeamMember}>
          <HealthBar
            isGM={isGM}
            width={`${Math.floor((health / maxHealth) * 100)}%`}
            maxWidth={`${widthRightPanelLeft - 20 + imageSize / 2}px`}
          />
        </div>
      </div>
    );
  }
}

TeamCharacter.defaultProps = {
  health: 50,
  maxHealth: 50,
  isGM: false,
};

TeamCharacter.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  gold: PropTypes.number.isRequired,
  health: PropTypes.number,
  maxHealth: PropTypes.number,
  isGM: PropTypes.bool,
  exchangeWithTeamMember: PropTypes.func.isRequired,
  chatWithTeamMember: PropTypes.func.isRequired,
  goldWithTeamMember: PropTypes.func.isRequired,
};

export default TeamCharacter;
