import React, { Component } from "react";
import "./Quest.css";
import PropTypes from "prop-types";

class Quest extends Component {
    render() {
        const {
            name,
            index,
            icon,
            description,
            dangerosity,
            reward,
            monsterId,
            showQuest,
        } = this.props;
        return (
            <div className="quest" onClick={() => showQuest(index)}>
                <img
                    src={"./" + icon}
                    alt={description}
                    className="quest-icon"
                />
            </div>
        );
    }
}

Quest.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dangerosity: PropTypes.number.isRequired,
    monsterId: PropTypes.string.isRequired,
    reward: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    showQuest: PropTypes.func.isRequired,
};

export default Quest;
