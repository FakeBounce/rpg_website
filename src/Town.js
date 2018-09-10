import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

const styledItem = {
    display: "inline-block",
    cursor: "pointer",
};
const styledIcon = {
    width: "30px",
    height: "30px",
};

class Town extends Component {
    render() {
        const { icon, name, merchants, showMerchantList } = this.props;
        return (
            <div
                style={styledItem}
                onClick={() => showMerchantList(merchants)}
                data-tip={name}
            >
                <img src={"./" + icon + ".jpg"} style={styledIcon} alt={name}/>
                <ReactTooltip />
            </div>
        );
    }
}

Town.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Town;
