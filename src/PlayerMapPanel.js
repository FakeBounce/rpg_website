import React, { Component } from 'react';

import Quest from './Quest';
import Merchant from './Merchant';
import Item from './Item';
import ItemDescription from './ItemDescription';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft } from './StyleConstants';
import QuestFullscreen from './QuestFullscreen';

const styledBoxHeader = {
    width: '100%',
    height: '20px',
    marginBottom: '5px',
    textAlign: 'center',
};

const styledMapSide = {
    border: '1px solid brown',
    width: `${widthLeft / 2 - 11}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: 'inline-block',
    float: 'left',
    textAlign: 'left',
    position: 'relative',
};

const styledItemContainer = {
    display: 'inline-block',
    float: 'left',
    position: 'absolute',
    top: '25px',
    overflowY: 'auto',
    height: '90%',
    width: '100%',
};

class PlayerMapPanel extends Component {
    positionList = [];

    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map((itemFromMerchant, index) => {
            const isHidden =
                this.props.character.education < itemFromMerchant.rarity * 9;
            return (
                <Item
                    key={`item-${itemFromMerchant.name}-${index}`}
                    {...itemFromMerchant}
                    index={index}
                    isHidden={isHidden}
                    showItemDescription={this.showItemDescription}
                />
            );
        });
    };

    showItemDescription = i => {
        const { merchants, currentMerchant } = this.props;
        this.props.doSetState({
            isItemDescriptionShowed: true,
            itemToDescribe: merchants[currentMerchant].items[i],
            itemDescribed: i,
        });
    };

    getMerchantsFromTown = merchantsFromTown => {
        const { merchants, currentMerchant } = this.props;
        return merchantsFromTown.map(index => {
            return (
                <Merchant
                    key={`merchant-${merchants[index].name}`}
                    {...merchants[index]}
                    index={index}
                    showItems={this.showItems}
                    currentMerchant={currentMerchant}
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

    getQuestsFromTown = qft => {
        const { quests } = this.props;
        return qft.map(q => {
            return (
                <Quest
                    key={`merchant-${quests[q].name}`}
                    {...quests[q]}
                    index={q}
                    showQuest={this.showQuest}
                />
            );
        });
    };

    showItems = (list, index) => {
        this.props.doSetState({
            isItemShowed: true,
            itemsList: list,
            currentMerchant: index,
        });
    };

    showQuest = index => {
        this.props.doSetState({
            isQuestShowed: true,
            currentQuest: index,
        });
    };

    hideQuest = () => {
        this.props.doSetState({
            isQuestShowed: false,
            currentQuest: -1,
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
            quests,
            questsList,
            buyItem,
            currentQuest,
            isQuestShowed,
        } = this.props;

        return (
            <div
                style={{
                    float: 'left',
                    width: `${widthLeft}px`,
                    display: 'inline-block',
                    position: 'relative',
                }}
            >
                {isTownShowed &&
                    !isQuestShowed && (
                        <div
                            style={{
                                ...styledMapSide,
                                backgroundImage: `url(quest_panel.jpg)`,
                                backgroundSize: 'cover',
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
                            backgroundSize: 'cover',
                        }}
                    >
                        <QuestFullscreen
                            {...quests[currentQuest]}
                            hideQuest={this.hideQuest}
                        />
                    </div>
                )}
                {isTownShowed && (
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>Liste des marchands</div>
                        <div style={styledItemContainer}>
                            {this.getMerchantsFromTown(merchantsList)}
                        </div>
                    </div>
                )}
                {isItemShowed && (
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>Liste des objets</div>
                        <div style={styledItemContainer}>
                            {this.getItemsFromMerchant(itemsList)}
                        </div>
                    </div>
                )}
                {isItemDescriptionShowed && (
                    <ItemDescription
                        {...itemToDescribe}
                        buyItem={() =>
                            buyItem(itemToDescribe, itemToDescribe.price)
                        }
                        gold={character.gold}
                        isHidden={
                            character.education < itemToDescribe.rarity * 9
                        }
                    />
                )}
            </div>
        );
    }
}

PlayerMapPanel.propTypes = {
    isQuestShowed: PropTypes.bool.isRequired,
    currentQuest: PropTypes.number.isRequired,
    currentMerchant: PropTypes.number.isRequired,
    character: PropTypes.object.isRequired,
    isItemShowed: PropTypes.bool.isRequired,
    itemsList: PropTypes.array.isRequired,
    isItemDescriptionShowed: PropTypes.bool.isRequired,
    itemToDescribe: PropTypes.object.isRequired,
    isTownShowed: PropTypes.bool.isRequired,
    merchantsList: PropTypes.array.isRequired,
    merchants: PropTypes.array.isRequired,
    quests: PropTypes.array.isRequired,
    questsList: PropTypes.array.isRequired,
    buyItem: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default PlayerMapPanel;
