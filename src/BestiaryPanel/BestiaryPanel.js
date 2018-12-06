import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft } from '../Utils/StyleConstants';
import DefaultBeast from './DefaultBeast';
import Beast from './Beast';
import PNJ from './PNJ';
import {
  bestiaryFilters,
  bestiaryOrderBy,
  bestiaryOrderByType,
} from '../Utils/Constants';
import { sortAlphabetical, sortReversedAlphabetical } from '../Utils/Functions';

const styledBestiaryPanel = {
  overflowY: 'auto',
  height: heightLeft,
  width: '102%',
};

const styledBestiaryHeader = {
  height: 25,
  width: '100%',
};

class BestiaryPanel extends Component {
  state = {
    selectedFilter: 'All',
    selectedOrderBy: 'Default',
    selectedOrderByType: 'None',
    filteredBestiary: [...this.props.bestiary],
    selectedBeast: -1,
  };

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
      const tempBestiary = [...bestiary];
      if (value === 'Monster') {
        bestiary.map((b, i) => {
          if (!b.monster) {
            tempBestiary.splice(i, 1);
          }
          return null;
        });
      }
      if (value === 'PNJ') {
        bestiary.map((b, i) => {
          if (b.monster) {
            tempBestiary.splice(i, 1);
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
    }));
  };

  unselectBeast = () => {
    this.setState(state => ({
      ...state,
      selectedBeast: -1,
    }));
  };

  render() {
    const { isGameMaster, uid, bestiary } = this.props;
    const {
      selectedFilter,
      selectedOrderBy,
      selectedOrderByType,
      filteredBestiary,
      selectedBeast,
    } = this.state;

    return (
      <div style={styledBestiaryPanel}>
        <div style={styledBestiaryHeader}>
          <select
            value={selectedFilter}
            onChange={e => {
              this.onChangeFilter(e.target.value);
            }}
          >
            {bestiaryFilters.map(sts => {
              return (
                <option key={sts} value={sts}>
                  {sts}
                </option>
              );
            })}
          </select>
          <select
            value={selectedOrderByType}
            onChange={e => {
              this.onChangeOrderByType(e.target.value);
            }}
          >
            {bestiaryOrderByType.map(sts => {
              return (
                <option key={sts} value={sts}>
                  {sts}
                </option>
              );
            })}
          </select>
          <select
            value={selectedOrderBy}
            onChange={e => {
              this.onChangeOrderBy(e.target.value);
            }}
          >
            {bestiaryOrderBy.map(sts => {
              return (
                <option key={sts} value={sts}>
                  {sts}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <div style={{ width: '30%', display: 'inline-block', float: 'left' }}>
            {filteredBestiary.map((b, i) => {
              if (b.seen || isGameMaster) {
                if (typeof b[uid] !== 'undefined' || isGameMaster) {
                  return (
                    <div onClick={() => this.selectBeast(i)}>{b.name}</div>
                  );
                } else {
                  return <DefaultBeast {...b} />;
                }
              }
              return null;
            })}
          </div>
          <div style={{ width: '65%', display: 'inline-block', float: 'left' }}>
            {selectedBeast !== -1 &&
              (filteredBestiary[selectedBeast].monster ? (
                <Beast
                  name={filteredBestiary[selectedBeast].name}
                  image={filteredBestiary[selectedBeast].image}
                  text1={
                    filteredBestiary[selectedBeast][uid].text1 || isGameMaster
                      ? filteredBestiary[selectedBeast].text1
                      : ''
                  }
                  text2={
                    filteredBestiary[selectedBeast][uid].text2 || isGameMaster
                      ? filteredBestiary[selectedBeast].text2
                      : ''
                  }
                  text3={
                    filteredBestiary[selectedBeast][uid].text3 || isGameMaster
                      ? filteredBestiary[selectedBeast].text3
                      : ''
                  }
                  text4={
                    filteredBestiary[selectedBeast][uid].text4 || isGameMaster
                      ? filteredBestiary[selectedBeast].text4
                      : ''
                  }
                  dangerosity={
                    filteredBestiary[selectedBeast][uid].dangerosity
                      ? filteredBestiary[selectedBeast].dangerosity
                      : ''
                  }
                  taille={
                    filteredBestiary[selectedBeast][uid].taille
                      ? filteredBestiary[selectedBeast].taille
                      : ''
                  }
                  poids={
                    filteredBestiary[selectedBeast][uid].poids
                      ? filteredBestiary[selectedBeast].poids
                      : ''
                  }
                />
              ) : (
                <PNJ
                  name={filteredBestiary[selectedBeast].name}
                  image={filteredBestiary[selectedBeast].image}
                  text1={
                    filteredBestiary[selectedBeast][uid].text1 || isGameMaster
                      ? filteredBestiary[selectedBeast].text1
                      : ''
                  }
                  text2={
                    filteredBestiary[selectedBeast][uid].text2 || isGameMaster
                      ? filteredBestiary[selectedBeast].text2
                      : ''
                  }
                  text3={
                    filteredBestiary[selectedBeast][uid].text3 || isGameMaster
                      ? filteredBestiary[selectedBeast].text3
                      : ''
                  }
                  text4={
                    filteredBestiary[selectedBeast][uid].text4 || isGameMaster
                      ? filteredBestiary[selectedBeast].text4
                      : ''
                  }
                  age={
                    filteredBestiary[selectedBeast][uid].age
                      ? filteredBestiary[selectedBeast].age
                      : ''
                  }
                  taille={
                    filteredBestiary[selectedBeast][uid].taille
                      ? filteredBestiary[selectedBeast].taille
                      : ''
                  }
                  poids={
                    filteredBestiary[selectedBeast][uid].poids
                      ? filteredBestiary[selectedBeast].poids
                      : ''
                  }
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

BestiaryPanel.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  bestiary: PropTypes.array.isRequired,
};

export default BestiaryPanel;
