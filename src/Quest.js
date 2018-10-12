import React, { Component } from "react";
import "./Quest.css";
import PropTypes from "prop-types";
import { questsPosition, questsRandom } from './StyleConstants';

class Quest extends Component {
    getRandomStyle = () => {
        let rdm = '';
        this.props.randomStyle.map(value => {
            rdm += questsRandom[value] + ' ';
            return null;
        });
        return {transform: rdm};
    };

    render() {
        const { position, index, icon, showQuest } = this.props;
        return (
            <div
                className="quest"
                style={{
                    ...questsPosition[position],
                    ...this.getRandomStyle(),
                }}
                onClick={() => showQuest(index)}
            >
                <img src={"./quests/" + icon} alt="A quest" className="quest-icon" />
            </div>
        );
    }
}

Quest.propTypes = {
    icon: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    randomStyle: PropTypes.array.isRequired,
    showQuest: PropTypes.func.isRequired,
};

export default Quest;
