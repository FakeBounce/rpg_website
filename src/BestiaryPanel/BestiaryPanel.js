import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, imageSize } from '../Utils/StyleConstants';
import PNJ from './PNJ';
import { sortAlphabetical, sortReversedAlphabetical } from '../Utils/Functions';
import BestiaryHeader from './BestiaryHeader';
import BestiaryList from './BestiaryList';
import BestiaryProfile from './BestiaryProfile';
import firebase from 'firebase';
import FileUploader from '../CharacterCreation/FileUploader';
import ButtonLarge from '../Utils/ButtonLarge';
import { initialBestiaryPanel } from '../Utils/Constants';

const styledBestiaryPanel = {
  height: heightLeft,
  width: '100%',
};

class BestiaryPanel extends Component {
  state = initialBestiaryPanel;

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

  onChange = (name, value) => {
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  onDrop = picture => {
    const { triggerError, chatInput, doSetState } = this.props;

    const path = 'images/bestiary/' + picture[picture.length - 1].name;
    this.setState(state => ({
      ...state,
      image: picture[picture.length - 1].name,
    }));

    // firebase
    //   .storage()
    //   .ref()
    //   .child(path)
    //   .put(picture[picture.length - 1])
    //   .then(() => {
    //     firebase
    //       .storage()
    //       .ref()
    //       .child(path)
    //       .getDownloadURL()
    //       .then(url => {
    //         this.setState(state => ({
    //           ...state,
    //           image: url,
    //           imagePath: path,
    //         }));
    //       })
    //       .catch(error => {
    //         // Handle any errors
    //         triggerError(error);
    //       });
    //   });
  };

  validate = () => {
    const {
      name,
      monster,
      image,
      text1,
      text2,
      text3,
      text4,
      age,
      taille,
      poids,
      known,
      dangerosity,
    } = this.state;
    const { bestiary } = this.props;

    const tempBestiary = [...bestiary];
    tempBestiary.push({
      name,
      monster,
      image,
      text1,
      text2,
      text3,
      text4,
      age,
      taille,
      poids,
      known,
      dangerosity,
      seen: false,
    });

    firebase
      .database()
      .ref('stories/' + 0 + '/bestiary')
      .set(tempBestiary)
      .then(() => {
        this.setState(state => ({
          ...initialBestiaryPanel,
        }));
      })
      .catch(error => {
        // Handle Errors here.
        // this.triggerError(error);
        console.log('error', error);
      });
  };

  render() {
    const { isGameMaster, uid } = this.props;
    const {
      selectedFilter,
      selectedOrderBy,
      selectedOrderByType,
      filteredBestiary,
      selectedBeast,
      name,
      monster,
      image,
      text1,
      text2,
      text3,
      text4,
      age,
      taille,
      poids,
      known,
      dangerosity,
      isOnForm,
    } = this.state;

    return (
      <div style={styledBestiaryPanel}>
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
          <div
            style={{
              height: heightLeft,
              width: '100%',
            }}
          >
            <div style={{ height: 25 }}>New Monster</div>
            Name :
            <input
              type="text"
              value={name}
              name="name"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
            <FileUploader
              onDrop={this.onDrop}
              buttonText="+"
              fileContainerStyle={{ padding: 0, margin: 0, display: 'block' }}
              buttonStyles={{
                width: 20,
                padding: 0,
                margin: 0,
                border: '1px solid #3f4257',
              }}
              withIcon={false}
              label=""
            />
            {image !== '' && (
              <img src={'./bestiary/' + image} style={{ width: 100 }} />
            )}
            <div onClick={() => this.onChange('known', !known)}>
              {known ? 'Is known' : 'Is unknown'}
            </div>
            <div onClick={() => this.onChange('monster', !monster)}>
              {monster ? 'Is a monster' : 'Is a NPC'}
            </div>
            Text1 :
            <input
              type="text"
              value={text1}
              name="text1"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
            Text2 :
            <input
              type="text"
              value={text2}
              name="text2"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
            Text3 :
            <input
              type="text"
              value={text3}
              name="text3"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
            Text4 :
            <input
              type="text"
              value={text4}
              name="text4"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
            {monster ? (
              <Fragment>
                Dangerosity :
                <input
                  type="text"
                  value={dangerosity}
                  name="dangerosity"
                  onChange={e => {
                    this.onChange(e.target.name, e.target.value);
                  }}
                />
              </Fragment>
            ) : (
              <Fragment>
                Age :
                <input
                  type="text"
                  value={age}
                  name="age"
                  onChange={e => {
                    this.onChange(e.target.name, e.target.value);
                  }}
                />
              </Fragment>
            )}
            Taille :
            <input
              type="text"
              value={taille}
              name="taille"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
            Poids :
            <input
              type="text"
              value={poids}
              name="poids"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
            <ButtonLarge onClick={this.validate}>Submit</ButtonLarge>
          </div>
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
};

export default BestiaryPanel;
