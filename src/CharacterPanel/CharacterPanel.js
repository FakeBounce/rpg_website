import React, { Component } from 'react';

import PropTypes from 'prop-types';
import CharacterAttributes from './CharacterAttributes';
import CharacterOtherInfos from './CharacterOtherInfos';
import CharacterHeader from './CharacterHeader';

const styles = {
    CharPanel: {
        borderBottom: '1px solid black',
        width: '100%',
        height: '33%',
    },
    CharacterBox: { position: 'relative', height: '100%' },
};

class CharacterPanel extends Component {
    render() {
        const {
            character,
            isGameMaster,
            infoTab,
            status,
            damageTaken,
            gold,
            onChange,
            onChangeTab,
            onLifeChange,
            onStatusChange,
            onItemUse,
            onGoldChange,
        } = this.props;

        return (
            <div style={styles.CharPanel}>
                <div style={styles.CharacterBox}>
                    <CharacterHeader
                        gold={character.gold}
                        status={character.status}
                        icon={character.icon}
                        name={character.name}
                        health={character.health}
                        maxHealth={character.maxHealth}
                    />
                    <CharacterAttributes character={character} />
                    <CharacterOtherInfos
                        character={character}
                        status={status}
                        infoTab={infoTab}
                        damageTaken={damageTaken}
                        gold={gold}
                        isGameMaster={isGameMaster}
                        onChange={onChange}
                        onChangeTab={onChangeTab}
                        onLifeChange={onLifeChange}
                        onStatusChange={onStatusChange}
                        onItemUse={onItemUse}
                        onGoldChange={onGoldChange}
                    />
                </div>
            </div>
        );
    }
}

CharacterPanel.propTypes = {
    character: PropTypes.object.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    infoTab: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    damageTaken: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    onLifeChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onItemUse: PropTypes.func.isRequired,
    onGoldChange: PropTypes.func.isRequired,
};

export default CharacterPanel;
