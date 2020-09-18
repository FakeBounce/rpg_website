import React from 'react';
import './Quest.css';
import PropTypes from 'prop-types';
import { questsPosition, questsRandom } from '../Utils/StyleConstants';
import useMapInfos from '../../hooks/useMapInfos';

const Quest = ({ position, index, icon }) => {
  const { showQuest } = useMapInfos();

  const getRandomStyle = () => {
    let rdm = '';
    this.props.randomStyle.map(value => {
      rdm += questsRandom[value] + ' ';
      return null;
    });
    return { transform: rdm };
  };

  return (
    <div
      className='quest'
      style={{
        ...questsPosition[position],
        ...getRandomStyle(),
      }}
      onClick={() => showQuest(index)}
    >
      <img src={'./quests/' + icon} alt='A quest' className='quest-icon' />
    </div>
  );
};

Quest.propTypes = {
  icon: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  randomStyle: PropTypes.array.isRequired,
  showQuest: PropTypes.func.isRequired,
};

export default Quest;
