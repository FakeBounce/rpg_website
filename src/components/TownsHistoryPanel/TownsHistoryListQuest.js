import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cursorPointer } from '../Utils/StyleConstants';

const styledQuest = {
  marginTop: 5,
  marginBottom: 5,
  cursor: cursorPointer,
};

class TownsHistoryListQuest extends Component {
  render() {
    const { showQuest, quest } = this.props;
    return (
      <div style={styledQuest} onClick={() => showQuest(quest)}>
        {quest.name}
      </div>
    );
  }
}

TownsHistoryListQuest.propTypes = {
  showQuest: PropTypes.func.isRequired,
  quest: PropTypes.object.isRequired,
};

export default TownsHistoryListQuest;
