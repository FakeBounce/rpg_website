import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import TownsHistoryMerchantHeader from './TownsHistoryMerchantHeader';
import TownsHistorySoloMerchantList from './TownsHistorySoloMerchantList';

const styledMerchantColumn = {
  width: widthLeftBestiary / 3,
  height: heightLeft,
  display: 'inline-block',
  position: 'relative',
  float: 'left',
  borderRight: '1px solid white',
  overflowY: 'auto',
  overflowX: 'hidden',
};

class TownsHistorySoloMerchant extends Component {
  render() {
    const { character, showedMerchant } = this.props;
    return (
      <div style={styledMerchantColumn}>
        <TownsHistoryMerchantHeader currentMerchant={showedMerchant} />
        <TownsHistorySoloMerchantList
          character={character}
          showedMerchant={showedMerchant}
        />
      </div>
    );
  }
}

TownsHistorySoloMerchant.propTypes = {
  character: PropTypes.object.isRequired,
  showedMerchant: PropTypes.object.isRequired,
};

export default TownsHistorySoloMerchant;
