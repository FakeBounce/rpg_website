import React from 'react';
import PropTypes from 'prop-types';
import TownsHistoryListHeader from './TownsHistoryListHeader';
import TownsHistoryListMerchants from './TownsHistoryListMerchants';
import TownsHistoryListQuests from './TownsHistoryListQuests';

const styledTownContainer = { width: '100%' };

const TownsHistoryListTown = ({
  townsOrdered,
  showCity,
  showMerchant,
  showQuest,
  index,
  townKey,
}) => {
  return (
    <div style={styledTownContainer}>
      <TownsHistoryListHeader
        index={index}
        showCity={showCity}
        townKey={townKey}
      />
      <TownsHistoryListMerchants
        town={townsOrdered[townKey]}
        showMerchant={showMerchant}
      />
      <TownsHistoryListQuests
        town={townsOrdered[townKey]}
        showQuest={showQuest}
      />
    </div>
  );
};

TownsHistoryListTown.propTypes = {
  townsOrdered: PropTypes.object.isRequired,
  showCity: PropTypes.func.isRequired,
  showMerchant: PropTypes.func.isRequired,
  showQuest: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  townKey: PropTypes.string.isRequired,
};

export default TownsHistoryListTown;
