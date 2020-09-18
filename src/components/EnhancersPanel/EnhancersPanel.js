import React from 'react';
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

const EnhancersPanel = ({
  chooseEnhancer1,
  chooseEnhancer2,
  choosedEnhancer1,
  choosedEnhancer2,
  slots,
  enhanceWeapon,
  enhancePrice,
  currentTab,
}) => {
  return (
    <div style={styledEnhancersContainer}>
      <Cadre />
      <EnhancerItems
        slots={slots}
        currentTab={currentTab}
        chooseEnhancer2={chooseEnhancer2}
        chooseEnhancer1={chooseEnhancer1}
        choosedEnhancer2={choosedEnhancer2}
        choosedEnhancer1={choosedEnhancer1}
      />
      {(choosedEnhancer1 !== null || choosedEnhancer2 !== null) && (
        <EnhanceButton
          chooseEnhancer1={chooseEnhancer1}
          chooseEnhancer2={chooseEnhancer2}
          enhanceWeapon={enhanceWeapon}
          enhancePrice={enhancePrice}
        />
      )}
    </div>
  );
};

EnhancersPanel.propTypes = {
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
