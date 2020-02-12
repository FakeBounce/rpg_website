import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import EnhancementWeaponsItem from "./EnhancementWeaponsItem";
import EnhancementWeaponsSeparator from "./EnhancementWeaponsSeparator";
import { connect } from "react-redux";

class EnhancementWeaponsMerchantList extends Component {
  render() {
    const {
      characterEducation,
      itemsList,
      choosedItem,
      showEnhancers,
    } = this.props;

    return (
      <Fragment>
        <EnhancementWeaponsSeparator text="Proposed weapons :" />
        {Object.keys(itemsList).map(key => {
          const isHidden = characterEducation < itemsList[key].rarity * 9;
          if (itemsList[key].itemType === "weapons") {
            return (
              <EnhancementWeaponsItem
                key={`item-${itemsList[key].name}-${key}`}
                {...itemsList[key]}
                index={key}
                isHidden={isHidden}
                isSelected={
                  choosedItem &&
                  choosedItem.isFromMerchant &&
                  choosedItem.index === key
                }
                itemAction={() => showEnhancers(true, itemsList[key], key)}
                slot={itemsList[key].slots}
              />
            );
          }
          return null;
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  characterEducation: store.education,
});

EnhancementWeaponsMerchantList.propTypes = {
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  itemsList: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(EnhancementWeaponsMerchantList);
