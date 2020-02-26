import React, { Component } from "react";
import PropTypes from "prop-types";
import { cursorPointer, heightHeader } from "./StyleConstants";
import { resetStoryMerchants } from "./MerchantsFunctions";
import Camera from "./Camera";
import ButtonLarge from "./ButtonLarge";
import firebase from "firebase";
import { connect } from "react-redux";
import { togglePlayerView } from "../../redux/actions/actionsAppState";
import { Icon } from "semantic-ui-react";

const styledToggling = {
  position: "absolute",
  top: 50,
  right: 100,
  width: 150,
};

const styledToggleEvent = {
  position: "absolute",
  top: 75,
  right: 100,
  width: 150,
};

const styledHydrateEvent = {
  position: "absolute",
  top: 100,
  right: 100,
  width: 150,
};

const styledResetMerchantsEvent = {
  position: "absolute",
  top: 0,
  right: 100,
  width: 150,
};

const styledHeaderLeft = {
  height: heightHeader,
  position: "absolute",
  left: 0,
  top: 0,
};

const styledHeader = {
  width: "100%",
  height: `${heightHeader}px`,
  backgroundImage: `url(./common/dravos_header.jpg)`,
  backgroundSize: "cover",
  // backgroundColor: colors.background,
};

class Header extends Component {
  state = {
    hasHydrated: false,
    items: null,
  };

  resetMerchants = () => {
    const { items } = this.state;
    const { currentStory, doSetState } = this.props;
    if (items !== null) {
      resetStoryMerchants(currentStory, items, doSetState);
      this.hasHydrated();
    } else {
      firebase
        .database()
        .ref("/items")
        .once("value")
        .then(snapshot => {
          const tempItems = {};
          Object.keys(snapshot.val()).map(keyName => {
            tempItems[keyName] = [];
            Object.keys(snapshot.val()[keyName]).map(itemKey => {
              tempItems[keyName].push(snapshot.val()[keyName][itemKey]);
              return null;
            });
            return null;
          });
          this.setState(state => ({
            ...state,
            items: snapshot.val(),
          }));
          resetStoryMerchants(currentStory, tempItems, doSetState);
          this.hasHydrated();
        })
        .catch(e => {
          console.log("e", e);
        });
    }
  };

  hasHydrated = () => {
    this.setState(state => ({
      ...state,
      hasHydrated: true,
    }));
    setTimeout(() => {
      this.setState(state => ({
        ...state,
        hasHydrated: false,
      }));
    }, 3000);
  };

  render() {
    const {
      accessChatHelp,
      eventTitle,
      hydrateMerchants,
      isGameMaster,
      selectAnotherCharacter,
      // title,
      toggleBestiary,
      toggleMerchantList,
      toggleEvent,
      dispatchTogglePlayerView,
    } = this.props;
    const { hasHydrated, items } = this.state;

    return (
      <div style={styledHeader}>
        <div style={styledHeaderLeft}>
          <Camera />
        </div>
        <Icon
          style={{
            position: "absolute",
            top: 80,
            right: 20,
            cursor: cursorPointer,
          }}
          onClick={selectAnotherCharacter}
          circular
          name={"address book"}
          inverted
          color={"black"}
        />
        <Icon
          style={{
            position: "absolute",
            top: 115,
            right: 20,
            cursor: cursorPointer,
          }}
          onClick={accessChatHelp}
          circular
          name={"chat"}
          inverted
          color={"black"}
        />
        <Icon
          style={{
            position: "absolute",
            top: 10,
            right: 60,
            cursor: cursorPointer,
          }}
          onClick={toggleBestiary}
          circular
          name={"bug"}
          inverted
          color={"black"}
        />
        <Icon
          style={{
            position: "absolute",
            top: 45,
            right: 60,
            cursor: cursorPointer,
          }}
          onClick={toggleMerchantList}
          circular
          name={"gem"}
          inverted
          color={"black"}
        />
        {isGameMaster && (
          <ButtonLarge
            style={styledToggling}
            onClick={dispatchTogglePlayerView}
          >
            Toggle Player View
          </ButtonLarge>
        )}
        {isGameMaster && (
          <ButtonLarge onClick={toggleEvent} style={styledToggleEvent}>
            {eventTitle}
          </ButtonLarge>
        )}
        {isGameMaster && (
          <ButtonLarge
            onClick={() => {
              this.hasHydrated();
              hydrateMerchants();
            }}
            style={styledHydrateEvent}
          >
            Hydrate merchants
            {hasHydrated ? " OK" : ""}
          </ButtonLarge>
        )}
        {isGameMaster && items !== [] && (
          <ButtonLarge
            onClick={() => {
              this.resetMerchants();
            }}
            style={styledResetMerchantsEvent}
          >
            Reset merchants
            {hasHydrated ? " OK" : ""}
          </ButtonLarge>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTogglePlayerView: () => {
      dispatch(togglePlayerView());
    },
  };
};

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  musicMute: store.sounds.music.musicMute,
});

Header.propTypes = {
  accessChatHelp: PropTypes.func.isRequired,
  bestiaryTitle: PropTypes.string.isRequired,
  chatHelpTitle: PropTypes.string.isRequired,
  dispatchTogglePlayerView: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  eventTitle: PropTypes.string.isRequired,
  hydrateMerchants: PropTypes.func.isRequired,
  merchantTitle: PropTypes.string.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleBestiary: PropTypes.func.isRequired,
  toggleEvent: PropTypes.func.isRequired,
  toggleMerchantList: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
