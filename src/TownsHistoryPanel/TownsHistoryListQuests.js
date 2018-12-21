import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TownsHistoryListQuestsHeader from './TownsHistoryListQuestsHeader';
import TownsHistoryListQuest from './TownsHistoryListQuest';

class TownsHistoryListQuests extends Component {
  render() {
    const { town, showQuest } = this.props;
    return (
      <Fragment>
        {town.quests.length > 0 && <TownsHistoryListQuestsHeader />}
        {town.quests.map(q => {
          return <TownsHistoryListQuest showQuest={showQuest} quest={q} />;
        })}
      </Fragment>
    );
  }
}

TownsHistoryListQuests.propTypes = {
  town: PropTypes.object.isRequired,
  showQuest: PropTypes.func.isRequired,
};

export default TownsHistoryListQuests;
