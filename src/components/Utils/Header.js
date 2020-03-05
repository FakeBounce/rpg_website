import React, { Component } from "react";
import PropTypes from "prop-types";
import { cursorPointer, heightHeader } from "./StyleConstants";
import { resetStoryMerchants } from "./MerchantsFunctions";
import Camera from "./Camera";
import { connect } from "react-redux";
import { togglePlayerView } from "../../redux/actions/actionsAppState";
import { Icon } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import { CALL_GET_ITEM_LIST } from "../../redux/actionsTypes/actionsTypesItems";

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
  };

  resetMerchants = () => {
    const { currentStory, items, dispatchCallGetItemList } = this.props;
    if (items.length > 0) {
      resetStoryMerchants(currentStory, items);
      this.hasHydrated();
    } else {
      dispatchCallGetItemList();
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
      dispatchTogglePlayerView,
      hydrateMerchants,
      isGameMaster,
      isEventHidden,
      isOnBestiary,
      isOnMerchantList,
      onChatHelp,
      selectAnotherCharacter,
      toggleBestiary,
      toggleEvent,
      toggleMerchantList,
    } = this.props;
    const { hasHydrated } = this.state;

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
          data-tip={"Characters"}
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
          color={onChatHelp ? "blue" : "black"}
          data-tip={"Chat help"}
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
          color={isOnBestiary ? "blue" : "black"}
          data-tip={"Bestiary"}
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
          color={isOnMerchantList ? "blue" : "black"}
          data-tip={"Merchant list"}
        />
        {isGameMaster && (
          <Icon
            style={{
              position: "absolute",
              top: 80,
              right: 60,
              cursor: cursorPointer,
            }}
            onClick={dispatchTogglePlayerView}
            circular
            name={"cogs"}
            inverted
            color={"black"}
            data-tip={"Toggle Player View"}
          />
        )}
        {isGameMaster && (
          <Icon
            style={{
              position: "absolute",
              top: 80,
              right: 60,
              cursor: cursorPointer,
            }}
            onClick={toggleEvent}
            circular
            name={"time"}
            inverted
            color={isEventHidden ? "red" : "green"}
            data-tip={"Toggle event"}
          />
        )}
        {isGameMaster && (
          <Icon
            style={{
              position: "absolute",
              top: 10,
              right: 100,
              cursor: cursorPointer,
            }}
            onClick={() => {
              this.hasHydrated();
              hydrateMerchants();
            }}
            circular
            name={"theme"}
            inverted
            color={hasHydrated ? "green" : "black"}
            data-tip={"Hydrate merchant"}
          />
        )}
        {isGameMaster && (
          <Icon
            style={{
              position: "absolute",
              top: 45,
              right: 100,
              cursor: cursorPointer,
            }}
            onClick={this.resetMerchants}
            circular
            name={"cart"}
            inverted
            color={hasHydrated ? "green" : "black"}
            data-tip={"Reset merchant"}
          />
        )}
        <ReactTooltip />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchTogglePlayerView: () => {
      dispatch(togglePlayerView());
    },
    dispatchCallGetItemList: () => {
      dispatch({ type: CALL_GET_ITEM_LIST });
    },
  };
};

const mapStateToProps = store => ({
  isGameMaster: store.appState.isGameMaster,
  musicMute: store.sounds.music.musicMute,
  items: store.items.items,
});

Header.propTypes = {
  accessChatHelp: PropTypes.func.isRequired,
  dispatchCallGetItemList: PropTypes.func.isRequired,
  dispatchTogglePlayerView: PropTypes.func.isRequired,
  hydrateMerchants: PropTypes.func.isRequired,
  isEventHidden: PropTypes.string.isRequired,
  isOnBestiary: PropTypes.string.isRequired,
  isOnMerchantList: PropTypes.string.isRequired,
  onChatHelp: PropTypes.string.isRequired,
  selectAnotherCharacter: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleBestiary: PropTypes.func.isRequired,
  toggleEvent: PropTypes.func.isRequired,
  toggleMerchantList: PropTypes.func.isRequired,
  toggleMusic: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
