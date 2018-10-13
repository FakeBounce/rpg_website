import React, { Component } from "react";
import PropTypes from "prop-types";

import BottomPanel from "./BottomPanel";
import ChatCommandsPanel from "./ChatCommandsPanel";
import Header from "./Header";
import MiddlePanel from "./MiddlePanel";
import {
    heightCameras,
    heightHeader,
    heightLeft,
    widthRightPanel,
    mapWidth,
    widthLeft,
} from "./StyleConstants";
import firebase from "firebase";

const styledEventAction = {
    margin: "0px 15px",
    padding: 5,
    textAlign: "center",
    position: "relative",
    display: "inline-block",
};

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
    float: "left",
    position: "relative",
    display: "inline-block",
};

const styledViewer = {
    width: 100,
    height: 20,
    textAlign: "center",
    position: "relative",
    display: "inline-block",
};

const styledNoViewer = {
    border: "1px solid red",
};

class GameScreen extends Component {
    state = {
        numberWanted: 0,
        isEventHidden: false,
    };

    addItem = (item, quantity) => {
        const { currentStory, uid, character } = this.props;
        const newItemsTab = character.items ? [...character.items] : [];
        let hasAlready = false;
        if (character.items) {
            character.items.map((i, index) => {
                if (i.name === item.name) {
                    hasAlready = true;
                    newItemsTab[index].quantity =
                        parseInt(newItemsTab[index].quantity, 10) + quantity;
                }
                return null;
            });
        }
        if (!hasAlready) {
            newItemsTab.push({ ...item, quantity });
        }
        firebase
            .database()
            .ref(
                "stories/" + currentStory + "/characters/" + uid + "/character",
            )
            .set({
                ...character,
                items: newItemsTab,
            })
            .catch(error => {
                // Handle Errors here.
                this.triggerError(error);
            });
    };

