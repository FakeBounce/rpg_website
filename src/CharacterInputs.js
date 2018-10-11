import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
    lifeInput: {
        position: "relative",
        float: "left",
        display: "inline-block",
        width: 35,
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
        width: 25,
        height: 25,
        padding: 0,
    },
    statusButton: {
        position: "relative",
        float: "left",
        display: "inline-block",
        width: 42,
        height: 25,
        padding: 0,
    },
    goldButton: {
        position: "relative",
        float: "left",
        display: "inline-block",
        width: 35,
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
            gold,
            status,
            onChange,
            onLifeChange,
            onStatusChange,
            onGoldChange,
            damageTaken,
            isGameMaster,
        } = this.props;

        return (
            <div>
                <input
                    type="number"
                    placeholder="X"
                    name="damageTaken"
                    value={damageTaken}
                    onChange={e => {
                        onChange(e.target.name, parseInt(e.target.value, 10));
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
                        return (
                            <option key={sts} value={sts}>
                                {sts}
                            </option>
                        );
                    })}
                </select>
                <button onClick={onStatusChange} style={styles.statusButton}>
                    Status
                </button>
                {isGameMaster && (
                    <div>
                        <input
                            type="number"
                            placeholder="X"
                            name="gold"
                            value={gold}
                            onChange={e => {
                                onChange(
                                    e.target.name,
                                    parseInt(e.target.value, 10),
                                );
                            }}
                            style={styles.lifeInput}
                        />
                        <button
                            onClick={onGoldChange}
                            style={styles.goldButton}
                        >
                            Gold
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

CharacterInputs.propTypes = {
    status: PropTypes.string.isRequired,
    damageTaken: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    onLifeChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onGoldChange: PropTypes.func.isRequired,
};

export default CharacterInputs;
