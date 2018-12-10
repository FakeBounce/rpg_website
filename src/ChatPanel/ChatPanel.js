import React, { PureComponent } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ChatRow from './ChatRow';
import {
  cursorPointer,
  heightHeader,
  heightLeft,
  imageSize,
  widthLeft,
} from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';
import { bonusList, chatDices, tempoImagesList } from '../Utils/Constants';
import SelectMapper from '../Utils/SelectMapper';
import FileUploader from '../CharacterCreation/FileUploader';

const styles = {
  Historic: {
    width: widthLeft / 2,
    height: `${heightLeft / 2 - (25 + 5) - 25}px`,
    float: 'left',
    display: 'inline-block',
    overflowY: 'auto',
  },
  ChatBox: {
    width: widthLeft / 2,
    height: '20px',
    float: 'left',
    display: 'inline-block',
    marginTop: '5px',
  },
  ChatInput: {
    width: widthLeft / 2 - 51,
    height: '20px',
    float: 'left',
    display: 'inline-block',
    marginLeft: 20,
  },
  ChatButton: {
    width: 25,
    height: '26px',
    float: 'left',
    display: 'inline-block',
    textAlign: 'center',
    padding: '0px',
  },
  ChatButtonGMActive: {
    width: 40,
    height: 26,
    float: 'right',
    display: 'inline-block',
    textAlign: 'center',
    padding: '0px',
    backgroundColor: 'purple',
    color: 'white',
  },
  ChatButtonGM: {
    width: 40,
    height: 26,
    float: 'right',
    display: 'inline-block',
    textAlign: 'center',
    padding: '0px',
  },
  ChatDices: {
    width: widthLeft / 2,
    height: '25px',
    float: 'left',
    display: 'inline-block',
    position: 'relative',
  },
  ChatDice: {
    padding: '1px 5px',
    width: '23px',
    height: '23px',
    float: 'left',
    display: 'inline-block',
    position: 'relative',
    cursor: cursorPointer,
  },
  ChatPanel: {
    width: widthLeft / 2,
    position: 'absolute',
    height: heightLeft / 2,
    top: heightLeft / 2 + heightHeader,
  },
  ChatImageContainer: {
    width: 20,
    height: 25,
    position: 'absolute',
    bottom: 3,
    left: 0,
  },
  ChatSelect: {
    display: 'inline-block',
    float: 'left',
    width: 40,
  },
};

