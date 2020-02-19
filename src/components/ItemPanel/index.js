import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "../Utils/StyleConstants";
import ItemList from "./ItemList";
import Cadre from "../Utils/Cadre";
import firebase from "firebase";
import { connect } from "react-redux";

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
  paddingHorizontal: 10,
};

class ItemPanel extends PureComponent {
  showItemDescription = i => {
    const { merchants, currentMerchant, doSetState, currentStory } = this.props;
    doSetState(
      {
        isItemDescriptionShowed: true,
        itemToDescribe: merchants[currentMerchant].items[i],
        itemDescribed: i,
      },
      () => {
        // Mandatory ?
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
            this.props.doSetState({
              itemToDescribe: snapshot.val(),
            });
          });
      },
    );
  };

  render() {
    const { itemsList } = this.props;

    return (
      <div style={styledMapSide}>
        <Cadre />
        <ItemList
          itemsList={itemsList}
          showItemDescription={this.showItemDescription}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
});

ItemPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  itemsList: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ItemPanel);