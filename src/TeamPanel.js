import React, { Component } from "react";
import PropTypes from "prop-types";
import TeamCharacter from "./TeamCharacter";
import { widthRightPanel, heightHeader } from "./StyleConstants";

const styles = {
    TeamPanel: {
        borderBottom: "1px solid black",
        width: "100%",
        height: "33%",
    },
    teamCharacters: {
        width: `${widthRightPanel}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 - 30}px`,
        marginTop: 30,
        position: "relative",
        float: "left",
        display: "inline-block",
        overflowY: "auto",
    },
    HeaderText: {
        position: "absolute",
        width: `${widthRightPanel}px`,
        height: 25,
        float: "left",
        display: "inline-block",
        left: 0,
    },
};

class TeamPanel extends Component {
    render() {
        const { storyCharacters } = this.props;

        return (
            <div style={styles.TeamPanel}>
                <div style={styles.HeaderText}>Equipe</div>
                <div style={styles.teamCharacters}>
                    {storyCharacters.map(storyCharacter => {
                        return (
                            <TeamCharacter
                                key={storyCharacter.name}
                                {...storyCharacter}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

TeamPanel.propTypes = {
    storyCharacters: PropTypes.array.isRequired,
};

export default TeamPanel;
