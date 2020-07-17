import React from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledQuest = {
  marginTop: 5,
  marginBottom: 5,
  cursor: cursorPointer,
};

const TownsHistoryListQuest = ({ showQuest, quest }) => {
  return (
    <div style={styledQuest} onClick={() => showQuest(quest)}>
      {quest.name}
    </div>
  );
};

TownsHistoryListQuest.propTypes = {
  showQuest: PropTypes.func.isRequired,
  quest: PropTypes.object.isRequired,
};

export default TownsHistoryListQuest;
