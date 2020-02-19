import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { heightLeft, widthLeftBestiary } from "../Utils/StyleConstants";
import TownsHistoryMerchantHeader from "./TownsHistoryMerchantHeader";
import TownsHistorySoloMerchantList from "./TownsHistorySoloMerchantList";
import firebase from "firebase";
import ItemDescriptionPanel from "../ItemDescriptionPanel";
import { connect } from "react-redux";

const styledMerchantColumn = {
  width: widthLeftBestiary / 3,
  height: heightLeft,
  display: "inline-block",
  position: "relative",
  float: "left",
  borderRight: "1px solid white",
  overflowY: "auto",
  overflowX: "hidden",
};

const styledItemColumn = {
  width: (widthLeftBestiary / 3) * 2 - 3,
  height: heightLeft,
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  overflowX: "hidden",
};

class TownsHistorySoloMerchant extends Component {
  state = {
    currentItem: {},
  };

  showItemDescription = i => {
    const { currentStory, showedMerchant } = this.props;
    firebase
      .database()
      .ref(
        "stories/" +
          currentStory +
          "/merchants/" +
          showedMerchant.realIndex +
          "/items/" +
          i,
      )
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          currentItem: snapshot.val(),
        }));
      });
  };

  render() {
    const { characterEducation, characterGold, showedMerchant } = this.props;
    const { currentItem } = this.state;
    return (
      <Fragment>
        <div style={styledMerchantColumn}>
          <TownsHistoryMerchantHeader currentMerchant={showedMerchant} />
          <TownsHistorySoloMerchantList
            showedMerchant={showedMerchant}
            showItemDescription={this.showItemDescription}
          />
        </div>

        {currentItem.name && (
          <div style={styledItemColumn}>
            <ItemDescriptionPanel
              {...currentItem}
              noBuy
              gold={characterGold}
              isHidden={characterEducation < currentItem.rarity * 9}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  characterGold: store.character.gold,
  characterEducation: store.character.education,
});

TownsHistorySoloMerchant.propTypes = {
  showedMerchant: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(TownsHistorySoloMerchant);
