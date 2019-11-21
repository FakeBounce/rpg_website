import React, { Component } from "react";
import PropTypes from "prop-types";
import ExchangeWeapon from "./ExchangeWeapon";

class ExchangeWeapons extends Component {
  render() {
    const { character, onWeaponExchange } = this.props;

    if (character.weapons) {
      return character.weapons.map((item, index) => {
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

ExchangeWeapons.propTypes = {
  onWeaponExchange: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
};

export default ExchangeWeapons;
