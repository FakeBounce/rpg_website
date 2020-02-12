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
    const { merchants, showedTown } = this.props;
    return (
      <div style={styledCityColumn} className="scrollbar">
        <TownsHistoryCityHeader name={showedTown.name} />
        {showedTown.merchantsList.map(m => {
          return (
            <TownsHistoryMerchantColumn
              key={"town-list-city-merchant-" + m}
              merchants={merchants}
              currentMerchant={m}
            />
          );
        })}
      </div>
    );
  }
}

TownsHistoryCity.propTypes = {
  merchants: PropTypes.array.isRequired,
  showedTown: PropTypes.object.isRequired,
};

export default TownsHistoryCity;
