import React, { Component } from "react";
import "./App.css";
import Merchant from "./Merchant";
import Item from "./Item";
import ItemDescription from "./ItemDescription";
import Town from "./Town";

const styledGrid = {
    display: "inline-block",
    border: "1px solid pink",
    width: "30px",
    height: "30px",
};

const styledMap = {
    border: "1px solid grey",
    width: "512px",
    height: "480px",
    display: "inline-block",
    float: "left",
};

const styledRightPanel = {
    position: 'absolute',
    top: '0px',
    right: '0px',
    borderLeft: "1px solid black",
    width: "300px",
    height: "100%",
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
    width: "512px",
    height: "480px",
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

    createGrid = positionX => {
        const table = [];

        for (let i = 0; i < 16; i++) {
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

    createTable = () => {
        const table = [];
        for (let i = 0; i < 16; i++) {
            table.push(
                <div
                    style={{
                        width: "512px",
                        height: "30px",
                    }}
                >
                    {this.createGrid(i)}
                </div>,
            );
        }
        return table;
    };

    render() {
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
                <div style={styledMap}>{this.createTable()}</div>
                {isMerchantsShowed && (<div style={styledMapSide}>Liste des quêtes</div>)}
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
            </div>
        );
    }
}

export default App;
