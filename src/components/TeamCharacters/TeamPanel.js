import React from 'react';
import PropTypes from 'prop-types';
import TeamCharacter from './TeamCharacter';
import { widthRightPanel, heightLeft } from '../Utils/StyleConstants';
import TeamHeader from './TeamHeader';
import { colors } from '../Utils/Constants';
import { useSelector } from 'react-redux';

const TeamPanelContainer = {
  borderBottom: '1px solid black',
  width: '100%',
  height: '50%',
  backgroundColor: colors.background,
  color: colors.text,
};
const TeamPanelCharacters = {
  width: `${widthRightPanel}px`,
  height: `${heightLeft / 2 - 25}px`,
  marginTop: 25,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  overflow: 'hidden',
  overflowY: 'auto',
};
const TeamPanelGMContainer = {
  borderBottom: '1px solid black',
  width: '100%',
  height: heightLeft / 2,
  backgroundColor: colors.background,
  color: colors.text,
};
const TeamPanelGMCharacters = {
  width: '100%',
  height: `${heightLeft / 2 - 25}px`,
  marginTop: 25,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  overflow: 'hidden',
  overflowY: 'auto',
};

const TeamPanel = ({
  exchangeWithTeamMember,
  chatWithTeamMember,
  goldWithTeamMember,
  modifyCurrentCharacter,
}) => {
  const { isGameMaster, gameMaster, storyCharacters, userUid } = useSelector(
    store => ({
      isGameMaster: store.appState.isGameMaster,
      gameMaster: store.appState.gameMaster,
      storyCharacters: store.team.characters,
      userUid: store.userInfos.uid,
    }),
  );

  return (
    <div style={isGameMaster ? TeamPanelGMContainer : TeamPanelContainer}>
      <TeamHeader />
      <div
        style={isGameMaster ? TeamPanelGMCharacters : TeamPanelCharacters}
        className='scrollbar'
      >
        <TeamCharacter
          icon='./common/gameMaster.jpg'
          name='Game Master'
          status=''
          gold={9999}
          health={9999}
          maxHealth={9999}
          mentalState={9}
          maxMentalState={9}
          isGM
          exchangeWithTeamMember={() => {}}
          chatWithTeamMember={() => {
            chatWithTeamMember('GM');
            // modifyCurrentCharacter(gameMaster);
          }}
          goldWithTeamMember={() => goldWithTeamMember('GM')}
        />

        {storyCharacters.map(storyCharacter => {
          if (
            storyCharacter.userUid !== gameMaster &&
            (storyCharacter.status !== 'Inactive' || isGameMaster)
          ) {
            return (
              <TeamCharacter
                key={storyCharacter.name}
                {...storyCharacter}
                canExchange={
                  storyCharacter.userUid !== gameMaster &&
                  storyCharacter.userUid !== userUid
                }
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
};

TeamPanel.propTypes = {
  exchangeWithTeamMember: PropTypes.func.isRequired,
  chatWithTeamMember: PropTypes.func.isRequired,
  goldWithTeamMember: PropTypes.func.isRequired,
  modifyCurrentCharacter: PropTypes.func.isRequired,
};

export default TeamPanel;
