import React, { Component } from "react";
import PropTypes from "prop-types";

import { imageSize, widthRightPanelLeft } from "../Utils/StyleConstants";

const styles = {
  characterTeamHeaderInfo: {
    position: "relative",
    width: `${(widthRightPanelLeft - 20 + imageSize / 2) / 3}px`,
    height: 25,
    float: "left",
    display: "inline-block",
  },
};

class TeamCharacterInfo extends Component {
  render() {
    const { title, text } = this.props;

    return (
      <div style={styles.characterTeamHeaderInfo}>
        {title}
        {text}
      </div>
    );
  }
}

TeamCharacterInfo.defaultProps = {
  text: "",
};

TeamCharacterInfo.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TeamCharacterInfo;
