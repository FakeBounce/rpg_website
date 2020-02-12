import React, { Component } from "react";
import PropTypes from "prop-types";

import ButtonLarge from "../Utils/ButtonLarge";
import { connect } from "react-redux";

const styledEnhanceButton = {
  display: "block",
  float: "right",
  position: "relative",
  marginTop: 20,
  marginRight: 20,
};

class EnhanceButton extends Component {
  render() {
    const { characterGold, enhanceWeapon, enhancePrice } = this.props;

    return (
      <ButtonLarge
        onClick={() => {
          if (characterGold >= enhancePrice) {
            enhanceWeapon();
          }
        }}
        style={styledEnhanceButton}
        className={`${characterGold < enhancePrice ? "noGold" : ""}`}
      >
        Enhance item ({enhancePrice}
        g)
      </ButtonLarge>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  characterGold: store.character.gold,
});

EnhanceButton.propTypes = {
  enhanceWeapon: PropTypes.func.isRequired,
  enhancePrice: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(EnhanceButton);
