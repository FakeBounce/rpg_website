import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import EnhancerItem from "./EnhancerItem";
import EnhancerSeparator from "./EnhancerSeparator";
import { connect } from "react-redux";

class EnhancerMerchantItems extends Component {
  render() {
    const {
      characterEducation,
      itemsList,
      merchants,
      currentMerchant,
      chooseEnhancer1,
      chooseEnhancer2,
      choosedEnhancer1,
      choosedEnhancer2,
      slots,
      currentTab,
    } = this.props;

    return (
      <Fragment>
        <EnhancerSeparator
          text={
            currentTab === "enhancements"
              ? "Choose enhancement (temporary) :"
              : "Choose enhancement (permanent) :"
          }
        />
        {parseInt(merchants[currentMerchant].enhancements, 10) > 0 &&
          Object.keys(itemsList).map(key => {
            const isHidden = characterEducation < itemsList[key].rarity * 9;
            if (
              itemsList[key].itemType === "enhancements" &&
              itemsList[key].slot <= slots &&
              itemsList[key].slot <=
                parseInt(merchants[currentMerchant].level, 10)
            ) {
              return (
                <EnhancerItem
                  key={`item-${itemsList[key].name}-${key}`}
                  {...itemsList[key]}
                  index={key}
                  isHidden={isHidden}
                  isSelected={
                    (choosedEnhancer1 &&
                      choosedEnhancer1.isFromMerchant &&
                      choosedEnhancer1.index === key) ||
                    (choosedEnhancer2 &&
                      choosedEnhancer2.isFromMerchant &&
                      choosedEnhancer2.index === key)
                  }
                  itemAction={() => {
                    if (parseInt(itemsList[key].slot, 10) === 1) {
                      chooseEnhancer1(true, itemsList[key], key);
                    } else {
                      chooseEnhancer2(true, itemsList[key], key);
                    }
                  }}
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
  currentStory: store.appState.currentStory,
  characterEducation: store.character.education,
});

EnhancerMerchantItems.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  itemsList: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(EnhancerMerchantItems);
