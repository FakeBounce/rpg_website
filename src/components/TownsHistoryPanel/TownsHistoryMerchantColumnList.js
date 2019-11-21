import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Item from "../ItemPanel/Item";
import { heightLeft } from "../Utils/StyleConstants";

const styledMerchantList = {
  width: "100%",
  height: heightLeft - 52,
  position: "relative",
  overflowY: "auto",
  overflowX: "hidden",
};

class TownsHistoryMerchantColumnList extends Component {
  render() {
    const {
      character,
      merchants,
      currentMerchant,
      showItemDescription,
    } = this.props;
    return (
      <Fragment>
        <div style={styledMerchantList} className="scrollbar">
          {Object.keys(merchants[currentMerchant].items).map(iKey => {
            return (
              <Item
                key={"town-list-column-merchant-item-" + iKey}
                index={iKey}
                showItemDescription={showItemDescription}
                isHidden={
                  character.education <
                  parseInt(merchants[currentMerchant].items[iKey].rarity, 10) *
                    9
                }
                {...merchants[currentMerchant].items[iKey]}
              />
            );
          })}
        </div>
      </Fragment>
    );
  }
}

TownsHistoryMerchantColumnList.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  currentMerchant: PropTypes.number.isRequired,
  showItemDescription: PropTypes.func.isRequired,
};

export default TownsHistoryMerchantColumnList;