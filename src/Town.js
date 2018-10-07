import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

const styledItem = {
    display: "inline-block",
    cursor: "pointer",
    width: "100%",
    height: "100%",
};
const styledIcon = {
    width: "100%",
    height: "100%",
};

class Town extends Component {
    render() {
        const { town, showTownList } = this.props;
        return (
            <div
                style={styledItem}
                onClick={() => showTownList(town)}
                data-tip={town.name}
            >
                <img src={"./town-size-" + town.size + ".jpg"} style={styledIcon} alt={town.name}/>
                <ReactTooltip />
            </div>
        );
    }
}

Town.propTypes = {
    town: PropTypes.object.isRequired,
    showTownList: PropTypes.func.isRequired,
};

export default Town;
