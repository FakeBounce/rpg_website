import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthListPanelBestiary } from '../Utils/StyleConstants';
import TownsHistoryListTown from './TownsHistoryListTown';

const styledListContainer = {
  width: widthListPanelBestiary,
  height: heightLeft,
  borderRight: '1px solid white',
  display: 'inline-block',
  float: 'left',
  overflowY: 'auto',
  overflowX: 'hidden',
};

class TownsHistoryList extends Component {
  render() {
    const { townsOrdered, showCity, showMerchant, showQuest } = this.props;
    return (
      <div style={styledListContainer} className="scrollbar">
        {townsOrdered &&
          Object.keys(townsOrdered).map((townKey, i) => {
            return (
              <TownsHistoryListTown
                townKey={townKey}
                showCity={showCity}
                index={i}
                showMerchant={showMerchant}
                showQuest={showQuest}
                townsOrdered={townsOrdered}
              />
            );
          })}
      </div>
    );
  }
}

TownsHistoryList.propTypes = {
  townsOrdered: PropTypes.array.isRequired,
  showCity: PropTypes.func.isRequired,
  showMerchant: PropTypes.func.isRequired,
  showQuest: PropTypes.func.isRequired,
};

export default TownsHistoryList;
