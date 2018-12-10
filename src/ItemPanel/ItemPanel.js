import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft, styledCadre } from "../Utils/StyleConstants";
import ItemList from './ItemList';

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
};

class ItemPanel extends Component {
  showItemDescription = i => {
    const { merchants, currentMerchant, doSetState } = this.props;
    doSetState({
      isItemDescriptionShowed: true,
      itemToDescribe: merchants[currentMerchant].items[i],
      itemDescribed: i,
    });
  };

  render() {
    const { character, itemsList } = this.props;

    return (
      <div style={styledMapSide}>
        <img src={'./common/cadre.png'} style={styledCadre} alt="Cadre" />
        <ItemList
          character={character}
          itemsList={itemsList}
          showItemDescription={this.showItemDescription}
        />
      </div>
    );
  }
}

ItemPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  itemsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default ItemPanel;
