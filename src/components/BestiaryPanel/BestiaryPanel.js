import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  heightLeft,
  widthLeftBestiary,
  widthListPanelBestiary,
} from "../Utils/StyleConstants";
import BestiaryHeader from "./BestiaryHeader";
import BestiaryList from "./BestiaryList";
import BestiaryProfile from "./BestiaryProfile";
import firebase from "firebase";
import BestiaryForm from "./BestiaryForm";
import { colors } from "../Utils/Constants";
import { connect } from "react-redux";

const styledBestiaryPanel = {
  height: heightLeft,
  width: "100%",
  position: "relative",
  backgroundColor: colors.background,
  color: colors.text,
};

class BestiaryPanel extends Component {
  state = {
    selectedFilter: "All",
    selectedOrderBy: "Default",
    selectedOrderByType: "None",
    filteredBestiary: { ...this.props.bestiary },
    selectedBeast: -1,
    isOnForm: false,
    isOnEditForm: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      Object.keys(this.props.bestiary).length !==
      Object.keys(nextProps.bestiary).length
    ) {
      this.setState(state => ({
        ...state,
        filteredBestiary: { ...nextProps.bestiary },
      }));
    }
  }

  onChangeFilter = value => {
    const { bestiary } = this.props;
    if (value === "All") {
      this.setState(state => ({
        ...state,
        selectedFilter: value,
        filteredBestiary: { ...bestiary },
        selectedBeast: -1,
      }));
    } else {
      const tempBestiary = {};
      if (value === "Monster") {
        Object.keys(bestiary).map(bKey => {
          if (bestiary[bKey].monster) {
            tempBestiary[bKey] = { ...bestiary[bKey], key: bKey };
          }
          return null;
        });
      }
      if (value === "PNJ") {
        Object.keys(bestiary).map(bKey => {
          if (!bestiary[bKey].monster) {
            tempBestiary[bKey] = { ...bestiary[bKey], key: bKey };
          }
          return null;
        });
      }
      this.setState(state => ({
        ...state,
        selectedFilter: value,
        filteredBestiary: { ...tempBestiary },
        selectedBeast: -1,
      }));
    }
  };

  onChangeOrderByType = value => {
    const { filteredBestiary, selectedOrderBy, selectedFilter } = this.state;
    if (value === "None") {
      this.setState(
        state => ({
          ...state,
          selectedOrderByType: value,
        }),
        () => {
          this.onChangeFilter(selectedFilter);
          if (selectedOrderBy !== "Default") {
            this.onChangeOrderBy(selectedOrderBy);
          }
        },
      );
    } else {
      const tempBestiary = {};

      if (value === "Monster") {
        Object.keys(filteredBestiary)
          .sort((a, b) => {
            if (!filteredBestiary[a].monster && filteredBestiary[b].monster) {
              return 1;
            }
            if (filteredBestiary[a].monster && !filteredBestiary[b].monster) {
              return -1;
            }
            return 0;
          })
          .forEach(key => {
            tempBestiary[key] = filteredBestiary[key];
          });
      }
      if (value === "PNJ") {
        Object.keys(filteredBestiary)
          .sort((a, b) => {
            if (!filteredBestiary[a].monster && filteredBestiary[b].monster) {
              return -1;
            }
            if (filteredBestiary[a].monster && !filteredBestiary[b].monster) {
              return 1;
            }
            return 0;
          })
          .forEach(key => {
            tempBestiary[key] = filteredBestiary[key];
          });
      }
      this.setState(state => ({
        ...state,
        selectedOrderByType: value,
        filteredBestiary: tempBestiary,
        selectedBeast: -1,
      }));
    }
  };

  onChangeOrderBy = value => {
    const { uid } = this.props;
    const {
      selectedFilter,
      selectedOrderBy,
      selectedOrderByType,
      filteredBestiary,
    } = this.state;
    if (value === "Default") {
      this.setState(
        state => ({
          ...state,
          selectedOrderBy: value,
        }),
        () => {
          this.onChangeFilter(selectedFilter);
          if (selectedOrderBy !== "All") {
            this.onChangeOrderByType(selectedOrderByType);
          }
        },
      );
    } else {
      const tempBestiary = {};
      if (value === "Alphabetical") {
        Object.keys(filteredBestiary)
          .sort((a, b) => {
            if (filteredBestiary[a].name > filteredBestiary[b].name) {
              return 1;
            }
            if (filteredBestiary[a].name < filteredBestiary[b].name) {
              return -1;
            }
            return 0;
          })
          .forEach(key => {
            tempBestiary[key] = filteredBestiary[key];
          });
      }
      if (value === "Reversed alphabetical") {
        Object.keys(filteredBestiary)
          .sort((a, b) => {
            if (filteredBestiary[a].name > filteredBestiary[b].name) {
              return -1;
            }
            if (filteredBestiary[a].name < filteredBestiary[b].name) {
              return 1;
            }
            return 0;
          })
          .forEach(key => {
            tempBestiary[key] = filteredBestiary[key];
          });
      }
      if (value === "Knowledge") {
        Object.keys(filteredBestiary)
          .sort((a, b) => {
            if (
              Object.keys(filteredBestiary[a][uid]).length >
              Object.keys(filteredBestiary[b][uid]).length
            ) {
              return 1;
            }
            if (
              Object.keys(filteredBestiary[a][uid]).length <
              Object.keys(filteredBestiary[b][uid]).length
            ) {
              return -1;
            }
            return 0;
          })
          .forEach(key => {
            tempBestiary[key] = filteredBestiary[key];
          });
      }
      if (value === "Reversed knowledge") {
        Object.keys(filteredBestiary)
          .sort((a, b) => {
            if (
              Object.keys(filteredBestiary[a][uid]).length >
              Object.keys(filteredBestiary[b][uid]).length
            ) {
              return -1;
            }
            if (
              Object.keys(filteredBestiary[a][uid]).length <
              Object.keys(filteredBestiary[b][uid]).length
            ) {
              return 1;
            }
            return 0;
          })
          .forEach(key => {
            tempBestiary[key] = filteredBestiary[key];
          });
      }
      this.setState(state => ({
        ...state,
        selectedOrderBy: value,
        filteredBestiary: { ...tempBestiary },
        selectedBeast: -1,
      }));
    }
  };

  selectBeast = i => {
    this.setState(state => ({
      ...state,
      selectedBeast: i,
      isOnForm: false,
      isOnEditForm: false,
    }));
  };

  editBeast = () => {
    this.setState(state => ({
      ...state,
      isOnEditForm: true,
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
    const { bestiary, currentStory } = this.props;
    const tempBestiary = { ...bestiary };
    const tempFilteredBestiary = { ...filteredBestiary };

    tempFilteredBestiary[index].seen = tempBestiary[index].seen = !tempBestiary[
      index
    ].seen;

    this.setState(state => ({
      ...state,
      filteredBestiary: { ...tempFilteredBestiary },
    }));

    firebase
      .database()
      .ref("stories/" + currentStory + "/bestiary")
      .set(tempBestiary)
      .catch(error => {
        // Handle Errors here.
        this.triggerError(error);
      });
    if (tempFilteredBestiary[index].seen) {
      firebase
        .database()
        .ref("stories/" + currentStory + "/tempoImage")
        .set("bestiary/" + tempFilteredBestiary[index].image)
        .catch(error => {
          // Handle Errors here.
          console.log("Error", error);
        });
    }
  };

  displayMonsterForm = () => {
    this.setState(state => ({
      ...state,
      isOnForm: true,
      isOnEditForm: false,
      selectedBeast: -1,
    }));
  };

  render() {
    const { uid } = this.props;
    const {
      selectedFilter,
      selectedOrderBy,
      selectedOrderByType,
      filteredBestiary,
      selectedBeast,
      isOnForm,
      isOnEditForm,
    } = this.state;
    const { bestiary, doSetState } = this.props;

    return (
      <div style={styledBestiaryPanel}>
        <img
          src={"./common/fiche.png"}
          style={{
            position: "absolute",
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
          selectBeast={this.selectBeast}
          toggleSeenBeast={this.toggleSeenBeast}
          displayMonsterForm={this.displayMonsterForm}
        />
        {isOnForm && (
          <BestiaryForm bestiary={bestiary} doSetState={doSetState} />
        )}
        {selectedBeast !== -1 &&
          (isOnEditForm ? (
            <BestiaryForm
              bestiary={bestiary}
              doSetState={doSetState}
              beast={filteredBestiary[selectedBeast]}
            />
          ) : (
            <BestiaryProfile
              beast={filteredBestiary[selectedBeast]}
              editBeast={this.editBeast}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  uid: store.userInfos.uid,
});

BestiaryPanel.propTypes = {
  bestiary: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(BestiaryPanel);
