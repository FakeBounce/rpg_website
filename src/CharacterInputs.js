import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
    lifeInput: {
        position: "relative",
        float: "left",
        display: "inline-block",
        width: 45,
        height: 19,
    },
    lifeSelect: {
        position: "relative",
        float: "left",
        display: "inline-block",
        width: 70,
        height: 19,
    },
    lifeButton: {
        position: "relative",
        float: "left",
        display: "inline-block",
        width: 45,
        height: 25,
        padding: 0,
    },
};

const statusList = [
    "OK",
    "Poisoned",
    "Paralyzed",
    "Burned",
    "Sleepy",
    "Under control",
    "Dead",
];

class CharacterInputs extends Component {
    render() {
        const {
            status,
            onChange,
            onLifeChange,
            onStatusChange,
            damageTaken,
        } = this.props;

        return (
            <div>
                <input
                    type="number"
                    placeholder="X"
                    name="damageTaken"
                    value={damageTaken}
                    onChange={e => {
                        onChange(e.target.name, e.target.value);
                    }}
                    style={styles.lifeInput}
                />
                <button onClick={onLifeChange} style={styles.lifeButton}>
                    HP
                </button>
                <select
                    value={status}
                    onChange={e => {
                        onChange("status", e.target.value);
                    }}
                    style={styles.lifeSelect}
                >
                    {statusList.map(sts => {
                        return <option key={sts} value={sts}>{sts}</option>;
                    })}
                </select>
                <button onClick={onStatusChange} style={styles.lifeButton}>
                    Status
                </button>
            </div>
        );
    }
}

CharacterInputs.propTypes = {
    character: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    infoTab: PropTypes.string.isRequired,
    damageTaken: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    onLifeChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
};

export default CharacterInputs;
