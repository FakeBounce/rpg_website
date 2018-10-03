import React, { Component } from "react";
import PropTypes from "prop-types";
import CharacterTabButtons from "./CharacterTabButtons";
import CharacterTabPanel from "./CharacterTabPanel";
import CharacterInputs from "./CharacterInputs";
import { widthRightPanelLeft, heightHeader, imageSize } from "./StyleConstants";

const styles = {
    characterOtherInfos: {
        width: `${widthRightPanelLeft}px`,
        height: `${(window.innerHeight - heightHeader) * 0.33 - imageSize}px`,
        position: "relative",
        float: "left",
        display: "inline-block",
    },
};

class CharacterOtherInfos extends Component {
    render() {
        const {
            character,
            infoTab,
            status,
            onChangeTab,
            onChange,
            onLifeChange,
            onStatusChange,
            onItemUse,
            damageTaken,
        } = this.props;

        return (
            <div style={styles.characterOtherInfos}>
                <CharacterTabButtons onChangeTab={onChangeTab} />
                <CharacterTabPanel
                    character={character}
                    infoTab={infoTab}
                    onItemUse={onItemUse}
                />
                <CharacterInputs
                    character={character}
                    status={status}
                    infoTab={infoTab}
                    damageTaken={damageTaken}
                    onChange={onChange}
                    onChangeTab={onChangeTab}
                    onLifeChange={onLifeChange}
                    onStatusChange={onStatusChange}
                />
            </div>
        );
    }
}

CharacterOtherInfos.propTypes = {
    character: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    infoTab: PropTypes.string.isRequired,
    damageTaken: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    onLifeChange: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onItemUse: PropTypes.func.isRequired,
};

export default CharacterOtherInfos;
