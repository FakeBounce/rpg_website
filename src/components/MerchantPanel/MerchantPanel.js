import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "../Utils/StyleConstants";
import MerchantList from "./MerchantList";
import Cadre from "../Utils/Cadre";
import firebase from "firebase";
import { connect } from "react-redux";
import { setCurrentMerchant } from "../../redux/actions/actionsMerchants";

const styledMapSide = {
  width: `${widthLeft / 2 - 20}px`,
  height: `${heightLeft / 2}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
  paddingHorizontal: 20,
};

class MerchantPanel extends PureComponent {
  showItems = (list, index) => {
    const { currentStory, dispatchSetCurrentMerchant, doSetState } = this.props;
    doSetState(
      {
        isItemShowed: true,
        itemsList: list,
        currentMerchant: index,
      },
      () => {
        dispatchSetCurrentMerchant(index);
        firebase
          .database()
          .ref("stories/" + currentStory + "/merchants/" + index + "/items")
          .on("value", snapshot => {
            doSetState({
              itemsList: snapshot.val(),
            });
          });
      },
    );
  };

  render() {
    const { merchantsList } = this.props;

    return (
      <div style={styledMapSide}>
        <Cadre />
        <MerchantList
          merchantsList={merchantsList}
          showItems={this.showItems}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetCurrentMerchant: payload => {
      dispatch(setCurrentMerchant(payload));
    },
  };
};

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  currentMerchant: store.merchants.currentMerchant,
  merchants: store.merchants.merchantList,
});

MerchantPanel.propTypes = {
  merchantsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
  dispatchSetCurrentMerchant: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantPanel);
