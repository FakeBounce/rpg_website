import React, { Component } from 'react';

const styledQuestHeader = {
  width: '50%',
  borderBottom: '1px dashed white',
  marginLeft: '25%',
  marginBottom: 5,
};

class TownsHistoryListQuestsHeader extends Component {
  render() {
    return <div style={styledQuestHeader}>Quests</div>;
  }
}

export default TownsHistoryListQuestsHeader;
