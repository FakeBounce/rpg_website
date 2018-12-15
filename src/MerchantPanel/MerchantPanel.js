import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import MerchantList from './MerchantList';
import Cadre from '../Utils/Cadre';
import firebase from "firebase";

const styledMapSide = {
  width: `${widthLeft / 2 - 20}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 20,
};

class MerchantPanel extends PureComponent {
  showItems = (list, index) => {
    this.props.doSetState({
      isItemShowed: true,
      itemsList: list,
      currentMerchant: index,
    }, () => {
      firebase
        .database()
        .ref('stories/0/merchants/'+index+'/items')
        .on('value', snapshot => {
          this.props.doSetState({
            itemsList: snapshot.val(),
          });
        });
    });
  };

  render() {
    const { merchantsList, merchants, currentMerchant } = this.props;

    return (
      <div style={styledMapSide}>
        <Cadre />
        <MerchantList
          currentMerchant={currentMerchant}
          merchantsList={merchantsList}
          merchants={merchants}
          showItems={this.showItems}
        />
      </div>
    );
  }
}

MerchantPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  merchantsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default MerchantPanel;
