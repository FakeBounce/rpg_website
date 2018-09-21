import React, { Component } from "react";
import "./Quest.css";
import PropTypes from "prop-types";

const styledPosition = [
    {
        left: 0,
        top: 0,
    },
    {
        left: "25%",
        top: 0,
    },
    {
        left: "50%",
        top: 0,
    },
    {
        left: "75%",
        top: 0,
    },
    {
        left: "25%",
        top: "50%",
    },
    {
        left: "50%",
        top: "50%",
    },
    {
        left: 0,
        top: "50%",
    },
    {
        left: "75%",
        top: "50%",
    },
];

class Quest extends Component {
    render() {
        const {
            name,
            position,
            index,
            icon,
            description,
            dangerosity,
            reward,
            monsterId,
            showQuest,
        } = this.props;
        console.log("position", position, styledPosition[position]);
        return (
            <div
                className="quest"
                style={{ ...styledPosition[position] }}
                onClick={() => showQuest(index)}
            >
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
    position: PropTypes.number.isRequired,
    showQuest: PropTypes.func.isRequired,
};

export default Quest;
