import React, { Component } from "react";
import "./App.css";
import Merchant from "./Merchant";
import Item from "./Item";
import ItemDescription from "./ItemDescription";
import PropTypes from "prop-types";

const widthRightPanel = 300;
const gridLength = 20;
const gridDimension = Math.floor((window.innerHeight - 250) / gridLength);
const widthLeft =
    window.innerWidth -
    gridLength * gridDimension -
    gridLength * 2 -
    widthRightPanel;
const heightLeft = gridLength * gridDimension;

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft / 2 - 3}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
};

class PlayerMapPanel extends Component {
    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map(itemFromMerchant => {
            return (
                <Item
                    key={`item-${itemFromMerchant.name}`}
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
            isItemShowed,
            itemsList,
            isItemDescriptionShowed,
            itemToDescribe,
            isMerchantsShowed,
            merchantsList,
        } = this.props;

        return (
            <div>
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
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>Description</div>
                        <ItemDescription {...itemToDescribe} />
                    </div>
                )}
            </div>
        );
    }
}

PlayerMapPanel.propTypes = {
    isItemShowed: PropTypes.bool.isRequired,
    itemsList: PropTypes.array.isRequired,
    isItemDescriptionShowed: PropTypes.bool.isRequired,
    itemToDescribe: PropTypes.object.isRequired,
    isMerchantsShowed: PropTypes.bool.isRequired,
    merchantsList: PropTypes.array.isRequired,
};

export default PlayerMapPanel;
