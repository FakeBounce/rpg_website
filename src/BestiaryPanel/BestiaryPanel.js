import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  heightLeft,
  widthLeftBestiary,
  widthListPanelBestiary,
} from '../Utils/StyleConstants';
import { sortAlphabetical, sortReversedAlphabetical } from '../Utils/Functions';
import BestiaryHeader from './BestiaryHeader';
import BestiaryList from './BestiaryList';
import BestiaryProfile from './BestiaryProfile';
import firebase from 'firebase';
import BestiaryForm from './BestiaryForm';

const styledBestiaryPanel = {
  height: heightLeft,
  width: '100%',
  position: 'relative',
  backgroundColor: '#34495e',
  color: 'white',
};

class BestiaryPanel extends Component {
  state = {
    selectedFilter: 'All',
    selectedOrderBy: 'Default',
    selectedOrderByType: 'None',
    filteredBestiary: [...this.props.bestiary],
    selectedBeast: -1,
    isOnForm: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.bestiary.length !== nextProps.bestiary.length) {
      this.setState(state => ({
        ...state,
        filteredBestiary: [...nextProps.bestiary],
      }));
    }
  }

  onChangeFilter = value => {
    const { bestiary } = this.props;
    if (value === 'All') {
      this.setState(state => ({
        ...state,
        selectedFilter: value,
        filteredBestiary: [...bestiary],
        selectedBeast: -1,
      }));
    } else {
      const tempBestiary = [];
      if (value === 'Monster') {
        bestiary.map(b => {
          if (b.monster) {
            tempBestiary.push(b);
          }
          return null;
        });
      }
      if (value === 'PNJ') {
        bestiary.map(b => {
          if (!b.monster) {
            tempBestiary.push(b);
          }
          return null;
        });
      }
      this.setState(state => ({
        ...state,
        selectedFilter: value,
        filteredBestiary: [...tempBestiary],
        selectedBeast: -1,
      }));
    }
  };

  onChangeOrderByType = value => {
    if (value === 'None') {
      this.setState(
        state => ({
          ...state,
          selectedOrderByType: value,
        }),
        () => {
          this.onChangeFilter(this.state.selectedFilter);
          if (this.state.selectedOrderBy !== 'Default') {
            this.onChangeOrderBy(this.state.selectedOrderBy);
          }
        }
      );
    } else {
      const tempBestiary = [...this.state.filteredBestiary];
      if (value === 'Monster') {
        tempBestiary.sort((a, b) => {
          if (!a.monster && b.monster) {
            return -1;
          }
          if (a.monster && !b.monster) {
            return 1;
          }
          return 0;
        });
      }
      if (value === 'PNJ') {
        tempBestiary.sort((a, b) => {
          if (!a.monster && b.monster) {
            return 1;
          }
          if (a.monster && !b.monster) {
            return -1;
          }
          return 0;
        });
      }
      this.setState(state => ({
        ...state,
        selectedOrderByType: value,
        filteredBestiary: [...tempBestiary],
        selectedBeast: -1,
      }));
    }
  };

  onChangeOrderBy = value => {
    const { uid } = this.props;
    if (value === 'Default') {
      this.setState(
        state => ({
          ...state,
          selectedOrderBy: value,
        }),
        () => {
          this.onChangeFilter(this.state.selectedFilter);
          if (this.state.selectedOrderBy !== 'All') {
            this.onChangeOrderByType(this.state.selectedOrderByType);
          }
        }
      );
    } else {
      const tempBestiary = [...this.state.filteredBestiary];
      if (value === 'Alphabetical') {
        sortAlphabetical(tempBestiary);
      }
      if (value === 'Reversed alphabetical') {
        sortReversedAlphabetical(tempBestiary);
      }
      if (value === 'Knowledge') {
        tempBestiary.sort((a, b) => {
          if (Object.keys(a[uid]).length > Object.keys(b[uid]).length) {
            return 1;
          }
          if (Object.keys(a[uid]).length < Object.keys(b[uid]).length) {
            return -1;
          }
          return 0;
        });
      }
      if (value === 'Reversed knowledge') {
        tempBestiary.sort((a, b) => {
          if (Object.keys(a[uid]).length > Object.keys(b[uid]).length) {
            return 1;
          }
          if (Object.keys(a[uid]).length < Object.keys(b[uid]).length) {
            return -1;
          }
          return 0;
        });
      }
      this.setState(state => ({
        ...state,
        selectedOrderBy: value,
        filteredBestiary: [...tempBestiary],
        selectedBeast: -1,
      }));
    }
  };

  selectBeast = i => {
    this.setState(state => ({
      ...state,
      selectedBeast: i,
      isOnForm: false,
    }));
  };

  unselectBeast = () => {
    this.setState(state => ({
      ...state,
      selectedBeast: -1,
    }));
  };

  toggleSeenBeast = index => {
    const { filteredBestiary } = this.state;
    const { bestiary } = this.props;
    const tempBestiary = [...bestiary];
    const tempFilteredBestiary = [...filteredBestiary];

    tempBestiary.map((b, i) => {
      if (b.name === tempFilteredBestiary[index].name) {
        tempFilteredBestiary[index].seen = tempBestiary[i].seen = !b.seen;
      }
      return null;
    });
    this.setState(state => ({
      ...state,
      filteredBestiary: [...tempFilteredBestiary],
    }));

    firebase
      .database()
      .ref('stories/' + 0 + '/bestiary')
      .set(tempBestiary)
      .catch(error => {
        // Handle Errors here.
        this.triggerError(error);
      });
  };

  displayMonsterForm = () => {
    this.setState(state => ({
      ...state,
      isOnForm: true,
      selectedBeast: -1,
    }));
  };

  render() {
    const { isGameMaster, uid } = this.props;
    const {
      selectedFilter,
      selectedOrderBy,
      selectedOrderByType,
      filteredBestiary,
      selectedBeast,
      isOnForm,
    } = this.state;
    const { bestiary, doSetState, currentStory } = this.props;

    return (
      <div style={styledBestiaryPanel}>
        <img
          src={'./common/fiche.png'}
          style={{
            position: 'absolute',
            top: 25,
            left: widthListPanelBestiary,
            width: `${widthLeftBestiary}px`,
            height: `${heightLeft - 25}px`,
          }}
          alt="Cadre bestiaire"
        />
        <BestiaryHeader
          selectedOrderByType={selectedOrderByType}
          selectedOrderBy={selectedOrderBy}
          onChangeFilter={this.onChangeFilter}
          onChangeOrderBy={this.onChangeOrderBy}
          onChangeOrderByType={this.onChangeOrderByType}
          selectedFilter={selectedFilter}
        />
        <BestiaryList
          filteredBestiary={filteredBestiary}
          isGameMaster={isGameMaster}
          selectBeast={this.selectBeast}
          toggleSeenBeast={this.toggleSeenBeast}
          displayMonsterForm={this.displayMonsterForm}
        />
        {isOnForm && (
          <BestiaryForm
            bestiary={bestiary}
            doSetState={doSetState}
            currentStory={currentStory}
          />
        )}
        {selectedBeast !== -1 && (
          <BestiaryProfile
            isGameMaster={isGameMaster}
            uid={uid}
            beast={filteredBestiary[selectedBeast]}
          />
        )}
      </div>
    );
  }
}

BestiaryPanel.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  bestiary: PropTypes.array.isRequired,
  currentStory: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default BestiaryPanel;