    takeAllItems = () => {
        const { currentEvent, eventHistory, pseudo, currentStory } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            const quantityLeft = newEvent.quantityLeft;
            newEvent.quantityLeft = 0;
            if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
                newEvent.actionHistory.push(
                    `@${pseudo} has taken all the items left (${quantityLeft}).`,
                );
            } else {
                newEvent.actionHistory = [
                    `@${pseudo} has taken all the items left (${quantityLeft}).`,
                ];
            }
            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };

            this.addItem(newEvent.item, quantityLeft);

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    takeXItem = () => {
        const {
            currentEvent,
            eventHistory,
            pseudo,
            currentStory,
            uid,
            character,
        } = this.props;
        const { numberWanted } = this.state;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            newEvent.quantityLeft = newEvent.quantityLeft - numberWanted;

            if (newEvent.quantityLeft > 0) {
                if (
                    newEvent.actionHistory &&
                    newEvent.actionHistory.length > 0
                ) {
                    newEvent.actionHistory.push(
                        `@${pseudo} has taken ${numberWanted} items. ${
                            newEvent.quantityLeft
                        } left)`,
                    );
                } else {
                    newEvent.actionHistory = [
                        `@${pseudo} has taken ${numberWanted} items. ${
                            newEvent.quantityLeft
                        } left)`,
                    ];
                }
            } else {
                if (
                    newEvent.actionHistory &&
                    newEvent.actionHistory.length > 0
                ) {
                    newEvent.actionHistory.push(
                        `@${pseudo} has taken the last items (${numberWanted}).`,
                    );
                } else {
                    newEvent.actionHistory = [
                        `@${pseudo} has taken the last items (${numberWanted}).`,
                    ];
                }
            }

            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };
            this.addItem(newEvent.item, numberWanted);

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    onlyOneItem = () => {
        const {
            currentEvent,
            eventHistory,
            pseudo,
            currentStory,
            uid,
            character,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            newEvent.quantityLeft = newEvent.quantityLeft - 1;

            if (newEvent.quantityLeft > 0) {
                if (
                    newEvent.actionHistory &&
                    newEvent.actionHistory.length > 0
                ) {
                    newEvent.actionHistory.push(
                        `@${pseudo} has taken only one item.(${
                            newEvent.quantityLeft
                        } left)`,
                    );
                } else {
                    newEvent.actionHistory = [
                        `@${pseudo} has taken only one item.(${
                            newEvent.quantityLeft
                        } left)`,
                    ];
                }
            } else {
                if (
                    newEvent.actionHistory &&
                    newEvent.actionHistory.length > 0
                ) {
                    newEvent.actionHistory.push(
                        `@${pseudo} has taken the last item.`,
                    );
                } else {
                    newEvent.actionHistory = [
                        `@${pseudo} has taken the last item.`,
                    ];
                }
            }

            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };
            this.addItem(newEvent.item, 1);

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    lastItem = () => {
        const {
            currentEvent,
            eventHistory,
            pseudo,
            currentStory,
            uid,
            character,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            newEvent.quantityLeft = 0;
            if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
                newEvent.actionHistory.push(`@${pseudo} has taken the item.`);
            } else {
                newEvent.actionHistory = [`@${pseudo} has taken the item.`];
            }
            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };
            this.addItem(newEvent.item, 1);

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    takeAllGold = () => {
        const {
            currentEvent,
            eventHistory,
            pseudo,
            currentStory,
            uid,
            character,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            const goldTaken = newEvent.goldLeft;
            newEvent.goldLeft = 0;
            if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
                newEvent.actionHistory.push(
                    `@${pseudo} has taken all the gold left (${goldTaken}).`,
                );
            } else {
                newEvent.actionHistory = [
                    `@${pseudo} has taken all the gold left (${goldTaken}).`,
                ];
            }
            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };

            firebase
                .database()
                .ref(
                    "stories/" +
                        currentStory +
                        "/characters/" +
                        uid +
                        "/character/gold",
                )
                .set(parseInt(character.gold, 10) + parseInt(goldTaken, 10))
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    takeXGold = () => {
        const {
            currentEvent,
            eventHistory,
            pseudo,
            currentStory,
            character,
            uid,
        } = this.props;
        const { numberWanted } = this.state;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            if (numberWanted <= eventHistory[currentEvent].goldLeft) {
                const newEvent = { ...eventHistory[currentEvent] };
                newEvent.goldLeft = newEvent.goldLeft - numberWanted;
                if (
                    newEvent.actionHistory &&
                    newEvent.actionHistory.length > 0
                ) {
                    newEvent.actionHistory.push(
                        `@${pseudo} has taken ${numberWanted} gold.`,
                    );
                } else {
                    newEvent.actionHistory = [
                        `@${pseudo} has taken ${numberWanted} gold.`,
                    ];
                }
                const newEventHistory = [...eventHistory];
                newEventHistory[currentEvent] = { ...newEvent };

                firebase
                    .database()
                    .ref("stories/" + currentStory + "/events")
                    .set(newEventHistory)
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
                            uid +
                            "/character/gold",
                    )
                    .set(
                        parseInt(character.gold, 10) +
                            parseInt(numberWanted, 10),
                    )
                    .catch(error => {
                        // Handle Errors here.
                        this.props.triggerError(error);
                    });
            }
        }
    };

    takeEquivalentGold = () => {
        const {
            currentEvent,
            eventHistory,
            pseudo,
            currentStory,
            storyCharacters,
            uid,
            character,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            let goldTaken = Math.floor(
                newEvent.gold / (storyCharacters.length - 1),
            );
            if (newEvent.goldLeft - goldTaken < 0) {
                goldTaken = newEvent.goldLeft;
            }
            newEvent.goldLeft = newEvent.goldLeft - goldTaken;
            if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
                newEvent.actionHistory.push(
                    `@${pseudo} has taken his part (${goldTaken}) of gold.`,
                );
            } else {
                newEvent.actionHistory = [
                    `@${pseudo} has taken his part (${goldTaken}) of gold.`,
                ];
            }
            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };

            firebase
                .database()
                .ref(
                    "stories/" +
                        currentStory +
                        "/characters/" +
                        uid +
                        "/character/gold",
                )
                .set(parseInt(character.gold, 10) + goldTaken)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    takeNothing = () => {
        const {
            currentEvent,
            eventHistory,
            pseudo,
            currentStory,
            doSetState,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            if (newEvent.actionHistory && newEvent.actionHistory.length > 0) {
                newEvent.actionHistory.push(
                    `@${pseudo} choosed to take nothing.`,
                );
            } else {
                newEvent.actionHistory = [
                    `@${pseudo} choosed to take nothing.`,
                ];
            }
            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
            doSetState({
                currentEvent: -1,
            });
        }
    };

    closeEvent = () => {
        const {
            currentEvent,
            eventHistory,
            currentStory,
            doSetState,
            isGameMaster,
            uid,
            storyCharacters,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            if (isGameMaster) {
                const newEvent = { ...eventHistory[currentEvent] };
                newEvent.isActive = false;
                const newEventHistory = [...eventHistory];
                newEventHistory[currentEvent] = { ...newEvent };

                firebase
                    .database()
                    .ref("stories/" + currentStory + "/events")
                    .set(newEventHistory)
                    .catch(error => {
                        // Handle Errors here.
                        this.props.triggerError(error);
                    });
                firebase
                    .database()
                    .ref("stories/" + currentStory + "/currentEvent")
                    .set(-1)
                    .catch(error => {
                        // Handle Errors here.
                        this.props.triggerError(error);
                    });
            } else {
                const newEvent = { ...eventHistory[currentEvent] };
                newEvent.hasViewed.push(uid);
                if (newEvent.viewers && newEvent.viewers.length > 0) {
                    if (
                        newEvent.hasViewed.length ===
                        newEvent.viewers.length + 1
                    ) {
                        newEvent.isActive = false;
                    }
                } else if (
                    newEvent.hasViewed.length === storyCharacters.length
                ) {
                    newEvent.isActive = false;
                }
                const newEventHistory = [...eventHistory];
                newEventHistory[currentEvent] = { ...newEvent };

                firebase
                    .database()
                    .ref("stories/" + currentStory + "/events")
                    .set(newEventHistory)
                    .catch(error => {
                        // Handle Errors here.
                        this.props.triggerError(error);
                    });

                if (!newEvent.isActive) {
                    firebase
                        .database()
                        .ref("stories/" + currentStory + "/currentEvent")
                        .set(-1)
                        .catch(error => {
                            // Handle Errors here.
                            this.props.triggerError(error);
                        });
                } else {
                    doSetState({
                        currentEvent: -1,
                    });
                }
            }
        }
    };

    onChange = (name, value) => {
        const obj = {};
        obj[name] = value;
        this.setState(state => ({
            ...state,
            ...obj,
        }));
    };

    canReadEvent = () => {
        const { eventHistory, currentEvent, uid, isGameMaster } = this.props;
        const { isEventHidden } = this.state;
        if (currentEvent > -1) {
            if (eventHistory[currentEvent]) {
                if (eventHistory[currentEvent].isActive) {
                    if (isGameMaster && !isEventHidden) {
                        return true;
                    }
                    if (eventHistory[currentEvent].viewers) {
                        let isAViewer = false;
                        eventHistory[currentEvent].viewers.map(v => {
                            if (v === uid) {
                                isAViewer = true;
                            }
                            return null;
                        });
                        return isAViewer;
                    } else {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    addViewerToEvent = uid => {
        const {
            currentEvent,
            eventHistory,
            currentStory,
            doSetState,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };
            newEvent.viewers.push(uid);
            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    removeViewerFromEvent = uid => {
        const {
            currentEvent,
            eventHistory,
            currentStory,
            doSetState,
            storyCharacters,
            gameMaster,
        } = this.props;
        if (currentEvent > -1 && eventHistory[currentEvent].isActive) {
            const newEvent = { ...eventHistory[currentEvent] };

            if (newEvent.viewers && newEvent.viewers.length > 0) {
                newEvent.viewers.map((ql, index) => {
                    if (ql === uid) {
                        newEvent.viewers.splice(index, 1);
                    }
                });
            } else {
                const userIds = [];
                storyCharacters.map(sc => {
                    if (sc.userUid !== uid && sc.userUid !== gameMaster) {
                        userIds.push(sc.userUid);
                    }
                });
                newEvent.viewers = [...userIds];
            }
            const newEventHistory = [...eventHistory];
            newEventHistory[currentEvent] = { ...newEvent };

            firebase
                .database()
                .ref("stories/" + currentStory + "/events")
                .set(newEventHistory)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    toggleEvent = () => {
        this.setState(state => ({
            ...state,
            isEventHidden: !state.isEventHidden,
        }));
    };

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
            currentEvent,
            eventHistory,
            doSetState,
            storyCharacters,
            character,
            gameMaster,
            ...rest
        } = this.props;

        const { numberWanted, isEventHidden } = this.state;

        return (
            <div>
                {isGameMaster && (
                    <button
                        onClick={this.toggleEvent}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 100,
                        }}
                    >
                        Toggle event {isEventHidden ? "(Is hidden)" : ""}
                    </button>
                )}
                <Header
                    title={stories[currentStory].name}
                    selectAnotherCharacter={selectAnotherCharacter}
                    signOut={signOut}
                    accessChatHelp={accessChatHelp}
                    toggleMusic={toggleMusic}
                    chatHelpTitle={
                        onChatHelp ? "Return to map" : "Access chat help"
                    }
                    musicMute={musicMute}
                    isGameMaster={isGameMaster}
                    togglePlayerView={togglePlayerView}
                />
                {this.canReadEvent() && (
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 99,
                            top: `${heightHeader / 2}px`,
                            left: `${widthRightPanel / 2}px`,
                            width: `${widthLeft + mapWidth}px`,
                            height: `${heightHeader / 2 +
                                heightCameras / 2 +
                                heightLeft -
                                50}px`,
                            backgroundColor: "white",
                            border: "2px solid brown",
                            borderRadius: 40,
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "40px",
                                marginTop: 15,
                                marginBottom: 15,
                                textAlign: "center",
                                fontSize: 25,
                                float: "left",
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            EVENEMENT !
                        </div>
                        <div style={styledBoxHeader}>
                            {`(`}
                            {eventHistory[currentEvent].viewers
                                ? storyCharacters.map(sc => {
                                      let isAViewer = false;
                                      eventHistory[currentEvent].viewers.map(
                                          v => {
                                              if (sc.userUid === v) {
                                                  isAViewer = true;
                                              }
                                              return null;
                                          },
                                      );
                                      if (isAViewer) {
                                          return (
                                              <div
                                                  onClick={() =>
                                                      this.removeViewerFromEvent(
                                                          sc.userUid,
                                                      )
                                                  }
                                                  style={styledViewer}
                                              >
                                                  {sc.name}
                                              </div>
                                          );
                                      } else if (isGameMaster) {
                                          return (
                                              <div
                                                  onClick={() =>
                                                      this.addViewerToEvent(
                                                          sc.userUid,
                                                      )
                                                  }
                                                  style={{
                                                      ...styledViewer,
                                                      ...styledNoViewer,
                                                  }}
                                              >
                                                  {sc.name}
                                              </div>
                                          );
                                      }
                                  })
                                : storyCharacters.map(sc => {
                                      return (
                                          <div
                                              onClick={() =>
                                                  this.removeViewerFromEvent(
                                                      sc.userUid,
                                                  )
                                              }
                                              style={styledViewer}
                                          >
                                              {sc.name}
                                          </div>
                                      );
                                      return null;
                                  })}
                            {`)`}
                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: 370,
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                float: "left",
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <img
                                src={
                                    eventHistory[currentEvent].type === "gold"
                                        ? "./common/gold_purse.jpg"
                                        : "./" +
                                          eventHistory[currentEvent].item
                                              .itemType +
                                          "/" +
                                          eventHistory[currentEvent].item.icon
                                }
                                style={{
                                    width: 350,
                                    height: 350,
                                }}
                            />
                        </div>
                        {eventHistory[currentEvent].type === "gold" && (
                            <div style={styledBoxHeader}>
                                TOTAL : {eventHistory[currentEvent].goldLeft}
                                gold
                            </div>
                        )}
                        {eventHistory[currentEvent].description !== "" && (
                            <div style={styledBoxHeader}>
                                {eventHistory[currentEvent].description}
                            </div>
                        )}
                        {eventHistory[currentEvent].type === "gold" && (
                            <div
                                style={{
                                    width: "100%",
                                    height: 50,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    textAlign: "center",
                                    float: "left",
                                    position: "relative",
                                    display: "inline-block",
                                }}
                            >
                                {eventHistory[currentEvent].goldLeft > 0 && (
                                    <div>
                                        <button
                                            style={styledEventAction}
                                            onClick={this.takeAllGold}
                                        >
                                            Take all
                                        </button>
                                        <button
                                            onClick={this.takeEquivalentGold}
                                            style={styledEventAction}
                                        >
                                            Take your equal part
                                        </button>
                                        <div style={styledEventAction}>
                                            Take
                                            <input
                                                type="number"
                                                value={numberWanted}
                                                name="numberWanted"
                                                min={0}
                                                max={
                                                    eventHistory[currentEvent]
                                                        .gold
                                                }
                                                onChange={e => {
                                                    this.onChange(
                                                        e.target.name,
                                                        parseInt(
                                                            e.target.value,
                                                            10,
                                                        ),
                                                    );
                                                }}
                                            />
                                            gold
                                            <button onClick={this.takeXGold}>
                                                Confirm
                                            </button>
                                        </div>
                                        <button
                                            style={styledEventAction}
                                            onClick={this.takeNothing}
                                        >
                                            Don't take any gold
                                        </button>
                                    </div>
                                )}
                                {eventHistory[currentEvent].goldLeft === 0 &&
                                    !isGameMaster && (
                                        <button
                                            style={styledEventAction}
                                            onClick={this.closeEvent}
                                        >
                                            Close Event
                                        </button>
                                    )}
                                {isGameMaster && (
                                    <button
                                        style={styledEventAction}
                                        onClick={this.closeEvent}
                                    >
                                        Delete Event
                                    </button>
                                )}
                            </div>
                        )}
                        {eventHistory[currentEvent].type === "item" && (
                            <div
                                style={{
                                    width: "100%",
                                    height: 50,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    textAlign: "center",
                                    float: "left",
                                    position: "relative",
                                    display: "inline-block",
                                }}
                            >
                                {eventHistory[currentEvent].quantityLeft >
                                    1 && (
                                    <button
                                        style={styledEventAction}
                                        onClick={this.takeAllItems}
                                    >
                                        Take all
                                    </button>
                                )}
                                {eventHistory[currentEvent].quantityLeft >
                                    1 && (
                                    <div style={styledEventAction}>
                                        Take
                                        <input
                                            type="number"
                                            value={numberWanted}
                                            name="numberWanted"
                                            min={0}
                                            max={
                                                eventHistory[currentEvent]
                                                    .quantityLeft
                                            }
                                            onChange={e => {
                                                this.onChange(
                                                    e.target.name,
                                                    parseInt(
                                                        e.target.value,
                                                        10,
                                                    ),
                                                );
                                            }}
                                        />
                                        {eventHistory[currentEvent].item.name}
                                        <button onClick={this.takeXItem}>
                                            Confirm
                                        </button>
                                    </div>
                                )}
                                {eventHistory[currentEvent].quantityLeft >
                                    1 && (
                                    <button
                                        style={styledEventAction}
                                        onClick={this.onlyOneItem}
                                    >
                                        Take only 1
                                    </button>
                                )}
                                {eventHistory[currentEvent].quantityLeft ===
                                    1 && (
                                    <button
                                        style={styledEventAction}
                                        onClick={this.lastItem}
                                    >
                                        Take it
                                    </button>
                                )}
                                {eventHistory[currentEvent].quantityLeft >
                                    0 && (
                                    <button
                                        style={styledEventAction}
                                        onClick={this.takeNothing}
                                    >
                                        Not interested
                                    </button>
                                )}
                                {eventHistory[currentEvent].quantityLeft ===
                                    0 &&
                                    !isGameMaster && (
                                        <button
                                            style={styledEventAction}
                                            onClick={this.closeEvent}
                                        >
                                            Close Event
                                        </button>
                                    )}
                                {isGameMaster && (
                                    <button
                                        style={styledEventAction}
                                        onClick={this.closeEvent}
                                    >
                                        Delete Event
                                    </button>
                                )}
                            </div>
                        )}
                        <div
                            style={{
                                width: "60%",
                                left: "20%",
                                height: 150,
                                marginTop: 10,
                                marginBottom: 10,
                                textAlign: "center",
                                float: "left",
                                position: "relative",
                                display: "inline-block",
                                overflowY: "auto",
                            }}
                        >
                            {eventHistory[currentEvent].actionHistory &&
                                eventHistory[currentEvent].actionHistory
                                    .length > 0 &&
                                eventHistory[currentEvent].actionHistory.map(
                                    ah => {
                                        return (
                                            <div
                                                key={`action-history-${ah}`}
                                                style={{
                                                    width: "100%",
                                                    height: "20px",
                                                    marginBottom: "5px",
                                                    textAlign: "center",
                                                    float: "left",
                                                    position: "relative",
                                                    display: "inline-block",
                                                }}
                                            >
                                                {ah}
                                            </div>
                                        );
                                    },
                                )}
                        </div>
                    </div>
                )}
                {onChatHelp ? (
                    <ChatCommandsPanel />
                ) : (
                    <MiddlePanel
                        currentStory={currentStory}
                        isGameMaster={isGameMaster}
                        stories={stories}
                        eventHistory={eventHistory}
                        storyCharacters={storyCharacters}
                        doSetState={doSetState}
                        character={character}
                        gameMaster={gameMaster}
                        {...rest}
                    />
                )}
                <BottomPanel />
            </div>
        );
    }
}

GameScreen.propTypes = {
    onChatHelp: PropTypes.bool.isRequired,
    stories: PropTypes.array.isRequired,
    currentStory: PropTypes.number.isRequired,
    musicMute: PropTypes.bool.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    selectAnotherCharacter: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    accessChatHelp: PropTypes.func.isRequired,
    toggleMusic: PropTypes.func.isRequired,
    togglePlayerView: PropTypes.func.isRequired,
    currentEvent: PropTypes.number.isRequired,
    eventHistory: PropTypes.array.isRequired,
    storyCharacters: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    doSetState: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired,
    gameMaster: PropTypes.string.isRequired,
};

export default GameScreen;
