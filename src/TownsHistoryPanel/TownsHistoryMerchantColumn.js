import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import TownsHistoryMerchantHeader from './TownsHistoryMerchantHeader';
import TownsHistoryMerchantColumnList from './TownsHistoryMerchantColumnList';

const styledTownColumn = {
  width: widthLeftBestiary / 6 - 1 - 1 / 6,
  height: heightLeft,
  display: 'inline-block',
  position: 'relative',
  float: 'left',
  borderRight: '1px solid white',
};

class TownsHistoryMerchantColumn extends Component {
  render() {
    const { character, merchants, currentMerchant } = this.props;
    return (
      <div style={styledTownColumn}>
        <TownsHistoryMerchantHeader
          currentMerchant={merchants[currentMerchant]}
        />
        <TownsHistoryMerchantColumnList
          currentMerchant={currentMerchant}
          merchants={merchants}
          character={character}
        />
      </div>
    );
  }
}

TownsHistoryMerchantColumn.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  currentMerchant: PropTypes.number.isRequired,
};

export default TownsHistoryMerchantColumn;
