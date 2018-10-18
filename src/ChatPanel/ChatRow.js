import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
    ChatRow: {
        width: '100%',
        float: 'left',
        display: 'inline-block',
        textAlign: 'left',
    },
};

class ChatRow extends Component {

    render() {
        const { pseudo, message } = this.props;

        return (
            <div style={styles.ChatRow}>
                {pseudo
                    ? `@${pseudo}: ${message}`
                    : message}
            </div>
        );
    }
}

ChatRow.propTypes = {
    pseudo: PropTypes.string,
    message: PropTypes.string.isRequired,
};

export default ChatRow;
