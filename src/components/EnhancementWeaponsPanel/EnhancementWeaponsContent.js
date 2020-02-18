import React, { Component } from "react";
import PropTypes from "prop-types";

import { heightLeft, widthLeft } from "../Utils/StyleConstants";
import EnhancementWeaponsMerchantList from "./EnhancementWeaponsMerchantList";
import EnhancementWeaponsCharacterWeaponList from "./EnhancementWeaponsCharacterWeaponList";
import { connect } from "react-redux";
// Not supported now
// import EnhancementWeaponsCharacterItemsList from './EnhancementWeaponsCharacterItemsList';

const styledEnhancementWeaponsList = {
  display: "inline-block",
  float: "left",
  position: "absolute",
  top: 40,
  left: 26,
  overflowY: "auto",
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 52}px`,
};

class EnhancementWeaponsContent extends Component {
  render() {
    const {
      merchants,
      currentMerchant,
      choosedItem,
      showEnhancers,
      itemsList,
    } = this.props;

    return (
      <div style={styledEnhancementWeaponsList} className="scrollbar">
        {parseInt(merchants[currentMerchant].weapons, 10) > 0 && (
          <EnhancementWeaponsMerchantList
            choosedItem={choosedItem}
            showEnhancers={showEnhancers}
            itemsList={itemsList}
          />
        )}
        <EnhancementWeaponsCharacterWeaponList
          choosedItem={choosedItem}
          showEnhancers={showEnhancers}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  merchants: store.merchants.merchantList,
  currentMerchant: store.merchants.currentMerchant,
});

EnhancementWeaponsContent.propTypes = {
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  itemsList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(EnhancementWeaponsContent);
