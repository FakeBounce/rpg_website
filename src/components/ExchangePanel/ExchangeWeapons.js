import React, { Component } from "react";
import PropTypes from "prop-types";
import ExchangeWeapon from "./ExchangeWeapon";
import { connect } from "react-redux";

class ExchangeWeapons extends Component {
  render() {
    const { characterWeapons, onWeaponExchange } = this.props;

    if (characterWeapons.length > 0) {
      return characterWeapons.map((item, index) => {
        return (
          <ExchangeWeapon
            onWeaponExchange={onWeaponExchange}
            index={index}
            item={item}
          />
        );
      });
    } else return null;
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  characterWeapons: store.character.weapons,
});

ExchangeWeapons.propTypes = {
  onWeaponExchange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExchangeWeapons);
