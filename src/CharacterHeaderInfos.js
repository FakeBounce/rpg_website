import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthRightPanelLeft } from "./StyleConstants";

const styles = {
    characterHeaderinfos: {
        width: `${widthRightPanelLeft}px`,
        height: 49,
        position: "relative",
        float: "left",
        display: "inline-block",
        borderBottom: "1px solid black",
    },
    characterHeaderStatus: {
        position: "relative",
        width: `${widthRightPanelLeft}px`,
        height: 25,
        float: "left",
        display: "inline-block",
    },
    characterHeaderGold: {
        position: "relative",
        width: `${widthRightPanelLeft}px`,
        height: 25,
        float: "left",
        display: "inline-block",
    },
};

class CharacterHeaderInfos extends Component {
    render() {
        const { status, gold } = this.props;

        return (
            <div style={styles.characterHeaderinfos}>
                <div style={styles.characterHeaderStatus}>
                    Status :{status ? status : "OK"}
                </div>
                <div style={styles.characterHeaderGold}>
                    Gold : {gold ? gold : 0}
                </div>
            </div>
        );
    }
}

CharacterHeaderInfos.propTypes = {
    status: PropTypes.string.isRequired,
    gold: PropTypes.number.isRequired,
};

export default CharacterHeaderInfos;
