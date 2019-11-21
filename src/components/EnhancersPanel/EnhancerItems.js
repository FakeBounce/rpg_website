import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import EnhancerMerchantItems from './EnhancerMerchantItems';
import EnhancerCharacterItems from './EnhancerCharacterItems';

const styledItemsContainer = {
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  marginTop: 22,
  marginLeft: 26,
  overflowY: 'auto',
  height: `${heightLeft / 2 - 80}px`,
  width: `${widthLeft / 2 - 52}px`,
};

class EnhancerItems extends Component {
  render() {
    const {
      currentMerchant,
      character,
      itemsList,
      merchants,
      chooseEnhancer1,
      chooseEnhancer2,
      choosedEnhancer1,
      choosedEnhancer2,
      slots,
      currentTab,
    } = this.props;

    return (
      <div style={styledItemsContainer} className="scrollbar">
        <EnhancerMerchantItems
          merchants={merchants}
          currentMerchant={currentMerchant}
          character={character}
          choosedEnhancer1={choosedEnhancer1}
          choosedEnhancer2={choosedEnhancer2}
          chooseEnhancer1={chooseEnhancer1}
          chooseEnhancer2={chooseEnhancer2}
          currentTab={currentTab}
          itemsList={itemsList}
          slots={slots}
        />
        <EnhancerCharacterItems
          merchants={merchants}
          currentMerchant={currentMerchant}
          character={character}
          choosedEnhancer1={choosedEnhancer1}
          choosedEnhancer2={choosedEnhancer2}
          chooseEnhancer1={chooseEnhancer1}
          chooseEnhancer2={chooseEnhancer2}
          slots={slots}
        />
      </div>
    );
  }
}

EnhancerItems.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  itemsList: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default EnhancerItems;
