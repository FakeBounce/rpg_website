import React, { Component } from "react";
import PropTypes from "prop-types";
import HealthBar from "../Utils/HealthBar";
import TeamCharacterInfo from "./TeamCharacterInfo";
import {
  widthRightPanel,
  heightHeader,
  imageSize,
  widthRightPanelLeft,
} from "../Utils/StyleConstants";

const styles = {
  characterTeamHeader: {
    width: `${widthRightPanel - 20}px`,
    height: `${heightHeader / 2}px`,
    position: "relative",
    float: "left",
    display: "inline-block",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    cursor: "pointer",
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
    const {
      icon,
      name,
      status,
      gold,
      health,
      maxHealth,
      chatWithTeamMember,
      goldWithTeamMember,
      isGM,
    } = this.props;

    return (
      <div style={styles.characterTeamHeader}>
        <div onClick={chatWithTeamMember}>
          <img src={icon} alt={name} style={styles.characterTeamHeaderImage} />
          <TeamCharacterInfo title={name} />
          <TeamCharacterInfo title="Status :" text={status ? status : "OK"} />
        </div>
        <div onClick={goldWithTeamMember}>
          <TeamCharacterInfo title="Gold :" text={gold ? gold : 0} />
        </div>
        <div onClick={chatWithTeamMember}>
          <HealthBar
            isGM={isGM}
            width={`${(health / maxHealth) * 100}%`}
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
  chatWithTeamMember: PropTypes.func.isRequired,
  goldWithTeamMember: PropTypes.func.isRequired,
};

export default TeamCharacter;
