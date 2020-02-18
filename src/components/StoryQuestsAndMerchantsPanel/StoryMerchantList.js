import React, { Component } from "react";
import { heightLeft } from "../Utils/StyleConstants";

import PropTypes from "prop-types";
import { colors } from "../Utils/Constants";
import { connect } from "react-redux";

const styledBoxHeader = {
  flex: 1,
  borderBottom: "1px solid white",
  width: "100%",
  paddingBottom: 5,
  textAlign: "center",
  display: "inline-block",
  position: "relative",
  backgroundColor: colors.background,
  color: "white",
};

const styledMerchantsContainer = {
  width: "100%",
  height: `${heightLeft / 2 - 20}px`,
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: 21,
  left: 0,
  overflowY: "auto",
  backgroundColor: colors.background,
  color: "white",
};

class StoryMerchantList extends Component {
  render() {
    const { towns, merchants, addMerchantToTown } = this.props;
    return (
      <div style={styledMerchantsContainer}>
        {merchants &&
          merchants.map((m, i) => {
            return (
              <div onClick={() => addMerchantToTown(i)} style={styledBoxHeader}>
                <img
                  src={`./merchants/${m.icon}`}
                  style={{ maxWidth: 45, maxHeight: 45, float: "left" }}
                  alt={`${m.name}`}
                />
                {m.name}
                {typeof m.town !== "undefined" && m.town > -1 && (
                  <span>({towns[m.town].name})</span>
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  towns: store.mapInfos.towns,
  merchants: store.merchants.merchantList,
});

StoryMerchantList.propTypes = {
  addMerchantToTown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(StoryMerchantList);
