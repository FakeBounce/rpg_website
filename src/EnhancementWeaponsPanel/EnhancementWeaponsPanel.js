import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import Cadre from '../Utils/Cadre';
import EnhancementWeaponsContent from './EnhancementWeaponsContent';

const styledEnhancementWeaponsContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
  color: 'white',
};

class EnhancementWeaponsPanel extends Component {
  render() {
    const {
      character,
      itemsList,
      merchants,
      currentMerchant,
      isFromMerchant,
      choosedItem,
      showEnhancers,
    } = this.props;

    return (
      <div style={styledEnhancementWeaponsContainer}>
        <Cadre />
        <EnhancementWeaponsContent
          showEnhancers={showEnhancers}
          choosedItem={choosedItem}
          character={character}
          isFromMerchant={isFromMerchant}
          currentMerchant={currentMerchant}
          merchants={merchants}
          itemsList={itemsList}
        />
      </div>
    );
  }
}

EnhancementWeaponsPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  isFromMerchant: PropTypes.bool.isRequired,
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  merchants: PropTypes.array.isRequired,
  itemsList: PropTypes.array.isRequired,
};

export default EnhancementWeaponsPanel;
