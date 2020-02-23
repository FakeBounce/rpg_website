import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { callSetUserPseudo } from "../../redux/actions/actionsUserInfos";

class HasNoNickname extends Component {
  state = {
    pseudoInput: "",
  };

  onChange = value => {
    this.setState(state => ({
      ...state,
      pseudoInput: value,
    }));
  };

  choosePseudo = () => {
    const { pseudoInput } = this.state;
    const { dispatchCallSetUserPseudo } = this.props;
    dispatchCallSetUserPseudo(pseudoInput);
  };

  render() {
    const { pseudoInput } = this.props;

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
        }}
      >
        <h1
          style={{
            position: "absolute",
            width: "100%",
            top: 30,
            display: "flex",
            justifyContent: "center",
            letterSpacing: 13,
          }}
        >
          Choose your pseudo
        </h1>
        <div
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingTop: 70,
            paddingBottom: 50,
            paddingLeft: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              name="pseudoInput"
              placeholder="pseudo"
              value={pseudoInput}
              onChange={e => {
                this.onChange(e.target.value.replace(/\s/g, ""));
              }}
            />
            <ButtonLarge onClick={this.choosePseudo} style={{ marginTop: 20 }}>
              Validate
            </ButtonLarge>
          </div>
        </div>
        <div style={{ width: "50%", height: "100%" }}>
          <img
            src={"./common/pseudoPage.jpg"}
            alt={"homepage"}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCallSetUserPseudo: payload => {
      dispatch(callSetUserPseudo(payload));
    },
  };
};

HasNoNickname.propTypes = {
  dispatchCallSetUserPseudo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(HasNoNickname);
