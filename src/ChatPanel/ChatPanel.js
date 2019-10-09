import React, { PureComponent } from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { heightHeader, heightLeft, widthLeft } from "../Utils/StyleConstants";
import { colors } from "../Utils/Constants";
import ChatBar from "./ChatBar";
import ChatDicesRow from "./ChatDicesRow";
import ChatHistory from "./ChatHistory";

const styledChatPanel = {
  width: widthLeft / 2,
  position: "absolute",
  height: heightLeft / 2 + 4,
  top: heightLeft / 2 + heightHeader - 2,
  backgroundColor: colors.background,
  color: colors.text,
  fontSize: 15,
};

class ChatPanel extends PureComponent {
  state = {
    gmCommands: false,
    bonus: 0,
    isTalking: "",
  };

  onChangeDice = value => {
    this.setState(state => ({
      ...state,
      bonus: value,
    }));
  };

  toggleGMCommands = () => {
    this.setState(state => ({
      ...state,
      gmCommands: !state.gmCommands,
    }));
  };

  launchCommand = command => {
    const { gmCommands } = this.state;
    this.attributeAction(command, gmCommands);
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.talkInChat();
    }
  };

  talkInChat = () => {
    const { chatInput, pseudo, character, isGameMaster } = this.props;
    let noMagicWord = true;
    if (chatInput !== "") {
      if (chatInput.length >= 3) {
        if (this.diceAction("/d")) {
          noMagicWord = false;
        }
        if (this.diceAction("/dice")) {
          noMagicWord = false;
        }
        if (this.diceAction("/gmd", ["gm", pseudo])) {
          noMagicWord = false;
        }
        if (this.diceAction("/gmdice", ["gm", pseudo])) {
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
        case "/strength":
        case "/stre":
        case "/force":
        case "/forc":
          noMagicWord = false;
          this.attributeAction("strength");
          break;
        case "/dexterity":
        case "/dext":
        case "/dextérité":
        case "/dexterite":
          noMagicWord = false;
          this.attributeAction("dexterity");
          break;
        case "/luck":
        case "/chance":
        case "/chan":
          noMagicWord = false;
          this.attributeAction("luck");
          break;
        case "/charisma":
        case "/char":
        case "/charisme":
          noMagicWord = false;
          this.attributeAction("charisma");
          break;
        case "/education":
        case "/educ":
        case "/éducation":
          noMagicWord = false;
          this.attributeAction("education");
          break;
        case "/perception":
        case "/perc":
          noMagicWord = false;
          this.attributeAction("perception");
          break;
        case "/constitution":
        case "/cons":
          noMagicWord = false;
          this.attributeAction("constitution");
          break;
        case "/magic":
        case "/magi":
        case "/magie":
          noMagicWord = false;
          this.attributeAction("magic");
          break;
        case "/gmstrength":
        case "/gmstre":
        case "/gmforce":
        case "/gmforc":
          noMagicWord = false;
          this.attributeAction("strength", true);
          break;
        case "/gmdexterity":
        case "/gmdext":
        case "/gmdextérité":
        case "/gmdexterite":
          noMagicWord = false;
          this.attributeAction("dexterity", true);
          break;
        case "/gmluck":
        case "/gmchance":
        case "/gmchan":
          noMagicWord = false;
          this.attributeAction("luck", true);
          break;
        case "/gmcharisma":
        case "/gmchar":
        case "/gmcharisme":
          noMagicWord = false;
          this.attributeAction("charisma", true);
          break;
        case "/gmeducation":
        case "/gmeduc":
        case "/gméducation":
          noMagicWord = false;
          this.attributeAction("education", true);
          break;
        case "/gmperception":
        case "/gmperc":
          noMagicWord = false;
          this.attributeAction("perception", true);
          break;
        case "/gmconstitution":
        case "/gmcons":
          noMagicWord = false;
          this.attributeAction("constitution", true);
          break;
        case "/gmmagic":
        case "/gmmagi":
        case "/gmmagie":
          noMagicWord = false;
          this.attributeAction("magic", true);
          break;
        default:
          break;
      }

      if (noMagicWord) {
        this.sendChatInput({
          message: chatInput,
          pseudo,
          characterName: isGameMaster ? "GM" : character.name,
        });
      }
    }
  };

  whisperPlayerAction = () => {
    const { chatInput, pseudo, character, users, isGameMaster } = this.props;
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput.trim().split("/w ");
    let hasWhisperAction = false;
    if (splittedString.length > 1) {
      hasWhisperAction = true;
      Object.keys(users).map(key => {
        if (
          users[key].pseudo &&
          splittedString[1].indexOf(users[key].pseudo) > -1
        ) {
          const textToSend = splittedString[1]
            .split(users[key].pseudo)[1]
            .trim();

          this.setState(
            state => ({
              ...state,
              isTalking: "/w " + users[key].pseudo + " ",
            }),
            () => {
              this.sendChatInput({
                message: `@${realPseudo}, you say to @${
                  users[key].pseudo
                } :${textToSend}`,
                viewers: [pseudo],
              });
              this.sendChatInput({
                message: `@${realPseudo} tells you secretly :${textToSend}`,
                viewers: [users[key].pseudo],
              });
            },
          );
        }
        return null;
      });
    }
    return hasWhisperAction;
  };

  whisperGMAction = () => {
    const {
      chatInput,
      pseudo,
      character,
      users,
      gameMaster,
      isGameMaster,
    } = this.props;
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput.trim().split("/gmw ");
    let hasWhisperAction = false;
    if (splittedString.length > 1) {
      hasWhisperAction = true;
      this.setState(
        state => ({
          ...state,
          isTalking: "/gmw ",
        }),
        () => {
          Object.keys(users).map(key => {
            if (key === gameMaster) {
              this.sendChatInput({
                message: `@${realPseudo}, you say to GM :${splittedString[1]}`,
                viewers: [pseudo],
              });
              this.sendChatInput({
                message: `@${realPseudo} tells GM secretly :${
                  splittedString[1]
                }`,
                viewers: [users[key].pseudo],
              });
            }
            return null;
          });
        },
      );
    }
    return hasWhisperAction;
  };

  whisperTeamAction = () => {
    const {
      chatInput,
      users,
      gameMaster,
      isGameMaster,
      character,
    } = this.props;
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput.trim().split("/tmw ");
    let hasWhisperAction = false;
    if (splittedString.length > 1) {
      hasWhisperAction = true;
      this.setState(
        state => ({
          ...state,
          isTalking: "/tmw ",
        }),
        () => {
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
        },
      );
    }

    return hasWhisperAction;
  };

  diceAction = (limiter, viewers = null) => {
    const { chatInput, character, isGameMaster } = this.props;
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(limiter)[1];
    const isnum = /^\d+$/.test(splittedString);
    if (isnum) {
      this.sendChatInput({
        message: `@${realPseudo} launched a D${splittedString}. Result : ${Math.floor(
          Math.random() * parseInt(splittedString, 10) + 1,
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
      uid,
      currentStory,
      isGameMaster,
    } = this.props;
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(" ");
    if (splittedString.length === 2 && splittedString[0] === "/goldgm") {
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
              "stories/" +
                currentStory +
                "/characters/" +
                uid +
                "/character/gold",
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
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(" ");
    if (splittedString.length === 3 && splittedString[0] === "/gold") {
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
                "stories/" +
                  currentStory +
                  "/characters/" +
                  uid +
                  "/character/gold",
              )
              .set(
                parseInt(character.gold, 10) - parseInt(splittedString[2], 10),
              )
              .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
              });

            firebase
              .database()
              .ref(
                "stories/" +
                  currentStory +
                  "/characters/" +
                  playerIsInTeam.userUid +
                  "/character/gold",
              )
              .set(
                parseInt(playerIsInTeam.gold, 10) +
                  parseInt(splittedString[2], 10),
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
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(" ");
    if (
      splittedString.length === 2 &&
      (splittedString[0] === "/goldtm" || splittedString[0] === "/goldteam")
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
              parseInt(splittedString[1], 10) / (storyCharacters.length - 2),
            );

            this.sendChatInput({
              message: `@${realPseudo} gave ${
                splittedString[1]
              } gold to the team (${goldForEach} each).`,
            });

            let updates = {};
            storyCharacters.map(sc => {
              if (sc.userUid !== gameMaster && sc.userPseudo !== pseudo) {
                updates["/" + sc.userUid + "/character/gold"] =
                  parseInt(sc.gold, 10) + goldForEach;
              }
              if (sc.userPseudo === pseudo) {
                updates["/" + sc.userUid + "/character/gold"] =
                  parseInt(sc.gold, 10) -
                  parseInt(splittedString[1], 10) +
                  goldLeft;
              }
              return null;
            });

            firebase
              .database()
              .ref("stories/" + currentStory + "/characters")
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
    const realPseudo = isGameMaster ? "GM" : character.name;
    const dice = Math.floor(Math.random() * parseInt(100, 10) + 1);
    let message = "";
    let bonusMessage = "";

    if (bonus > 0) {
      bonusMessage = " (+" + bonus + ")";
    }
    if (bonus < 0) {
      bonusMessage = " (" + bonus + ")";
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
        viewers: ["gm", pseudo],
      });
    } else {
      this.sendChatInput({
        message,
      });
    }
  };

  sendChatInput = (input, talking = this.state.isTalking) => {
    const { currentStory, doSetState, triggerError } = this.props;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/chat/")
      .push(input)
      .then(() => {
        doSetState(
          {
            error: "",
            chatInput: talking,
          },
          () => {
            this.setState(state => ({
              ...state,
              isTalking: "",
            }));
          },
        );
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  onDrop = picture => {
    const { triggerError, chatInput, doSetState, currentStory } = this.props;
    const newPostKey = firebase
      .database()
      .ref("/stories/" + currentStory + "/chat/")
      .push().key;
    const path =
      "images/chat/" +
      newPostKey +
      "_image." +
      picture[picture.length - 1].name.split(".")[1];

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
              .ref("/stories/" + currentStory + "/chat/" + newPostKey)
              .set({
                message: chatInput,
                imagePath: path,
                image: url,
              })
              .then(() => {
                doSetState({
                  error: "",
                  chatInput: "",
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
    const { chatInput, chatHistory, onChange, gameMaster, pseudo } = this.props;
    const { gmCommands, bonus } = this.state;

    return (
      <div style={styledChatPanel}>
        <ChatHistory
          gameMaster={gameMaster}
          pseudo={pseudo}
          chatHistory={chatHistory}
        />
        <ChatDicesRow
          bonus={bonus}
          gmCommands={gmCommands}
          launchCommand={this.launchCommand}
          onChangeDice={this.onChangeDice}
          toggleGMCommands={this.toggleGMCommands}
        />
        <ChatBar
          chatInput={chatInput}
          onChange={onChange}
          talkInChat={this.talkInChat}
          onDrop={this.onDrop}
          handleKeyPress={this.handleKeyPress}
        />
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
  chatHistory: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default ChatPanel;
