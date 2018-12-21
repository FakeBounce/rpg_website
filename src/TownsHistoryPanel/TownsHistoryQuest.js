import React, { Component } from 'react';
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

class TownsHistoryQuest extends Component {
  render() {
    const { showedQuest } = this.props;
    return (
      <div style={styledQuestContainer}>
        <QuestFullscreen hideQuest={() => {}} {...showedQuest} />
      </div>
    );
  }
}

TownsHistoryQuest.propTypes = {
  showedQuest: PropTypes.object.isRequired,
};

export default TownsHistoryQuest;
