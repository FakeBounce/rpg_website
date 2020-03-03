import React, { useState, useEffect } from "react";
import firebase from "firebase";
import ReactTooltip from "react-tooltip";
import {
  cursorPointer,
  heightHeader,
  heightLeft,
  widthLeft,
} from "../Utils/StyleConstants";
import { chatTabs, colors } from "../Utils/Constants";
import ChatBar from "./ChatBar";
import ChatDicesRow from "./ChatDicesRow";
import ChatHistory from "./ChatHistory";
import { useDispatch, useSelector } from "react-redux";
import { CALL_PRINT_ERROR } from "../../redux/actionsTypes/actionsTypesAppState";
import { useChatInputContext } from "../../contexts/chatInputContext";
import { Menu } from "semantic-ui-react";

const styledChatPanel = {
  width: widthLeft / 2,
  position: "absolute",
  height: heightLeft / 2 + 4,
  top: heightLeft / 2 + heightHeader - 2,
  backgroundColor: colors.background,
  color: colors.text,
  fontSize: 15,
};

const styledChatMenuItem = {
  width: 75,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  backgroundColor: colors.background,
  color: "white",
  cursor: cursorPointer,
};

const ChatPanel = () => {
  const [gmCommands, setGmCommands] = useState(false);
  const [activeChatTab, setActiveChatTab] = useState("");
  const [whispersTab, setWhispersTab] = useState([]);
  const [bonus, setBonus] = useState(0);
  const { chatInput, setChatInput } = useChatInputContext();
  const dispatch = useDispatch();
  const {
    currentStory,
    isGameMaster,
    gameMaster,
    pseudo,
    uid,
    character,
    storyCharacters,
    users,
    history,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    isGameMaster: store.appState.isGameMaster,
    gameMaster: store.appState.gameMaster,
    pseudo: store.userInfos.pseudo,
    uid: store.userInfos.uid,
    character: store.character,
    storyCharacters: store.team.characters,
    history: store.chat.history,
    users: store.appState.users,
  }));

  const getWhispers = () => {
    let privateTabs = [...whispersTab];
    Object.keys(history).map(key => {
      if (history[key].viewers && isAViewer(history[key].viewers)) {
        history[key].viewers.map(v => {
          if (v !== pseudo) {
            privateTabs.push(v);
          }
          return null;
        });
      }
      return null;
    });
    setWhispersTab(privateTabs);
  };

  useEffect(() => {
    getWhispers();
  }, [history]);

  const isAViewer = viewersTab => {
    const { pseudo, isGameMaster } = this.props;
    let canSeeMessage = false;

    viewersTab.map(viewer => {
      if ((viewer === "gm" && isGameMaster) || viewer === pseudo) {
        canSeeMessage = true;
      }
      return null;
    });
    return canSeeMessage;
  };

  const dispatchCallPrintError = payload => {
    dispatch({ type: CALL_PRINT_ERROR, payload });
  };

  const toggleGMCommands = () => {
    setGmCommands(!gmCommands);
  };

  const launchCommand = command => {
    attributeAction(command, gmCommands);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      talkInChat();
    }
  };

  const talkInChat = () => {
    let noMagicWord = true;
    if (chatInput !== "") {
      if (chatInput.length >= 3) {
        if (diceAction("/d")) {
          noMagicWord = false;
        }
        if (diceAction("/dice")) {
          noMagicWord = false;
        }
        if (diceAction("/gmd", ["gm", pseudo])) {
          noMagicWord = false;
        }
        if (diceAction("/gmdice", ["gm", pseudo])) {
          noMagicWord = false;
        }
        if (whisperPlayerAction()) {
          noMagicWord = false;
        }
        if (whisperTeamAction()) {
          noMagicWord = false;
        }
        if (whisperGMAction()) {
          noMagicWord = false;
        }
      }
      if (chatInput.length >= 6) {
        if (sendTeamGoldAction()) {
          noMagicWord = false;
        } else if (sendGoldGMAction()) {
          noMagicWord = false;
        } else if (sendGoldAction()) {
          noMagicWord = false;
        }
      }
      switch (chatInput) {
        case "/strength":
        case "/stre":
        case "/force":
        case "/forc":
          noMagicWord = false;
          attributeAction("strength");
          break;
        case "/dexterity":
        case "/dext":
        case "/dextérité":
        case "/dexterite":
          noMagicWord = false;
          attributeAction("dexterity");
          break;
        case "/luck":
        case "/chance":
        case "/chan":
          noMagicWord = false;
          attributeAction("luck");
          break;
        case "/charisma":
        case "/char":
        case "/charisme":
          noMagicWord = false;
          attributeAction("charisma");
          break;
        case "/education":
        case "/educ":
        case "/éducation":
          noMagicWord = false;
          attributeAction("education");
          break;
        case "/perception":
        case "/perc":
          noMagicWord = false;
          attributeAction("perception");
          break;
        case "/constitution":
        case "/cons":
          noMagicWord = false;
          attributeAction("constitution");
          break;
        case "/magic":
        case "/magi":
        case "/magie":
          noMagicWord = false;
          attributeAction("magic");
          break;
        case "/gmstrength":
        case "/gmstre":
        case "/gmforce":
        case "/gmforc":
          noMagicWord = false;
          attributeAction("strength", true);
          break;
        case "/gmdexterity":
        case "/gmdext":
        case "/gmdextérité":
        case "/gmdexterite":
          noMagicWord = false;
          attributeAction("dexterity", true);
          break;
        case "/gmluck":
        case "/gmchance":
        case "/gmchan":
          noMagicWord = false;
          attributeAction("luck", true);
          break;
        case "/gmcharisma":
        case "/gmchar":
        case "/gmcharisme":
          noMagicWord = false;
          attributeAction("charisma", true);
          break;
        case "/gmeducation":
        case "/gmeduc":
        case "/gméducation":
          noMagicWord = false;
          attributeAction("education", true);
          break;
        case "/gmperception":
        case "/gmperc":
          noMagicWord = false;
          attributeAction("perception", true);
          break;
        case "/gmconstitution":
        case "/gmcons":
          noMagicWord = false;
          attributeAction("constitution", true);
          break;
        case "/gmmagic":
        case "/gmmagi":
        case "/gmmagie":
          noMagicWord = false;
          attributeAction("magic", true);
          break;
        default:
          break;
      }

      if (noMagicWord) {
        sendChatInput({
          message: chatInput,
          pseudo,
          characterName: isGameMaster ? "GM" : character.name,
        });
      }
    }
  };

  const whisperPlayerAction = () => {
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

          sendChatInput(
            {
              message: `@${realPseudo}, you say to @${users[key].pseudo} :${textToSend}`,
              viewers: [pseudo],
            },
            "/w " + users[key].pseudo + " ",
          );
          sendChatInput(
            {
              message: `@${realPseudo} tells you secretly :${textToSend}`,
              viewers: [users[key].pseudo],
            },
            "/w " + users[key].pseudo + " ",
          );
        }
        return null;
      });
    }
    return hasWhisperAction;
  };

  const whisperGMAction = () => {
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput.trim().split("/gmw ");
    let hasWhisperAction = false;
    if (splittedString.length > 1) {
      hasWhisperAction = true;
      Object.keys(users).map(key => {
        if (key === gameMaster) {
          sendChatInput(
            {
              message: `@${realPseudo}, you say to GM :${splittedString[1]}`,
              viewers: [pseudo],
            },
            "/gmw ",
          );
          sendChatInput(
            {
              message: `@${realPseudo} tells GM secretly :${splittedString[1]}`,
              viewers: [users[key].pseudo],
            },
            "/gmw ",
          );
        }
        return null;
      });
    }
    return hasWhisperAction;
  };

  const whisperTeamAction = () => {
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput.trim().split("/tmw ");
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

      sendChatInput(
        {
          message: `@${realPseudo} tells to team :${splittedString[1]}`,
          viewers: team,
        },
        "/tmw ",
      );
    }

    return hasWhisperAction;
  };

  const diceAction = (limiter, viewers = null) => {
    const realPseudo = isGameMaster ? "GM" : character.name;
    const splittedString = chatInput
      .toLowerCase()
      .trim()
      .split(limiter)[1];
    const isnum = /^\d+$/.test(splittedString);
    if (isnum) {
      sendChatInput({
        message: `@${realPseudo} launched a D${splittedString}. Result : ${Math.floor(
          Math.random() * parseInt(splittedString, 10) + 1,
        )}`,
        viewers,
      });
    }
    return isnum;
  };

  const sendGoldGMAction = () => {
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
          sendChatInput({
            message: `@${realPseudo} gave ${splittedString[1]} gold to the GameMaster. He is very thankfull !`,
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
              dispatchCallPrintError(error);
            });
        }

        return true;
      }
    }
    return false;
  };

  const sendGoldAction = () => {
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
            sendChatInput({
              message: `You gave ${splittedString[2]} gold to ${splittedString[1]}.`,
              viewers: [pseudo],
            });
            sendChatInput({
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
                dispatchCallPrintError(error);
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
                dispatchCallPrintError(error);
              });
            return true;
          }
        }
      }
    }
    return false;
  };

  const sendTeamGoldAction = () => {
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

            sendChatInput({
              message: `@${realPseudo} gave ${splittedString[1]} gold to the team (${goldForEach} each).`,
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
                dispatchCallPrintError(error);
              });
            return true;
          }
        }
      }
    }
    return false;
  };

  const attributeAction = (attribute, isGm = false) => {
    const realPseudo = isGameMaster ? "GM" : character.name;
    const dice = Math.floor(Math.random() * parseInt(100, 10) + 1);
    let message;
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
      parseInt(character.attributes[attribute], 10) + parseInt(bonus, 10)
    ) {
      message = `@${realPseudo} tried a ${attribute} action${bonusMessage}. Result : ${dice} (Success !)`;
    } else if (dice > 95) {
      message = `@${realPseudo} tried a ${attribute} action${bonusMessage}. Result : ${dice} (Critical fail !)`;
    } else {
      message = `@${realPseudo} tried a ${attribute} action${bonusMessage}. Result : ${dice} (Fail !)`;
    }
    if (isGm || gmCommands) {
      sendChatInput({
        message,
        viewers: ["gm", pseudo],
      });
    } else {
      sendChatInput({
        message,
      });
    }
  };

  const sendChatInput = (input, talking = "") => {
    firebase
      .database()
      .ref("/stories/" + currentStory + "/chat/")
      .push(input)
      .then(() => {
        setChatInput(talking);
      })
      .catch(error => {
        // Handle Errors here.
        dispatchCallPrintError(error);
      });
  };

  const onDrop = picture => {
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
                setChatInput("");
              })
              .catch(error => {
                // Handle Errors here.
                dispatchCallPrintError(error);
              });
          })
          .catch(error => {
            // Handle any errors
            dispatchCallPrintError(error);
          });
      });
  };

  return (
    <div style={styledChatPanel}>
      <Menu attached="top" tabular>
        {chatTabs.map(ct => {
          return (
            <Menu.Item
              name={ct}
              active={activeChatTab === ct.toLowerCase()}
              onClick={() => {
                setActiveChatTab(ct);
              }}
              style={styledChatMenuItem}
            />
          );
        })}
        {whispersTab.map(ct => {
          return (
            <Menu.Item
              name={ct}
              active={activeChatTab === ct.toLowerCase()}
              onClick={() => {
                setActiveChatTab(ct);
              }}
              style={styledChatMenuItem}
            />
          );
        })}
      </Menu>
      <ChatHistory activeChatTab={activeChatTab} />
      <ChatDicesRow
        bonus={bonus}
        gmCommands={gmCommands}
        launchCommand={launchCommand}
        onChangeDice={setBonus}
        toggleGMCommands={toggleGMCommands}
      />
      <ChatBar
        talkInChat={talkInChat}
        onDrop={onDrop}
        handleKeyPress={handleKeyPress}
      />
      <ReactTooltip />
    </div>
  );
};

export default ChatPanel;
