import React from 'react';
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

const EnhancerItems = ({
  chooseEnhancer1,
  chooseEnhancer2,
  choosedEnhancer1,
  choosedEnhancer2,
  slots,
  currentTab,
}) => {
  return (
    <div style={styledItemsContainer} className='scrollbar'>
      <EnhancerMerchantItems
        choosedEnhancer1={choosedEnhancer1}
        choosedEnhancer2={choosedEnhancer2}
        chooseEnhancer1={chooseEnhancer1}
        chooseEnhancer2={chooseEnhancer2}
        currentTab={currentTab}
        slots={slots}
      />
      <EnhancerCharacterItems
        choosedEnhancer1={choosedEnhancer1}
        choosedEnhancer2={choosedEnhancer2}
        chooseEnhancer1={chooseEnhancer1}
        chooseEnhancer2={chooseEnhancer2}
        slots={slots}
      />
    </div>
  );
};

EnhancerItems.propTypes = {
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default EnhancerItems;
