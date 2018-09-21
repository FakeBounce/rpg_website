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
            position,
            index,
            icon,
            showQuest,
        } = this.props;
        return (
            <div
                className="quest"
                style={{ ...styledPosition[position] }}
                onClick={() => showQuest(index)}
            >
                <img
                    src={"./" + icon}
                    alt='A quest'
                    className="quest-icon"
                />
            </div>
        );
    }
}

Quest.propTypes = {
    icon: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    showQuest: PropTypes.func.isRequired,
};

export default Quest;
