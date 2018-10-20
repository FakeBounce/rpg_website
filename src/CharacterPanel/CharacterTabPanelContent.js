import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthRightPanelLeft } from "../Utils/StyleConstants";

const styles = {
  BoxHeader: {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
  },
  tabPanelItem: {
    width: `${widthRightPanelLeft - 20}px`,
    height: 25,
    paddingHorizontal: 5,
    position: "relative",
    float: "left",
    display: "inline-block",
  },
};

class CharacterTabPanelContent extends Component {
  render() {
    const { title, tab } = this.props;

    return (
      <div>
        <div style={styles.BoxHeader}>{title}</div>
        {tab.map((description, index) => {
          return (
            <div key={`${description}-${index}`} style={styles.tabPanelItem}>
              {description}
            </div>
          );
        })}
      </div>
    );
  }
}

CharacterTabPanelContent.propTypes = {
  tab: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default CharacterTabPanelContent;
