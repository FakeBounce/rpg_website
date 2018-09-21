import React, { Component } from "react";
import "./QuestFullscreen.css";
import PropTypes from "prop-types";

class QuestFullscreen extends Component {
    render() {
        const {
            position,
            index,
            icon,
            showQuest,
        } = this.props;
        return (
            <div
                className="quest-fullscreen"
                onClick={() => showQuest(index)}
            >
                <img
                    src={"./" + icon}
                    alt='A quest'
                    className="quest-fullscreen-icon"
                />
            </div>
        );
    }
}

QuestFullscreen.propTypes = {
    icon: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    showQuest: PropTypes.func.isRequired,
};

export default QuestFullscreen;
