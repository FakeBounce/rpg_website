import React, { Component } from "react";
import "./Quest.css";
import PropTypes from "prop-types";

const styledPosition = [
    {
        left: "5%",
        top: "10%",
    },
    {
        left: "25%",
        top: "10%",
    },
    {
        left: "45%",
        top: "10%",
    },
    {
        left: "65%",
        top: "10%",
    },
    {
        left: "5%",
        top: "55%",
    },
    {
        left: "25%",
        top: "55%",
    },
    {
        left: "45%",
        top: "55%",
    },
    {
        left: "65%",
        top: "55%",
    },
];

const styledRandom = [
    'rotate(5deg)',
    'rotate(-5deg)',
    'rotate(10deg)',
    'rotate(-10deg)',
    'translate(0px,-20px)',
    'translate(0px,20px)',
    'translate(0px,20px)',
    'translate(10px,0px)',
    'translate(-10px,0px)',
    'translate(10px,20px)',
    'translate(-10px,20px)',
    'translate(-10px,-20px)',
    'translate(-10px,-20px)',
];

class Quest extends Component {
    getRandomStyle = () => {
        let rdm = '';
        this.props.randomStyle.map(value => {
            rdm += styledRandom[value] + ' ';
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
                    ...styledPosition[position],
                    ...this.getRandomStyle(),
                }}
                onClick={() => showQuest(index)}
            >
                <img src={"./" + icon} alt="A quest" className="quest-icon" />
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
