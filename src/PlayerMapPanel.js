import React, { Component } from "react";

import Merchant from "./Merchant";
import Item from "./Item";
import ItemDescription from "./ItemDescription";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "./StyleConstants";

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft / 2 - 11}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
    position: "relative",
};

class PlayerMapPanel extends Component {
    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map((itemFromMerchant, index) => {
            return (
                <Item
                    key={`item-${itemFromMerchant.name}-${index}`}
                    {...itemFromMerchant}
                    showItemDescription={this.showItemDescription}
                />
            );
        });
    };

    showItemDescription = itemToDescribe => {
        this.props.doSetState({
            isItemDescriptionShowed: true,
            itemToDescribe: itemToDescribe,
        });
    };

    getMerchantsFromTown = merchants => {
        return merchants.map(item => {
            return (
                <Merchant
                    key={`merchant-${item.name}`}
                    {...item}
                    showItems={this.showItems}
                />
            );
        });
    };

    showItems = list => {
        this.props.doSetState({
            isItemShowed: true,
            itemsList: list,
        });
    };

    render() {
        const {
            character,
            isItemShowed,
            itemsList,
            isItemDescriptionShowed,
            itemToDescribe,
            isMerchantsShowed,
            merchantsList,
            buyItem,
        } = this.props;

        return (
            <div
                style={{
                    float: "left",
                    width: `${widthLeft}px`,
                    display: "inline-block",
                    position: "relative",
                }}
            >
                {isMerchantsShowed && (
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>Liste des quêtes</div>
                    </div>
                )}
                {isMerchantsShowed && (
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>Liste des marchands</div>
                        {this.getMerchantsFromTown(merchantsList)}
                    </div>
                )}
                {isItemShowed && (
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>Liste des objets</div>
                        {this.getItemsFromMerchant(itemsList)}
                    </div>
                )}
                {isItemDescriptionShowed && (
                    <ItemDescription
                        {...itemToDescribe}
                        buyItem={() => buyItem(itemToDescribe, itemToDescribe.price)}
                        gold={character.gold}
                    />
                )}
            </div>
        );
    }
}

PlayerMapPanel.propTypes = {
    character: PropTypes.object.isRequired,
    isItemShowed: PropTypes.bool.isRequired,
    itemsList: PropTypes.array.isRequired,
    isItemDescriptionShowed: PropTypes.bool.isRequired,
    itemToDescribe: PropTypes.object.isRequired,
    isMerchantsShowed: PropTypes.bool.isRequired,
    merchantsList: PropTypes.array.isRequired,
    buyItem: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default PlayerMapPanel;
