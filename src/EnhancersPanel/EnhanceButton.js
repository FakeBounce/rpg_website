import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonLarge from '../Utils/ButtonLarge';

const styledEnhanceButton = {
  display: 'block',
  float: 'right',
  position: 'relative',
  marginTop: 20,
  marginRight: 20,
};

class EnhanceButton extends Component {
  render() {
    const {
      character,
      enhanceWeapon,
      enhancePrice,
    } = this.props;

    return (
      <ButtonLarge
        onClick={() => {
          if (character.gold >= enhancePrice) {
            enhanceWeapon();
          }
        }}
        style={styledEnhanceButton}
        className={`${character.gold < enhancePrice ? 'noGold' : ''}`}
      >
        Enhance item ({enhancePrice}
        g)
      </ButtonLarge>
    );
  }
}

EnhanceButton.propTypes = {
  character: PropTypes.object.isRequired,
  enhanceWeapon: PropTypes.func.isRequired,
  enhancePrice: PropTypes.number.isRequired,
};

export default EnhanceButton;