class ChatPanel extends PureComponent {
  state = {
    gmCommands: false,
    bonus: 0,
  };
  messagesEnd = null;
  chatInputRef = null;

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chatInput !== this.props.chatInput) {
      this.chatInputRef.focus();
    }
    if(prevProps.chatHistory.length !== this.props.chatHistory.length)
    {
      this.scrollToBottom();
    }
  }

  onChangeDice = value => {
    this.setState(state => ({
      ...state,
      bonus: value,
    }));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.talkInChat();
    }
  };

  generateChat = chatHistory => {
    const table = [];
    chatHistory.map((row, index) => {
      if (row.viewers && this.isAViewer(row.viewers)) {
        table.push(<ChatRow key={`chat-row-${index}`} {...row} />);
      } else if (!row.viewers) {
        table.push(<ChatRow key={`chat-row-${index}`} {...row} />);
      }
      return null;
    });
    return table;
  };

  isAViewer = viewersTab => {
    const { pseudo, isGameMaster } = this.props;
    let canSeeMessage = false;

    viewersTab.map(viewer => {
      if (viewer === 'gm' && isGameMaster) canSeeMessage = true;
      if (viewer === pseudo) canSeeMessage = true;
      return null;
    });
    return canSeeMessage;
  };

  talkInChat = () => {
    const { chatInput, pseudo } = this.props;
    let noMagicWord = true;
    if (chatInput !== '') {
      if (chatInput.length >= 3) {
        if (this.diceAction('/d')) {
          noMagicWord = false;
        }
        if (this.diceAction('/dice')) {
          noMagicWord = false;
        }
        if (this.diceAction('/gmd', ['gm', pseudo])) {
          noMagicWord = false;
        }
        if (this.diceAction('/gmdice', ['gm', pseudo])) {
          noMagicWord = false;
        }
        if (this.whisperPlayerAction()) {
          noMagicWord = false;
        }
        if (this.whisperTeamAction()) {
          noMagicWord = false;
        }
        if (this.whisperGMAction()) {
          noMagicWord = false;
        }
      }
      if (chatInput.length >= 6) {
        if (this.sendTeamGoldAction()) {
          noMagicWord = false;
        } else if (this.sendGoldGMAction()) {
          noMagicWord = false;
        } else if (this.sendGoldAction()) {
          noMagicWord = false;
        }
      }
      switch (chatInput) {
        case '/strength':
        case '/stre':
        case '/force':
        case '/forc':
          noMagicWord = false;
          this.attributeAction('strength');
          break;
        case '/dexterity':
        case '/dext':
        case '/dextérité':
        case '/dexterite':
          noMagicWord = false;
          this.attributeAction('dexterity');
          break;
        case '/luck':
        case '/chance':
        case '/chan':
          noMagicWord = false;
          this.attributeAction('luck');
          break;
        case '/charisma':
        case '/char':
        case '/charisme':
          noMagicWord = false;
          this.attributeAction('charisma');
          break;
        case '/education':
        case '/educ':
        case '/éducation':
          noMagicWord = false;
          this.attributeAction('education');
          break;
        case '/perception':
        case '/perc':
          noMagicWord = false;
          this.attributeAction('perception');
          break;
        case '/constitution':
        case '/cons':
          noMagicWord = false;
          this.attributeAction('constitution');
          break;
        case '/magic':
        case '/magi':
        case '/magie':
          noMagicWord = false;
          this.attributeAction('magic');
          break;
        case '/gmstrength':
        case '/gmstre':
        case '/gmforce':
        case '/gmforc':
          noMagicWord = false;
          this.attributeAction('strength', true);
          break;
        case '/gmdexterity':
        case '/gmdext':
        case '/gmdextérité':
        case '/gmdexterite':
          noMagicWord = false;
          this.attributeAction('dexterity', true);
          break;
        case '/gmluck':
        case '/gmchance':
        case '/gmchan':
          noMagicWord = false;
          this.attributeAction('luck', true);
          break;
        case '/gmcharisma':
        case '/gmchar':
        case '/gmcharisme':
          noMagicWord = false;
          this.attributeAction('charisma', true);
          break;
        case '/gmeducation':
        case '/gmeduc':
        case '/gméducation':
          noMagicWord = false;
          this.attributeAction('education', true);
          break;
        case '/gmperception':
        case '/gmperc':
          noMagicWord = false;
          this.attributeAction('perception', true);
          break;
        case '/gmconstitution':
        case '/gmcons':
          noMagicWord = false;
          this.attributeAction('constitution', true);
          break;
        case '/gmmagic':
        case '/gmmagi':
        case '/gmmagie':
          noMagicWord = false;
          this.attributeAction('magic', true);
          break;
        default:
          break;
      }

      if (noMagicWord) {
        this.sendChatInput({ message: chatInput, pseudo });
      }
    }
  };

  whisperPlayerAction = () => {
    const { chatInput, pseudo, users, isGameMaster } = this.props;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const splittedString = chatInput.trim().split('/w ');
    let hasWhisperAction = false;
    if (splittedString.length > 1) {
      hasWhisperAction = true;
      Object.keys(users).map(key => {
        if (splittedString[1].split(users[key].pseudo).length > 1) {
          this.sendChatInput({
            message: `@${realPseudo}, you say to @${users[key].pseudo} :${
              splittedString[1].split(users[key].pseudo)[1]
            }`,
            viewers: [pseudo],
          });
          this.sendChatInput({
            message: `@${realPseudo} tells you secretly :${
              splittedString[1].split(users[key].pseudo)[1]
            }`,
            viewers: [users[key].pseudo],
          });
        }
        return null;
      });
    }
    return hasWhisperAction;
  };

  whisperGMAction = () => {
    const { chatInput, pseudo, users, gameMaster, isGameMaster } = this.props;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const splittedString = chatInput.trim().split('/gmw ');
    let hasWhisperAction = false;
    if (splittedString.length > 1) {
      hasWhisperAction = true;
      Object.keys(users).map(key => {
        if (key === gameMaster) {
          this.sendChatInput({
            message: `@${realPseudo}, you say to GM :${splittedString[1]}`,
            viewers: [pseudo],
          });
          this.sendChatInput({
            message: `@${realPseudo} tells GM secretly :${splittedString[1]}`,
            viewers: [users[key].pseudo],
          });
        }
        return null;
      });
    }
    return hasWhisperAction;
  };

  whisperTeamAction = () => {
    const { chatInput, pseudo, users, gameMaster, isGameMaster } = this.props;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const splittedString = chatInput.trim().split('/tmw ');
    let hasWhisperAction = false;
    if (splittedString.length > 1) {
      hasWhisperAction = true;
      const team = [];

      Object.keys(users).map(key => {
        if (!key === gameMaster) {
          team.push(users[key].pseudo);
        }
        return null;
      });

      this.sendChatInput({
        message: `@${realPseudo} tells to team :${splittedString[1]}`,
        viewers: team,
      });
    }
    return hasWhisperAction;
  };

  diceAction = (limiter, viewers = null) => {
    const { chatInput, pseudo, isGameMaster } = this.props;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(limiter)[1];
    const isnum = /^\d+$/.test(splittedString);
    if (isnum) {
      this.sendChatInput({
        message: `@${realPseudo} launched a D${splittedString}. Result : ${Math.floor(
          Math.random() * parseInt(splittedString, 10) + 1
        )}`,
        viewers,
      });
    }
    return isnum;
  };

  sendGoldGMAction = () => {
    const {
      chatInput,
      character,
      pseudo,
      uid,
      currentStory,
      isGameMaster,
    } = this.props;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(' ');
    if (splittedString.length === 2 && splittedString[0] === '/goldgm') {
      const isnum = /^\d+$/.test(splittedString[1]);
      if (isnum) {
        if (
          parseInt(character.gold, 10) - parseInt(splittedString[1], 10) >=
          0
        ) {
          this.sendChatInput({
            message: `@${realPseudo} gave ${
              splittedString[1]
            } gold to the GameMaster. He is very thankfull !`,
          });
          firebase
            .database()
            .ref(
              'stories/' +
                currentStory +
                '/characters/' +
                uid +
                '/character/gold'
            )
            .set(parseInt(character.gold, 10) - parseInt(splittedString[1], 10))
            .catch(error => {
              // Handle Errors here.
              this.props.triggerError(error);
            });
        }

        return true;
      }
    }
    return false;
  };

  sendGoldAction = () => {
    const {
      chatInput,
      pseudo,
      storyCharacters,
      character,
      uid,
      currentStory,
      isGameMaster,
    } = this.props;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(' ');
    if (splittedString.length === 3 && splittedString[0] === '/gold') {
      let playerIsInTeam = false;
      storyCharacters.map(sc => {
        if (sc.userPseudo.toLowerCase() === splittedString[1].toLowerCase()) {
          playerIsInTeam = { ...sc };
        }
        return null;
      });
      if (playerIsInTeam) {
        const isnum = /^\d+$/.test(splittedString[2]);
        if (isnum) {
          if (
            parseInt(character.gold, 10) - parseInt(splittedString[2], 10) >=
            0
          ) {
            this.sendChatInput({
              message: `You gave ${splittedString[2]} gold to ${
                splittedString[1]
              }.`,
              viewers: [pseudo],
            });
            this.sendChatInput({
              message: `@${realPseudo} gave ${splittedString[2]} gold to you.`,
              viewers: [splittedString[1]],
            });

            firebase
              .database()
              .ref(
                'stories/' +
                  currentStory +
                  '/characters/' +
                  uid +
                  '/character/gold'
              )
              .set(
                parseInt(character.gold, 10) - parseInt(splittedString[2], 10)
              )
              .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
              });

            firebase
              .database()
              .ref(
                'stories/' +
                  currentStory +
                  '/characters/' +
                  playerIsInTeam.userUid +
                  '/character/gold'
              )
              .set(
                parseInt(playerIsInTeam.gold, 10) +
                  parseInt(splittedString[2], 10)
              )
              .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
              });
            return true;
          }
        }
      }
    }
    return false;
  };

  sendTeamGoldAction = () => {
    const {
      chatInput,
      pseudo,
      storyCharacters,
      character,
      currentStory,
      gameMaster,
      isGameMaster,
    } = this.props;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(' ');
    if (
      splittedString.length === 2 &&
      (splittedString[0] === '/goldtm' || splittedString[0] === '/goldteam')
    ) {
      if (storyCharacters.length > 2) {
        const isnum = /^\d+$/.test(splittedString[1]);
        if (isnum) {
          if (
            parseInt(character.gold, 10) - parseInt(splittedString[1], 10) >=
            0
          ) {
            const goldLeft =
              parseInt(splittedString[1], 10) % (storyCharacters.length - 2);
            const goldForEach = Math.floor(
              parseInt(splittedString[1], 10) / (storyCharacters.length - 2)
            );

            this.sendChatInput({
              message: `@${realPseudo} gave ${
                splittedString[1]
              } gold to the team (${goldForEach} each).`,
            });

            let updates = {};
            storyCharacters.map(sc => {
              if (sc.userUid !== gameMaster && sc.userPseudo !== pseudo) {
                updates['/' + sc.userUid + '/character/gold'] =
                  parseInt(sc.gold, 10) + goldForEach;
              }
              if (sc.userPseudo === pseudo) {
                updates['/' + sc.userUid + '/character/gold'] =
                  parseInt(sc.gold, 10) -
                  parseInt(splittedString[1], 10) +
                  goldLeft;
              }
              return null;
            });

            firebase
              .database()
              .ref('stories/' + currentStory + '/characters')
              .update(updates)
              .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
              });
            return true;
          }
        }
      }
    }
    return false;
  };

  attributeAction = (attribute, isGm = false) => {
    const { pseudo, character, isGameMaster } = this.props;
    const { gmCommands, bonus } = this.state;
    const realPseudo = isGameMaster ? 'GM' : pseudo;
    const dice = Math.floor(Math.random() * parseInt(100, 10) + 1);
    let message = '';
    let bonusMessage = '';

    if (bonus > 0) {
      bonusMessage = ' (+' + bonus + ')';
    }
    if (bonus < 0) {
      bonusMessage = ' (' + bonus + ')';
    }

    if (dice < 6) {
      message = `@${realPseudo} tried a ${attribute} action${bonusMessage}. Result : ${dice} (Critical success !)`;
    } else if (
      dice <=
      parseInt(character[attribute], 10) + parseInt(bonus, 10)
    ) {
      message = `@${realPseudo} tried a ${attribute} action${bonusMessage}. Result : ${dice} (Success !)`;
    } else if (dice > 95) {
      message = `@${realPseudo} tried a ${attribute} action${bonusMessage}. Result : ${dice} (Critical fail !)`;
    } else {
      message = `@${realPseudo} tried a ${attribute} action${bonusMessage}. Result : ${dice} (Fail !)`;
    }
    if (isGm || gmCommands) {
      this.sendChatInput({
        message,
        viewers: ['gm', pseudo],
      });
    } else {
      this.sendChatInput({
        message,
      });
    }
  };

  sendChatInput = input => {
    const { doSetState, triggerError } = this.props;
    firebase
      .database()
      .ref('chat/')
      .push(input)
      .then(() => {
        doSetState({
          error: '',
          chatInput: '',
        });
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  launchCommand = command => {
    this.props.doSetState(
      {
        error: '',
        chatInput: (this.state.gmCommands ? '/gm' : '/') + command,
      },
      () => this.talkInChat()
    );
  };

  toggleGMCommands = () => {
    this.setState(state => ({
      ...state,
      gmCommands: !state.gmCommands,
    }));
  };

  onDrop = picture => {
    const { triggerError, chatInput, doSetState } = this.props;
    const newPostKey = firebase
      .database()
      .ref('chat/')
      .push().key;
    const path =
      'images/chat/' +
      newPostKey +
      '_image.' +
      picture[picture.length - 1].name.split('.')[1];

    firebase
      .storage()
      .ref()
      .child(path)
      .put(picture[picture.length - 1])
      .then(() => {
        firebase
          .storage()
          .ref()
          .child(path)
          .getDownloadURL()
          .then(url => {
            firebase
              .database()
              .ref('chat/' + newPostKey)
              .set({
                message: chatInput,
                imagePath: path,
                image: url,
              })
              .then(() => {
                doSetState({
                  error: '',
                  chatInput: '',
                });
              })
              .catch(error => {
                // Handle Errors here.
                triggerError(error);
              });
          })
          .catch(error => {
            // Handle any errors
            triggerError(error);
          });
      });
  };

  render() {
    const { chatInput, chatHistory, onChange } = this.props;
    const { gmCommands, bonus } = this.state;

    return (
      <div style={styles.ChatPanel}>
        <div style={styles.Historic}>
          {this.generateChat(chatHistory)}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <div style={styles.ChatDices}>
          {chatDices.map(d => {
            return (
              <img
                src={d.image}
                alt={d.alt}
                style={styles.ChatDice}
                onClick={() => this.launchCommand(d.attribute)}
                data-tip={d.tip}
              />
            );
          })}
          <SelectMapper
            mapArray={bonusList}
            value={bonus}
            onChange={this.onChangeDice}
            style={styles.ChatSelect}
          />
          <button
            style={gmCommands ? styles.ChatButtonGMActive : styles.ChatButtonGM}
            onClick={this.toggleGMCommands}
          >
            GM
          </button>
        </div>
        <div style={styles.ChatBox}>
          <div style={styles.ChatImageContainer}>
            <FileUploader
              onDrop={this.onDrop}
              buttonText="+"
              fileContainerStyle={{ padding: 0, margin: 0, display: 'block' }}
              buttonStyles={{
                width: 20,
                padding: 0,
                margin: 0,
                border: '1px solid #3f4257',
              }}
              withIcon={false}
              label=""
            />
          </div>
          <input
            type="text"
            name="chatInput"
            placeholder="Chat !"
            value={chatInput}
            onChange={e => {
              onChange(e.target.name, e.target.value);
            }}
            style={styles.ChatInput}
            onKeyPress={this.handleKeyPress}
            ref={input => {
              this.chatInputRef = input;
            }}
          />
          <ButtonLarge style={styles.ChatButton} onClick={this.talkInChat}>
            OK
          </ButtonLarge>
        </div>
        <ReactTooltip />
      </div>
    );
  }
}

ChatPanel.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  gameMaster: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
  currentStory: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  pseudo: PropTypes.string.isRequired,
  chatInput: PropTypes.string.isRequired,
  chatHistory: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default ChatPanel;
