import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BottomPanel from './BottomPanel';
import ChatCommandsPanel from './ChatCommandsPanel';
import Header from './Header';
import MiddlePanel from './MiddlePanel';

class GameScreen extends Component {
    render() {
        const {
            musicMute,
            onChatHelp,
            toggleMusic,
            accessChatHelp,
            signOut,
            selectAnotherCharacter,
            stories,
            currentStory,
            togglePlayerView,
            isGameMaster,
            ...rest
        } = this.props;

        return (
            <div>
                <Header
                    title={stories[currentStory].name}
                    selectAnotherCharacter={selectAnotherCharacter}
                    signOut={signOut}
                    accessChatHelp={accessChatHelp}
                    toggleMusic={toggleMusic}
                    chatHelpTitle={
                        onChatHelp ? 'Return to map' : 'Access chat help'
                    }
                    musicMute={musicMute}
                    isGameMaster={isGameMaster}
                    togglePlayerView={togglePlayerView}
                />
                {onChatHelp ? (
                    <ChatCommandsPanel />
                ) : (
                    <MiddlePanel currentStory={currentStory} isGameMaster={isGameMaster} stories={stories} {...rest} />
                )}
                <BottomPanel />
            </div>
        );
    }
}

GameScreen.propTypes = {
    onChatHelp: PropTypes.array.isRequired,
    stories: PropTypes.array.isRequired,
    currentStory: PropTypes.number.isRequired,
    musicMute: PropTypes.bool.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    selectAnotherCharacter: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
    accessChatHelp: PropTypes.func.isRequired,
    toggleMusic: PropTypes.func.isRequired,
    togglePlayerView: PropTypes.func.isRequired,
};

export default GameScreen;
