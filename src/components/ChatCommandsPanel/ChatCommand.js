import React from 'react';
import PropTypes from 'prop-types';

const styledChatHelpBox = {
  width: '100%',
  height: '20px',
  marginBottom: '5px',
  textAlign: 'center',
  borderBottom: '1px solid white',
  float: 'left',
  display: 'inline-block',
};

const styledCommandName = {
  width: '20%',
  height: '20px',
  textAlign: 'left',
  float: 'left',
  display: 'inline-block',
};

const styledCommandAction = {
  width: '75%',
  height: '20px',
  textAlign: 'left',
  float: 'left',
  display: 'inline-block',
};

const ChatCommand = ({ name, action }) => {
  return (
    <div style={styledChatHelpBox}>
      <div style={styledCommandName}>Name : {name}</div>
      <div style={styledCommandAction}>Action : {action}</div>
    </div>
  );
};

ChatCommand.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default ChatCommand;
