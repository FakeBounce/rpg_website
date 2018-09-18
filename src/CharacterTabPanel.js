import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterTabPanelContent from "./CharacterTabPanelContent";

import { heightHeader, widthRightPanelLeft, imageSize } from "./StyleConstants";

const styles = {
    tabPanel: {
        width: `${widthRightPanelLeft}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 -
            imageSize -
            50}px`,
        padding: 0,
        position: "relative",
        float: "left",
        display: "inline-block",
        overflowY: "auto",
    },
    tabPanelItem: {
        width: `${widthRightPanelLeft - 20}px`,
        height: 25,
        paddingHorizontal: 5,
        position: "relative",
        float: "left",
        display: "inline-block",
    },
    itemName: {
        width: `${widthRightPanelLeft - 70}px`,
        height: 25,
        position: "relative",
        float: "left",
        display: "inline-block",
    },
    itemQuantity: {
        width: 30,
        height: 15,
        position: "relative",
        float: "left",
        display: "inline-block",
        padding: 0,
        margin: 0,
        textAlign: "center",
    },
};

class CharacterTabPanel extends Component {
    render() {
        const { character, infoTab } = this.props;

        return (
            <div style={styles.tabPanel}>
                {infoTab === "Weapons" && (
                    <CharacterTabPanelContent
                        tab={character.weapons}
                        title="Weapons :"
                    />
                )}
                {infoTab === "Abilities" && (
                    <CharacterTabPanelContent
                        tab={character.abilities}
                        title="Abilities :"
                    />
                )}
                {infoTab === "Skills" && (
                    <CharacterTabPanelContent
                        tab={character.skills}
                        title="Skills :"
                    />
                )}
                {infoTab === "Items" && (
                    <div>
                        <div style={styles.BoxHeader}>Items :</div>
                        {character.items.map((item, index) => {
                            return (
                                <div
                                    key={`${item.name}-${index}`}
                                    style={styles.tabPanelItem}
                                >
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        style={styles.itemQuantity}
                                        onChange={() => {
                                            // @TODO: modify item quantity
                                            console.log('Modified item !');
                                        }}
                                    />
                                    <div style={styles.itemName}>
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

CharacterTabPanel.propTypes = {
    character: PropTypes.object.isRequired,
    infoTab: PropTypes.string.isRequired,
};

export default CharacterTabPanel;
