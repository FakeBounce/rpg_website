import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import { colors } from '../Utils/Constants';
import Cadre from '../Utils/Cadre';
import EnhanceButton from './EnhanceButton';
import EnhancerItems from './EnhancerItems';

const styledEnhancersContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 15,
  color: colors.text,
};

class EnhancersPanel extends Component {
  render() {
    const {
      character,
      itemsList,
      merchants,
      currentMerchant,
      chooseEnhancer1,
      chooseEnhancer2,
      choosedEnhancer1,
      choosedEnhancer2,
      slots,
      enhanceWeapon,
      enhancePrice,
      currentTab,
    } = this.props;

    return (
      <div style={styledEnhancersContainer}>
        <Cadre />
        <EnhancerItems
          slots={slots}
          itemsList={itemsList}
          currentTab={currentTab}
          chooseEnhancer2={chooseEnhancer2}
          chooseEnhancer1={chooseEnhancer1}
          choosedEnhancer2={choosedEnhancer2}
          choosedEnhancer1={choosedEnhancer1}
          character={character}
          merchants={merchants}
          currentMerchant={currentMerchant}
        />
        {(choosedEnhancer1 !== null || choosedEnhancer2 !== null) && (
          <EnhanceButton
            character={character}
            chooseEnhancer1={chooseEnhancer1}
            chooseEnhancer2={chooseEnhancer2}
            enhanceWeapon={enhanceWeapon}
            enhancePrice={enhancePrice}
          />
        )}
      </div>
    );
  }
}

EnhancersPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  itemsList: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  enhanceWeapon: PropTypes.func.isRequired,
  enhancePrice: PropTypes.number.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default EnhancersPanel;
