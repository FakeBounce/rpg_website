import React from 'react';
import { heightLeft } from '../Utils/StyleConstants';

import PropTypes from 'prop-types';
import { colors } from '../Utils/Constants';
import { useSelector } from 'react-redux';

const styledBoxHeader = {
  width: '100%',
  paddingBottom: 5,
  textAlign: 'center',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
};

const styledQuestsContainer = {
  width: '100%',
  height: `${heightLeft / 2 - 20}px`,
  display: 'inline-block',
  float: 'left',
  position: 'absolute',
  top: 21,
  left: 0,
  overflowY: 'auto',
  backgroundColor: colors.background,
  color: 'white',
};

const StoryQuestList = ({ addQuestToTown }) => {
  const { quests, towns } = useSelector(store => ({
    towns: store.mapInfos.towns,
    quests: store.mapInfos.quests,
  }));

  return (
    <div style={styledQuestsContainer}>
      {quests &&
        quests.map((q, i) => {
          return (
            <div
              key={`quests-list-${q.name}`}
              onClick={() => addQuestToTown(i)}
              style={styledBoxHeader}
            >
              {q.name}
              {typeof q.town !== 'undefined' && q.town > -1 && (
                <span>({towns[q.town].name})</span>
              )}
              {q.validated && <span>(V)</span>}
            </div>
          );
        })}
    </div>
  );
};

StoryQuestList.propTypes = {
  addQuestToTown: PropTypes.func.isRequired,
};

export default StoryQuestList;
