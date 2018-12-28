import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { widthLeft } from '../Utils/StyleConstants';
import { bonusList } from '../Utils/Constants';
import SelectMapper from '../Utils/SelectMapper';
import ChatDices from './ChatDices';
import ChatGMButton from './ChatGMButton';

const styledChatDices = {
  width: widthLeft / 2,
  height: '25px',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
};

const styledChatSelect = {
  display: 'inline-block',
  float: 'left',
  width: 40,
};

class ChatDicesRow extends PureComponent {
  render() {
    const {
      bonus,
      gmCommands,
      launchCommand,
      onChangeDice,
      toggleGMCommands,
    } = this.props;

    return (
      <div style={styledChatDices}>
        <ChatDices launchCommand={launchCommand} />
        <SelectMapper
          mapArray={bonusList}
          value={bonus}
          onChange={onChangeDice}
          style={styledChatSelect}
        />
        <ChatGMButton
          gmCommands={gmCommands}
          toggleGMCommands={toggleGMCommands}
        />
      </div>
    );
  }
}

ChatDicesRow.propTypes = {
  bonus: PropTypes.number.isRequired,
  gmCommands: PropTypes.bool.isRequired,
  launchCommand: PropTypes.func.isRequired,
  onChangeDice: PropTypes.func.isRequired,
  toggleGMCommands: PropTypes.func.isRequired,
};

export default ChatDicesRow;
