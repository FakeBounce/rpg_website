import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "../ItemPanel/Item";
import { heightLeft } from "../Utils/StyleConstants";
import { connect } from "react-redux";

const styledListContainer = {
  width: "100%",
  height: heightLeft - 26,
  display: "inline-block",
  position: "relative",
  float: "left",
  borderRight: "1px solid white",
  overflowY: "auto",
  overflowX: "hidden",
};

class TownsHistorySoloMerchantList extends Component {
  render() {
    const {
      characterEducation,
      showedMerchant,
      showItemDescription,
    } = this.props;
    return (
      <div style={styledListContainer} className="scrollbar">
        {Object.keys(showedMerchant.items).map(iKey => {
          return (
            <Item
              key={"town-list-merchant-item-" + iKey}
              index={iKey}
              showItemDescription={showItemDescription}
              isHidden={
                characterEducation <
                parseInt(showedMerchant.items[iKey].rarity, 10) * 9
              }
              {...showedMerchant.items[iKey]}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  characterEducation: store.character.education,
});

TownsHistorySoloMerchantList.propTypes = {
  showedMerchant: PropTypes.object.isRequired,
  showItemDescription: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TownsHistorySoloMerchantList);
