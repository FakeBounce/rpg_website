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
      choosedEnhancer1,
      choosedEnhancer2,
      enhanceWeapon,
      enhancePrice,
    } = this.props;

    if (choosedEnhancer1 !== null || choosedEnhancer2 !== null) {
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
    return null;
  }
}

EnhanceButton.propTypes = {
  character: PropTypes.object.isRequired,
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  enhanceWeapon: PropTypes.func.isRequired,
  enhancePrice: PropTypes.number.isRequired,
};

export default EnhanceButton;
