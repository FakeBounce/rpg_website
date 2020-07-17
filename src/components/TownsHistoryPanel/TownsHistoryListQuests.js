import React from 'react';
import PropTypes from 'prop-types';
import TownsHistoryListQuestsHeader from './TownsHistoryListQuestsHeader';
import TownsHistoryListQuest from './TownsHistoryListQuest';

const TownsHistoryListQuests = ({ town, showQuest }) => {
  return (
    <>
      {town.quests.length > 0 && <TownsHistoryListQuestsHeader />}
      {town.quests.map(q => {
        return (
          <TownsHistoryListQuest
            key={'town-list-quest-' + q.name}
            showQuest={showQuest}
            quest={q}
          />
        );
      })}
    </>
  );
};

TownsHistoryListQuests.propTypes = {
  town: PropTypes.object.isRequired,
  showQuest: PropTypes.func.isRequired,
};

export default TownsHistoryListQuests;
