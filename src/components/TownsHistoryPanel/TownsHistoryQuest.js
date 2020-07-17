import React from 'react';
import PropTypes from 'prop-types';
import { heightLeft } from '../Utils/StyleConstants';
import QuestFullscreen from '../QuestPanel/QuestFullscreen';

const styledQuestContainer = {
  position: 'relative',
  display: 'inline-block',
  width: 500,
  height: 500,
  marginTop: (heightLeft - 500) / 2,
  color: 'black',
};

const TownsHistoryQuest = ({ showedQuest }) => {
  return (
    <div style={styledQuestContainer}>
      <QuestFullscreen hideQuest={() => {}} {...showedQuest} />
    </div>
  );
};

TownsHistoryQuest.propTypes = {
  showedQuest: PropTypes.object.isRequired,
};

export default TownsHistoryQuest;
