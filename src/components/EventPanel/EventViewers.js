import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { colors } from '../Utils/Constants';
import { cursorPointer } from '../Utils/StyleConstants';
import { useEventContext } from '../../contexts/eventContext';

const styledEventViewersContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const styledEventViewersListContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const styledIsViewing = {
  height: 30,
  padding: 5,
  textAlign: 'center',
  backgroundColor: colors.backgroundSelected,
  border: '1px solid white',
  cursor: cursorPointer,
};

const styledIsNotViewing = {
  height: 30,
  padding: 5,
  textAlign: 'center',
  border: '1px solid white',
  cursor: cursorPointer,
};

const EventViewers = () => {
  const {
    viewers,
    removeToViewer,
    addAllViewers,
    removeAllViewers,
    addToViewer,
  } = useEventContext();
  
  const { gameMaster, storyCharacters } = useSelector(store => ({
    gameMaster: store.appState.gameMaster,
    storyCharacters: store.team.characters,
  }));

  return (
    <div style={styledEventViewersContainer}>
      <div style={styledEventViewersListContainer}>
        <div
          onClick={addAllViewers}
          style={{ ...styledIsNotViewing, width: '100%' }}
        >
          All
        </div>

        {storyCharacters.map((sc, i) => {
          if (gameMaster !== sc.userUid) {
            let isAViewer = false;
            viewers.map(v => {
              if (v === sc.userUid) {
                isAViewer = true;
              }
              return null;
            });
            const styleToApply = isAViewer
              ? styledIsViewing
              : styledIsNotViewing;
            return (
              <div
                key={`sc-viewer-${sc.userUid}`}
                onClick={
                  isAViewer
                    ? () => removeToViewer(sc.userUid)
                    : () => addToViewer(sc.userUid)
                }
                style={
                  i === storyCharacters.length - 1
                    ? {
                        ...styleToApply,
                        // flex: 1,
                      }
                    : styleToApply
                }
              >
                {sc.name}
              </div>
            );
          }
          return null;
        })}
        <div
          onClick={removeAllViewers}
          style={{ ...styledIsNotViewing, width: '100%' }}
        >
          None
        </div>
      </div>
    </div>
  );
};

EventViewers.propTypes = {
  viewers: PropTypes.array.isRequired,
  removeToViewer: PropTypes.func.isRequired,
  addToViewer: PropTypes.func.isRequired,
  addAllViewers: PropTypes.func.isRequired,
  removeAllViewers: PropTypes.func.isRequired,
};

export default EventViewers;
