import React, { Component } from "react";
import PropTypes from "prop-types";
import { cursorPointer, widthRightPanelLeft } from "../Utils/StyleConstants";
import ButtonLarge from "../Utils/ButtonLarge";
import {
  GiChestArmor,
  GiArmorPunch,
  GiBodyBalance,
  GiBindle,
} from "react-icons/gi";

const styles = {
  tabButton: {
    width: `${widthRightPanelLeft / 4}px`,
    height: 25,
    padding: 0,
    position: "relative",
    float: "left",
    display: "inline-block",
    cursor: cursorPointer,
  },
};

class CharacterTabButton extends Component {
  render() {
    const { onChangeTab, tabToChange, isActive } = this.props;

    const getTabIcon = () => {
      switch (tabToChange) {
        case "Weapons":
          return <GiChestArmor />;
        case "Abilities":
          return <GiBodyBalance />;
        case "Skills":
          return <GiArmorPunch />;
        default:
          return <GiBindle />;
      }
    };

    return (
      <ButtonLarge
        className={isActive ? "buttonLargeActive" : ""}
        onClick={() => onChangeTab(tabToChange)}
        style={styles.tabButton}
      >
        {getTabIcon()}
      </ButtonLarge>
    );
  }
}

CharacterTabButton.propTypes = {
  onChangeTab: PropTypes.func.isRequired,
  tabToChange: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CharacterTabButton;
