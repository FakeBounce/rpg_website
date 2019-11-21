import React, { Component } from "react";
import PropTypes from "prop-types";
import { heightLeft, widthLeftBestiary } from "../Utils/StyleConstants";
import TownsHistoryCityHeader from "./TownsHistoryCityHeader";
import TownsHistoryMerchantColumn from "./TownsHistoryMerchantColumn";

const styledCityColumn = {
  width: widthLeftBestiary - 1,
  height: heightLeft,
  display: "flex",
  position: "relative",
  float: "left",
  overflowX: "scroll",
  overflowY: "hidden",
};

class TownsHistoryCity extends Component {
  render() {
    const { character, merchants, showedTown, currentStory } = this.props;
    return (
      <div style={styledCityColumn} className="scrollbar">
        <TownsHistoryCityHeader name={showedTown.name} />
        {showedTown.merchantsList.map(m => {
          return (
            <TownsHistoryMerchantColumn
              key={"town-list-city-merchant-" + m}
              character={character}
              merchants={merchants}
              currentMerchant={m}
              currentStory={currentStory}
            />
          );
        })}
      </div>
    );
  }
}

TownsHistoryCity.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  showedTown: PropTypes.object.isRequired,
  currentStory: PropTypes.number.isRequired,
};

export default TownsHistoryCity;
