import React, { Component } from "react";

import Quest from "./Quest";
import Merchant from "./Merchant";
import Item from "./Item";
import ItemDescription from "./ItemDescription";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "./StyleConstants";
import QuestFullscreen from "./QuestFullscreen";

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
    positionList = [];

    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map((itemFromMerchant, index) => {
            return (
                <Item
                    key={`item-${itemFromMerchant.name}-${index}`}
                    {...itemFromMerchant}
                    index={index}
                    showItemDescription={this.showItemDescription}
                />
            );
        });
    };

    showItemDescription = (itemToDescribe, i) => {
        this.props.doSetState({
            isItemDescriptionShowed: true,
            itemToDescribe: itemToDescribe,
            itemDescribed: i,
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

    // For GM quest positionning
    getPosition = () => {
        let hasPosition = false;
        const i = Math.floor(Math.random() * 8);
        if (this.positionList.indexOf(i) === -1) {
            const newPositionList = this.positionList;
            hasPosition = true;
            newPositionList.push(i);
            this.positionList = newPositionList;
        }
        if (hasPosition || this.positionList.length === 8)
            return this.positionList[this.positionList.length - 1];

        return this.getPosition();
    };

    getQuestsFromTown = quests => {
        return quests.map((quest, index) => {
            return (
                <Quest
                    key={`merchant-${quest.name}`}
                    {...quest}
                    index={index}
                    showQuest={this.showQuest}
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

    showQuest = quest => {
        this.props.doSetState({
            isQuestShowed: true,
            currentQuest: this.props.questsList[quest],
        });
    };

    hideQuest = () => {
        this.props.doSetState({
            isQuestShowed: false,
            currentQuest: {},
        });
    };

    render() {
        const {
            character,
            isItemShowed,
            itemsList,
            isItemDescriptionShowed,
            itemToDescribe,
            isTownShowed,
            merchantsList,
            questsList,
            buyItem,
            currentQuest,
            isQuestShowed,
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
                {isTownShowed && !isQuestShowed && (
                        <div
                            style={{
                                ...styledMapSide,
                                backgroundImage: `url(quest_panel.jpg)`,
                                backgroundSize: "cover",
                            }}
                        >
                            <div style={styledBoxHeader}>Liste des quêtes</div>
                            {this.getQuestsFromTown(questsList)}
                        </div>
                    )}
                {isQuestShowed && (
                    <div
                        style={{
                            ...styledMapSide,
                            backgroundImage: `url(quest_panel.jpg)`,
                            backgroundSize: "cover",
                        }}
                    >
                        <QuestFullscreen
                            {...currentQuest}
                            hideQuest={this.hideQuest}
                        />
                    </div>
                )}
                {isTownShowed && (
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
                        buyItem={() =>
                            buyItem(itemToDescribe, itemToDescribe.price)
                        }
                        gold={character.gold}
                    />
                )}
            </div>
        );
    }
}

PlayerMapPanel.propTypes = {
    isQuestShowed: PropTypes.bool.isRequired,
    currentQuest: PropTypes.object.isRequired,
    character: PropTypes.object.isRequired,
    isItemShowed: PropTypes.bool.isRequired,
    itemsList: PropTypes.array.isRequired,
    isItemDescriptionShowed: PropTypes.bool.isRequired,
    itemToDescribe: PropTypes.object.isRequired,
    isTownShowed: PropTypes.bool.isRequired,
    merchantsList: PropTypes.array.isRequired,
    buyItem: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default PlayerMapPanel;
