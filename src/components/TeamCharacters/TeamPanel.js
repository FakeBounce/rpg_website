import React, { Component } from "react";
import PropTypes from "prop-types";
import TeamCharacter from "./TeamCharacter";
import { widthRightPanel, heightLeft } from "../Utils/StyleConstants";
import TeamHeader from "./TeamHeader";
import { colors } from "../Utils/Constants";
import { connect } from "react-redux";

const TeamPanelContainer = {
  borderBottom: "1px solid black",
  width: "100%",
  height: "50%",
  backgroundColor: colors.background,
  color: colors.text,
};
const TeamPanelCharacters = {
  width: `${widthRightPanel}px`,
  height: `${heightLeft / 2 - 25}px`,
  marginTop: 25,
  position: "relative",
  float: "left",
  display: "inline-block",
  overflowY: "auto",
};
const TeamPanelGMContainer = {
  borderBottom: "1px solid black",
  width: "100%",
  height: heightLeft / 2,
  backgroundColor: colors.background,
  color: colors.text,
};
const TeamPanelGMCharacters = {
  width: "100%",
  height: `${heightLeft / 2 - 25}px`,
  marginTop: 25,
  position: "relative",
  float: "left",
  display: "inline-block",
  overflowY: "auto",
};

class TeamPanel extends Component {
  render() {
    const {
      storyCharacters,
      exchangeWithTeamMember,
      chatWithTeamMember,
      goldWithTeamMember,
      modifyCurrentCharacter,
      isGameMaster,
      gameMaster,
    } = this.props;

    return (
      <div style={isGameMaster ? TeamPanelGMContainer : TeamPanelContainer}>
        <TeamHeader />
        <div
          style={isGameMaster ? TeamPanelGMCharacters : TeamPanelCharacters}
          className="scrollbar"
        >
          <TeamCharacter
            icon="./common/gameMaster.jpg"
            name="Game Master"
            status="IMPRO"
            gold={999999}
            health={9999}
            maxHealth={9999}
            isGM
            exchangeWithTeamMember={() => {}}
            chatWithTeamMember={() => {
              chatWithTeamMember("GM");
              // modifyCurrentCharacter(gameMaster);
            }}
            goldWithTeamMember={() => goldWithTeamMember("GM")}
          />

          {storyCharacters.map(storyCharacter => {
            if (storyCharacter.userUid !== gameMaster) {
              return (
                <TeamCharacter
                  key={storyCharacter.name}
                  {...storyCharacter}
                  chatWithTeamMember={() => {
                    chatWithTeamMember(storyCharacter.userPseudo);
                    if (isGameMaster) {
                      modifyCurrentCharacter(storyCharacter.userUid);
                    }
                  }}
                  goldWithTeamMember={() =>
                    goldWithTeamMember(storyCharacter.userPseudo)
                  }
                  exchangeWithTeamMember={() =>
                    exchangeWithTeamMember(storyCharacter)
                  }
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  gameMaster: store.appState.gameMaster,
  storyCharacters: store.team.characters,
});

TeamPanel.propTypes = {
  exchangeWithTeamMember: PropTypes.func.isRequired,
  chatWithTeamMember: PropTypes.func.isRequired,
  goldWithTeamMember: PropTypes.func.isRequired,
  modifyCurrentCharacter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TeamPanel);
