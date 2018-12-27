import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightLeft } from '../Utils/StyleConstants';
import TownsHistoryList from './TownsHistoryList';
import TownsHistorySoloMerchant from './TownsHistorySoloMerchant';
import TownsHistoryCity from './TownsHistoryCity';
import TownsHistoryQuest from './TownsHistoryQuest';

const styledTownsHistoryContainer = {
  height: heightLeft,
  width: '100%',
  position: 'relative',
  backgroundColor: '#34495e',
  color: 'white',
};

class TownsHistoryPanel extends Component {
  state = {
    townsOrdered: {},
    showedMerchant: {},
    showedQuest: {},
    showedTown: {},
  };

  componentDidMount() {
    const { merchants, quests, towns } = this.props;
    const tempMandQ = {};
    towns.map(t => {
      tempMandQ[t.name] = { merchants: [], quests: [] };
      let merchantsNumber = 0;
      let questsNumber = 0;
      if (t.merchantsList && t.merchantsList.length > 0) {
        t.merchantsList.map(mIndex => {
          if (merchants[mIndex].isDiscovered) {
            tempMandQ[t.name].merchants.push(merchants[mIndex]);
            merchantsNumber += 1;
          }
          return null;
        });
      }
      if (t.questsList && t.questsList.length > 0) {
        t.questsList.map(qIndex => {
          if (quests[qIndex].town && quests[qIndex].town > -1) {
            tempMandQ[t.name].quests.push(quests[qIndex]);
            questsNumber += 1;
          }
          return null;
        });
      }
      if (merchantsNumber === 0 && questsNumber === 0) {
        delete tempMandQ[t.name];
      }
      return null;
    });
    this.setState(state => ({
      ...state,
      townsOrdered: { ...tempMandQ },
    }));
  }

  showMerchant = m => {
    this.setState(state => ({
      ...state,
      showedMerchant: { ...m },
      showedTown: {},
      showedQuest: {},
    }));
  };

  showQuest = q => {
    this.setState(state => ({
      ...state,
      showedQuest: { ...q },
      showedTown: {},
      showedMerchant: {},
    }));
  };

  showCity = city => {
    const { towns } = this.props;
    let showedTown = {};
    towns.map(t => {
      if (t.name === city) {
        showedTown = t;
      }
      return null;
    });
    this.setState(state => ({
      ...state,
      showedQuest: {},
      showedMerchant: {},
      showedTown: { ...showedTown },
    }));
  };

  render() {
    const { character, merchants } = this.props;
    const {
      townsOrdered,
      showedMerchant,
      showedTown,
      showedQuest,
    } = this.state;
    return (
      <div style={styledTownsHistoryContainer}>
        <TownsHistoryList
          townsOrdered={townsOrdered}
          showMerchant={this.showMerchant}
          showQuest={this.showQuest}
          showCity={this.showCity}
        />
        {showedMerchant.items && (
          <TownsHistorySoloMerchant
            character={character}
            showedMerchant={showedMerchant}
          />
        )}
        {showedQuest.name && <TownsHistoryQuest showedQuest={showedQuest} />}
        {showedTown.name && (
          <TownsHistoryCity
            character={character}
            merchants={merchants}
            showedTown={showedTown}
          />
        )}
      </div>
    );
  }
}

TownsHistoryPanel.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  towns: PropTypes.array.isRequired,
};

export default TownsHistoryPanel;
