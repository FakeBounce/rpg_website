import React from 'react';
import './QuestFullscreen.css';
import PropTypes from 'prop-types';

const QuestFullscreen = ({
  name,
  description,
  reward,
  dangerosity,
  hideQuest,
}) => {
  return (
    <div className='quest-fullscreen' onClick={hideQuest}>
      <img
        src={'./quests/empty_notice.png'}
        alt='A quest'
        className='quest-fullscreen-icon'
      />
      <div className='quest-fullscreen-name'>{name}</div>
      <div className='quest-fullscreen-description'>{description}</div>
      <div className='quest-fullscreen-dangerosity'>
        Danger : {dangerosity}
        /10
      </div>
      <div className='quest-fullscreen-reward'>Reward : {reward}g</div>
    </div>
  );
};

QuestFullscreen.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  dangerosity: PropTypes.number.isRequired,
  reward: PropTypes.number.isRequired,
  hideQuest: PropTypes.func.isRequired,
};

export default QuestFullscreen;
