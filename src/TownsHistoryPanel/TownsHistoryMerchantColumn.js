import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { heightLeft, widthLeftBestiary } from "../Utils/StyleConstants";
import TownsHistoryMerchantHeader from "./TownsHistoryMerchantHeader";
import TownsHistoryMerchantColumnList from "./TownsHistoryMerchantColumnList";
import firebase from "firebase";
import ItemDescriptionPanel from "../ItemDescriptionPanel/ItemDescriptionPanel";
import Item from "../ItemPanel/Item";

const styledTownColumn = {
  width: widthLeftBestiary / 3 - 3,
  marginTop: 25,
  height: heightLeft - 25,
  display: "inline-block",
  float: "left",
  borderRight: "1px solid white",
  flex: "0 0 auto",
};

const styledItemColumn = {
  width: widthLeftBestiary / 3 - 3,
  height: heightLeft,
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  flex: "0 0 auto",
};

class TownsHistoryMerchantColumn extends Component {
  state = {
    currentItem: {},
  };

  showItemDescription = i => {
    const { currentStory, currentMerchant } = this.props;

    firebase
      .database()
      .ref(
        "stories/" +
          currentStory +
          "/merchants/" +
          currentMerchant +
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
    const { character, merchants, currentMerchant, currentStory } = this.props;
    const { currentItem } = this.state;
    return (
      <Fragment>
        <div style={styledTownColumn}>
          <TownsHistoryMerchantHeader
            currentMerchant={merchants[currentMerchant]}
          />
          <TownsHistoryMerchantColumnList
            currentMerchant={currentMerchant}
            currentStory={currentStory}
            merchants={merchants}
            character={character}
            showItemDescription={this.showItemDescription}
          />
        </div>

        {currentItem &&
          currentItem.name && (
            <div style={styledItemColumn}>
              <ItemDescriptionPanel
                {...currentItem}
                noBuy
                gold={character.gold}
                isHidden={character.education < currentItem.rarity * 9}
              />
            </div>
          )}
      </Fragment>
    );
  }
}

TownsHistoryMerchantColumn.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  currentMerchant: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
};

export default TownsHistoryMerchantColumn;
