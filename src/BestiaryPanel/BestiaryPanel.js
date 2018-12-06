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
    selectedBeast: '-1',
  };

  onChangeFilter = value => {
    const { bestiary } = this.props;
    if (value === 'All') {
      this.setState(state => ({
        ...state,
        selectedType: value,
        filteredBestiary: [...bestiary],
      }));
    }
    if (value === 'Monster') {
      const tempBestiary = [...bestiary];
      bestiary.map((b, i) => {
        if (!b.monster) {
          tempBestiary.splice(i, 1);
        }
        return null;
      });
      this.setState(state => ({
        ...state,
        selectedType: value,
        filteredBestiary: [...tempBestiary],
      }));
    }
    if (value === 'PNJ') {
      const tempBestiary = [...bestiary];
      bestiary.map((b, i) => {
        if (b.monster) {
          tempBestiary.splice(i, 1);
        }
        return null;
      });
      this.setState(state => ({
        ...state,
        selectedType: value,
        filteredBestiary: [...tempBestiary],
      }));
    }
  };

  onChangeOrderByType = value => {
    if (value === 'None') {
      this.onChangeFilter(this.state.selectedFilter);
      if (this.state.selectedOrderBy !== 'Default') {
        this.onChangeOrderBy(this.state.selectedOrderBy);
      }
    }
    if (value === 'Monster') {
      const tempBestiary = [...this.state.filteredBestiary];
      tempBestiary.sort((a, b) => {
        if (!a.monster && b.monster) {
          return -1;
        }
        if (a.monster && !b.monster) {
          return 1;
        }
        return 0;
      });
      this.setState(state => ({
        ...state,
        selectedType: value,
        filteredBestiary: [...tempBestiary],
      }));
    }
    if (value === 'PNJ') {
      const tempBestiary = [...this.state.filteredBestiary];
      tempBestiary.sort((a, b) => {
        if (!a.monster && b.monster) {
          return 1;
        }
        if (a.monster && !b.monster) {
          return -1;
        }
        return 0;
      });
      this.setState(state => ({
        ...state,
        selectedType: value,
        filteredBestiary: [...tempBestiary],
      }));
    }
  };

  onChangeOrderBy = value => {
    const { uid } = this.props;
    if (value === 'Default') {
      this.onChangeFilter(this.state.selectedFilter);
      if (this.state.selectedOrderBy !== 'All') {
        this.onChangeOrderByType(this.state.selectedOrderByType);
      }
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
        selectedType: value,
        filteredBestiary: [...tempBestiary],
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
      selectedBeast: '-1',
    }));
  };

  render() {
    const { isGameMaster, uid } = this.props;
    const {
      selectedFilter,
      selectedOrderBy,
      selectedOrderByType,
      filteredBestiary,
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
        {filteredBestiary.map(b => {
          if (b.seen || isGameMaster) {
            if (typeof b[uid] !== 'undefined' || isGameMaster) {
              if (b.monster) {
                return (
                  <Beast
                    name={b.name}
                    image={b.image}
                    text1={b[uid].text1 || isGameMaster ? b.text1 : ''}
                    text2={b[uid].text2 || isGameMaster ? b.text2 : ''}
                    text3={b[uid].text3 || isGameMaster ? b.text3 : ''}
                    text4={b[uid].text4 || isGameMaster ? b.text4 : ''}
                    dangerosity={b[uid].dangerosity ? b.dangerosity : ''}
                    taille={b[uid].taille ? b.taille : ''}
                    poids={b[uid].poids ? b.poids : ''}
                  />
                );
              }
              return (
                <PNJ
                  name={b.name}
                  image={b.image}
                  text1={b[uid].text1 || isGameMaster ? b.text1 : ''}
                  text2={b[uid].text2 || isGameMaster ? b.text2 : ''}
                  text3={b[uid].text3 || isGameMaster ? b.text3 : ''}
                  text4={b[uid].text4 || isGameMaster ? b.text4 : ''}
                  age={b[uid].age ? b.age : ''}
                  taille={b[uid].taille ? b.taille : ''}
                  poids={b[uid].poids ? b.poids : ''}
                />
              );
            } else {
              return <DefaultBeast {...b} />;
            }
          }
          return null;
        })}
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
