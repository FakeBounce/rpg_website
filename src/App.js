import React, { Component } from "react";
import "./App.css";
import Merchant from "./Merchant";
import Item from "./Item";
import ItemDescription from "./ItemDescription";
import Town from "./Town";

const widthRightPanel = 300;
const heightHeader = 100;
const heightBottomPanel = 150;
// const gridHeight = 20;
// const gridWidth = 20;
const gridLength = 20;
const gridDimension = Math.floor((window.innerHeight - 250) / gridLength);
const widthLeft = window.innerWidth - gridLength*gridDimension - gridLength * 2 - widthRightPanel;
const heightLeft = gridLength*gridDimension;
// const gridDimension = 30;

const styledGrid = {
    border: "1px solid pink",
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledRow = {
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledHeader = {
    borderBottom: "1px solid black",
    width: "100%",
    height: `${heightHeader}px`,
};

const styledMap = {
    border: "1px solid grey",
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension * gridLength}px`,
    display: "inline-block",
    float: "left",
};

const styledBottomPanel = {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    borderTop: "1px solid black",
    width: `${window.innerWidth - widthRightPanel}px`,
    height: `${heightBottomPanel}px`,
};

const styledRightPanel = {
    position: "absolute",
    top: `${heightHeader}px`,
    right: "0px",
    borderLeft: "1px solid black",
    width: `${widthRightPanel}px`,
    height: `${window.innerHeight - heightHeader}px`,
};

const styledCharPanel = {
    borderBottom: "1px solid black",
    width: "100%",
    height: "33%",
};

const styledItemsPanel = {
    borderBottom: "1px solid black",
    width: "100%",
    height: "33%",
};

const styledChatPanel = {
    width: "100%",
};

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft/2 - 3}px`,
    height: `${heightLeft/2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
};

const items = [
    {
        name: "tamere",
        description: "moncul",
        icon: "potion_1",
    },
    {
        name: "tamere",
        description: "mes fesses",
        icon: "potion_1",
    },
];

const merchantList = [
    {
        name: "alchimiste Debron",
        description: "Homme sénil",
        shop_description: "Vieux bâtiment",
        icon: "alchimist",
        items,
    },
];

const towns = [
    {
        name: "Hameau de mes fesses",
        positionX: 6,
        positionY: 6,
        icon: "big_town",
        merchants: merchantList,
    },
];

class App extends Component {
    state = {
        isItemShowed: false,
        itemsList: [],
        isItemDescriptionShowed: false,
        itemToDescribe: {},
        isMerchantsShowed: false,
        merchantsList: [],
    };

    getMerchantsFromTown = merchants => {
        return merchants.map(item => {
            return <Merchant {...item} showItems={this.showItems} />;
        });
    };

    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map(itemFromMerchant => {
            return (
                <Item
                    {...itemFromMerchant}
                    showItemDescription={this.showItemDescription}
                />
            );
        });
    };

    showMerchantList = list => {
        this.setState(state => ({
            ...state,
            isMerchantsShowed: true,
            merchantsList: list,
        }));
    };

    showItems = list => {
        this.setState(state => ({
            ...state,
            isItemShowed: true,
            itemsList: list,
        }));
    };

    showItemDescription = itemToDescribe => {
        this.setState(state => ({
            ...state,
            isItemDescriptionShowed: true,
            itemToDescribe: itemToDescribe,
        }));
    };

    createGrid = positionX => {
        const table = [];

        for (let i = 0; i < gridLength; i++) {
            table.push(
                <div style={styledGrid}>
                    {towns.map(town => {
                        if (
                            positionX === town.positionX &&
                            i === town.positionY
                        ) {
                            return (
                                <Town
                                    {...town}
                                    showMerchantList={this.showMerchantList}
                                />
                            );
                        }
                        return null;
                    })}
                </div>,
            );
        }
        return table;
    };

    createTable = () => {
        const table = [];
        for (let i = 0; i < gridLength; i++) {
            table.push(<div style={styledRow}>{this.createGrid(i)}</div>);
        }
        return table;
    };

    render() {
        console.log(`${heightLeft/2 - 4}px`);
        const {
            isItemShowed,
            itemsList,
            isItemDescriptionShowed,
            itemToDescribe,
            isMerchantsShowed,
            merchantsList,
        } = this.state;
        return (
            <div className="App">
                <div style={styledHeader}>Header</div>
                <div style={styledMap}>{this.createTable()}</div>
                {isMerchantsShowed && (
                    <div style={styledMapSide}>Liste des quêtes</div>
                )}
                {isMerchantsShowed && (
                    <div style={styledMapSide}>
                        Liste des marchands
                        {this.getMerchantsFromTown(merchantsList)}
                    </div>
                )}
                {isItemShowed && (
                    <div style={styledMapSide}>
                        Liste des objets
                        {this.getItemsFromMerchant(itemsList)}
                    </div>
                )}
                {isItemDescriptionShowed && (
                    <div style={styledMapSide}>
                        Description
                        <ItemDescription {...itemToDescribe} />
                    </div>
                )}
                <div style={styledRightPanel}>
                    <div style={styledCharPanel}>Personnage</div>
                    <div style={styledItemsPanel}>Items/Or</div>
                    <div style={styledChatPanel}>Chat</div>
                </div>
                <div style={styledBottomPanel}>Cameras</div>
            </div>
        );
    }
}

export default App;
